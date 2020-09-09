import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';
import { fadeIn, GenericValidator } from '../../../utils';
import { ReportService } from './report.service';
import { RegisterReportComponent } from './child/register-report.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl: './report-form.component.html',
    animations: [fadeIn]
})
export class ReportFormComponent implements OnInit, AfterViewInit, OnDestroy {
    private readonly toDestroy$ = new Subject<void>();

    rForm: FormGroup;

    responseMessage: string;
    isError: boolean;
    errors: any;

    fiscalYear: any[] = [
        { key: 1, value: '2066/77' }
    ];

    displayMessage: any = {};
    genericValidator: GenericValidator;
    @ViewChildren(FormControlName, { read: ElementRef })
    private formInputElements: ElementRef[];

    constructor(
        private fb: FormBuilder,
        private rService: ReportService,
        private dialog: MatDialog,
        private dialogRef: MatDialogRef<ReportFormComponent>
    ) {
        this.genericValidator = new GenericValidator({

        });
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.rForm = this.fb.group({
            id: 0,
            from: null,
            to: null,
            fiscalYear: null,
            dartaNumber: null,
            name: null
        });
    }

    clearErrors() {
        this.responseMessage = null;
        this.isError = false;
        this.errors = null;
    }

    ngAfterViewInit() {
        this.validation();
    }

    private validation() {
        this.genericValidator
            .initValidationProcess(this.rForm, this.formInputElements)
            .subscribe({ next: m => this.displayMessage = m });
    }

    viewRegReport() {
        this.dialog.open(RegisterReportComponent, {
        });
    }

    vsReport() {
        this.dialog.open(RegisterReportComponent, {
        });
    }

    saveChanges() {
        console.log(this.rForm.value);
    }

    cancel() {
        this.dialogRef.close();
    }

    ngOnDestroy() {
        this.toDestroy$.next();
        this.toDestroy$.complete();
    }

}
