import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { GenericValidator } from '../../../utils';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FiscalYearService } from './fiscal-year.serice';
import { takeUntil, delay, filter } from 'rxjs/operators';
import { ChangesConfirmComponent } from '../shared';

@Component({
    templateUrl: './fy-form.component.html',
})
export class FYFormComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly toDestroy$ = new Subject<void>();

    fyForm: FormGroup;
    isWorking: boolean;

    genericValidator: GenericValidator;
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];
    displayMessage: any = {};

    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<FYFormComponent>,
        private fyService: FiscalYearService,
        @Inject(MAT_DIALOG_DATA)
        public data: any
    ) {
        this.genericValidator = new GenericValidator({
            'name': {
                'required': 'आर्थिक वर्ष अनिवार्य राख्नुहोस्'
            }
        });
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.fyForm = this.fb.group({
            id: 0,
            name: [null, Validators.required],
        });
    }

    private patchForm(d) {
        this.fyForm.patchValue({
            id: d.id,
            name: d.name
        });
    }

    saveChanges() {
        this.cdr.markForCheck();
        this.isWorking = true;
        this.fyService.add(this.fyForm.value).subscribe();
    }

    cancel() {
        if (this.fyForm.dirty) {
            this.dialog.open(ChangesConfirmComponent).afterClosed().pipe(
                takeUntil(this.toDestroy$),
                filter(_ => _)
            ).subscribe(_ => this.dialogRef.close());
        } else {
            this.dialogRef.close();
        }
    }

    ngAfterViewInit() {
        this.genericValidator
            .initValidationProcess(this.fyForm, this.formInputElements)
            .subscribe({ next: m => this.displayMessage = m });

        if (this.data.id > 0) {
            this.fyService.getListById(this.data.id).pipe(
                takeUntil(this.toDestroy$),
                delay(500)
            ).subscribe(r => {
                let d: any = r;
                this.patchForm(d);
            });
        }

        // Real Data
        // if (this.data.id > 0) {
        //     this.fyService.getFiscalYearById(this.data.id).pipe(
        //         takeUntil(this.toDestroy$),
        //         delay(500)
        //     ).subscribe(r => {
        //         let d: any = r;
        //         this.patchForm(d);
        //     });
        // }
    }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }
}
