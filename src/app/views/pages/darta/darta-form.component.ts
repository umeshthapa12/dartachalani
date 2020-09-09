import { Component, OnInit, OnDestroy, AfterViewInit, ViewChildren, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Subject, ReplaySubject } from 'rxjs';
import { GenericValidator, validateBeforeSubmit, fadeIn, fadeInOutStagger } from '../../../../../src/app/utils';
import { DartaService } from './darta.service';
import { BranchService } from '../branch/branch.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil, filter, delay } from 'rxjs/operators';
import { ChangesConfirmComponent } from '../shared';
import { ErrorCollection, ResponseModel } from '../../../../../src/app/models';

@Component({
    templateUrl: './darta-form.component.html',
    styles: [
        `
        .uploadfilecontainer {
    background-image: url("../../assets/cloud-2044823_960_720.png");
    background-repeat: no-repeat;
    background-size: 100px;
    background-position: center;
    height: 80px;
    width: 100%;
    margin: 20px auto;
    border: 2px dashed #1C8ADB;
    border-radius: 10px;
}

.uploadfilecontainer:hover {
    cursor: pointer;
    background-color: #9ecbec !important;
    opacity: 0.8;
}

.files-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px auto;
    background: #ffffff;
    border: 1px dashed;
    border-radius: 12px;
    padding: 5px;
    color: #1c8adb;
}

.files-list .delete-file {
    background: transparent;
    border: none;
    cursor: pointer;
}

.files-list .delete-file img {
    width: 30px;
}`
    ],
    animations: [fadeIn, fadeInOutStagger]
})

export class DartaFormComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly toDestroy$ = new Subject<void>();

    // For Mat select search
    public filterCtrl: FormControl = new FormControl();
    public filteredBranch: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    dForm: FormGroup;
    responseMessage: string;
    isError: boolean;
    errors: ErrorCollection[];
    isWorking: boolean;

    fiscalYear = '2076/77';

    letterKind: any[] = [
        { key: 1, value: 'प्रशासन शाखा' },
        { key: 2, value: 'आर्थिक प्रशासन शाखा' },
        { key: 3, value: 'प्राबिधिक शाखा' },
        { key: 4, value: 'राजस्व शाखा' },
    ];

    branches: any[] = [];

    // For upload file
    files: any = [];

    displayMessage: any = {};
    genericValidator: GenericValidator;
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private dService: DartaService,
        private bService: BranchService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<DartaFormComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { id: number }
    ) {
        this.genericValidator = new GenericValidator({
            'subject': {
                'required': 'बिषय अनिवार्य राख्नुहोस्'
            },
            'senderOfficeName': {
                'required': 'नाम अनिवार्य राख्नुहोस्'
            },
            'senderOfficeAddress': {
                'required': 'ठेगाना अनिवार्य राख्नुहोस्'
            },
            'branchIds': {
                'required': 'शाखा अनिवार्य राख्नुहोस्'
            }
        });
    }

    getBranches() {
        this.bService.getList().subscribe(_ => this.branches = _);
    }

    ngOnInit() {
        this.initForm();
        this.getBranches();
        this.selectFilter();
    }

    private selectFilter() {
        this.filteredBranch.next(this.branches.slice());
        this.filterCtrl.valueChanges
            .pipe(takeUntil(this.toDestroy$))
            .subscribe(() => {
                this.filterBanksMulti();
            });
    }

    private filterBanksMulti() {
        if (!this.branches) {
            return;
        }
        let search = this.filterCtrl.value;
        if (!search) {
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredBranch.next(
            this.branches.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
        );
    }

    private initForm() {
        this.dForm = this.fb.group({
            id: 0,
            regNo: [1],
            // receivedOn: null,
            subject: null,
            letterKind: null,
            senderOfficeName: null,
            senderOfficeAddress: null,
            letterRegNo: '2076/77/12',
            noOfLetter: 92813,
            // sendingOn: null,
            branchIds: null,
            remarks: null,
            doc: null,
            isCorrect: null
        });

        this.dForm.valueChanges.pipe(
            takeUntil(this.toDestroy$),
        ).subscribe(_ => [this.dialogRef.disableClose = this.dForm.dirty || this.dForm.invalid]);
    }

    private patchForm(d: any) {
        this.cdr.markForCheck();
        this.dForm.patchValue({
            id: d.id,
            regNo: d.regNo,
            // receivedOn: d.receivedOn,
            subject: d.subject,
            letterKind: d.letterKind,
            senderOfficeName: d.senderOfficeName,
            senderOfficeAddress: d.senderOfficeAddress,
            letterRegNo: d.letterRegNo,
            noOfLetter: d.noOfLetter,
            // sendingOn: d.sendingOn,
            branchIds: d.branchIds,
            remarks: d.remarks,
            isCorrect: d.isCorrect
        });
    }

    saveChanges() {
        const errorMessage = validateBeforeSubmit(this.dForm, document.querySelector('#res-messages'));
        this.isError = errorMessage && errorMessage.length > 0;
        this.responseMessage = errorMessage;

        if (this.data.id > -1) {
            this.dService.update(this.dForm.value)
                // this.dService.addOrUpdate(this.dForm.value)
                .pipe(
                    takeUntil(this.toDestroy$),
                    delay(1500))
                .subscribe(res => {
                    this.dialogRef.close(res);
                    this.isWorking = false;
                }, e => {
                    this.cdr.markForCheck();
                    this.isError = true;
                    this.isWorking = false;
                    const model: ResponseModel = e.error;
                    const errors: ErrorCollection[] = model.contentBody.errors;

                    // Check if server returning number of error list, if so make these as string
                    if (errors && errors.length > 0) {
                        this.errors = errors;
                        this.responseMessage = model.messageBody;
                    }
                });
        } else {

            this.dService.add(this.dForm.value)
                // this.dService.addOrUpdate(this.dForm.value)
                .pipe(
                    takeUntil(this.toDestroy$),
                    delay(1500))
                .subscribe(res => {
                    this.dialogRef.close(res);
                    this.isWorking = false;
                }, e => {
                    this.cdr.markForCheck();
                    this.isError = true;
                    this.isWorking = false;
                    const model: ResponseModel = e.error;
                    const errors: ErrorCollection[] = model.contentBody.errors;

                    // Check if server returning number of error list, if so make these as string
                    if (errors && errors.length > 0) {
                        this.errors = errors;
                        this.responseMessage = model.messageBody;
                    }
                });
        }
    }

    cancel() {
        if (this.dForm.dirty) {
            this.dialog.open(ChangesConfirmComponent).afterClosed()
                .pipe(
                    filter(_ => _)
                ).subscribe(_ => this.dialogRef.close());
        } else {
            this.dialogRef.close();
        }
    }

    ngAfterViewInit() {
        this.genericValidator
            .initValidationProcess(this.dForm, this.formInputElements)
            .subscribe({ next: m => this.displayMessage = m });

        // if (this.data.id > 0) {
        //     this.bService.getListById(this.data.id).pipe(
        //         takeUntil(this.toDestroy$),
        //         delay(500)
        //     ).subscribe(r => {
        //         let d: any = r;
        //         this.patchForm(d);
        //     });
        // }

        if (this.data.id > 0) {
            this.dService.getListById(this.data.id).pipe(
                takeUntil(this.toDestroy$),
                delay(500)
            ).subscribe(r => {
                let d: any = r;
                this.patchForm(d);
            });
        }
    }

    clearErrors() {
        this.isError = false;
        this.responseMessage = null;
        this.errors = null;
    }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }

    // File upload
    uploadFile(event) {
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element.name);
        }
    }
    deleteAttachment(index) {
        this.files.splice(index, 1);
    }
}
