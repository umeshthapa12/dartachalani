import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, ReplaySubject } from 'rxjs';
import { takeUntil, filter, delay } from 'rxjs/operators';
import { ChalaniService } from './chalani.service';
import { fadeIn, GenericValidator, validateBeforeSubmit } from '../../../utils';
import { BranchService } from '../branch/branch.service';
import { ChangesConfirmComponent } from '../shared/changes-confirm/changes-confirm.component';
import { ResponseModel, ErrorCollection } from '../../../../../src/app/models';

@Component({
    templateUrl: './chalani-form.component.html',
    styles: [
        `
        .uploadfilecontainer {
    background-image: url("../../assets/cloud-2044823_960_720.png");
    background-repeat: no-repeat;
    background-size: 100px;
    background-position: center;
    height: 70px;
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
}
        `
    ],
    animations: [fadeIn]
})
export class ChalaniFormComponent implements OnInit, AfterViewInit, OnDestroy {
    /**
     * Create a toDestroy$ property. Subject is like EventEmitters it maintain a registry of many listeners.
     */
    private readonly toDestroy$ = new Subject<void>();

    /**
     * Chalani FormGroup name
     */
    cForm: FormGroup;

    /**
     * Create a filterCtrl(Form Control) and filteredBranch(emits old values to new subscribers) for input select search.
     * ReplaySubject buffers a set number of values and will emit those values immediately to any new subscribers in addition
     * to emitting new values to existing subscribers.
     */
    public filterCtrl: FormControl = new FormControl();
    public filteredBranch: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

    /**
     * Create variable for displaying any error success message.
     */
    responseMessage: string;
    errors: any;
    isError: boolean;
    isWorking: boolean;

    /**
     * It is used to add remove and display file list.
     */
    files: any[] = [];

    // Created for displaying static value of fiscal year.
    fiscalYear = '2076/77';

    letterReceivers: any[] = [
        { key: 1, value: 'नेपाल सरकार संघिय मामिला तथा सामान्य प्रशासन मन्त्रालय' }
    ];

    /**
     * Created displayMessage property for displaying form validation messages.
     * Created genericValidator with type GenericValidator used for form validation in component and set validation message.
     */
    displayMessage: any = {};
    genericValidator: GenericValidator;
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

    LetterKinds: any[] = [
        { key: 1, value: 'प्रशासन शाखा' },
        { key: 2, value: 'आर्थिक प्रशासन शाखा' },
        { key: 3, value: 'प्राबिधिक शाखा' },
        { key: 4, value: 'राजस्व   शाखा' },
    ];
    branches: any[] = [];

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private cService: ChalaniService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<ChalaniFormComponent>,
        private bService: BranchService,
        @Inject(MAT_DIALOG_DATA)
        public data: { id: number }
    ) {
        this.genericValidator = new GenericValidator({
            'invoiceNo': {
                'required': 'चलानी नम्बर अनिवार्य राख्नुहोस्'
            },
            'subject': {
                'required': 'बिषय अनिवार्य राख्नुहोस्'
            },
            'officeAddress': {
                'required': 'पत्र पाउने कार्यालयको ठेगाना अनिवार्य राख्नुहोस्'
            },
            'branchIds': {
                'required': 'चलानी गर्ने शाखा अनिवार्य राख्नुहोस्'
            }
        });
    }

    ngOnInit() {
        this.getBranch();
        this.initForm();
        // For Select list filter
        this.selectFilter();
    }

    getBranch() {
        this.bService.getList().subscribe(_ => this.branches = _);
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
        this.cForm = this.fb.group({
            id: 0,
            invoiceNo: [null, Validators.required],
            branchIds: [null, Validators.required],
            receivers: null,
            // date: null,
            subject: [null, Validators.required],
            LetterKindId: null,
            officeAddress: [null, Validators.required],
            isCorrect: null,
            remarks: null,
            doc: null
        });

        this.cForm.valueChanges.pipe(
            takeUntil(this.toDestroy$),
        ).subscribe(_ => [this.dialogRef.disableClose = this.cForm.dirty || this.cForm.invalid]);
    }

    private patchForm(d: any) {
        this.cdr.markForCheck();
        this.cForm.patchValue({
            id: d.id,
            invoiceNo: d.invoiceNo,
            branchIds: d.branchIds,
            receivers: d.receivers,
            date: d.date,
            subject: d.subject,
            LetterKindId: d.LetterKindId,
            officeAddress: d.officeAddress,
            isCorrect: d.isCorrect,
            remarks: d.remarks
        });
    }

    ngAfterViewInit() {
        this.validation();

        // if (this.data.id > 0) {
        //     this.cService.getChalaniById(this.data.id).pipe(
        //         takeUntil(this.toDestroy$),
        //         delay(500)
        //     ).subscribe(r => {
        //         let d: any = r;
        //         this.patchForm(d);
        //     });
        // }

        if (this.data.id > 0) {
            this.cService.getListById(this.data.id).pipe(
                takeUntil(this.toDestroy$),
                delay(500)
            ).subscribe(r => {
                let d: any = r;
                this.patchForm(d);
            });
        }
    }

    private validation() {
        this.genericValidator
            .initValidationProcess(this.cForm, this.formInputElements)
            .subscribe({ next: m => this.displayMessage = m });
    }

    saveChanges() {
        const errorMessage = validateBeforeSubmit(this.cForm, document.querySelector('#res-messages'));
        this.isError = errorMessage && errorMessage.length > 0;
        this.responseMessage = errorMessage;

        if (this.data.id > -1) {
            // this.cService.addOrUpdate(this.cForm.value)
            this.cService.update(this.cForm.value)
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
            this.cService.add(this.cForm.value)
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

    clearErrors() {
        this.isError = false;
        this.responseMessage = null;
        this.errors = null;
    }

    cancel() {
        if (this.cForm.dirty) {
            this.dialog.open(ChangesConfirmComponent).afterClosed()
                .pipe(
                    filter(_ => _)
                ).subscribe(_ => this.dialogRef.close());
        } else {
            this.dialogRef.close();
        }
    }

    // File upload
    uploadFile(event) {
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element.name);
        }
    }

    deleteFile(index) {
        this.files.splice(index, 1);
    }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }
}
