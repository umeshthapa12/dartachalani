import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ReportFormComponent } from './report-form.component';
import { ReportService } from './report.service';
import { RegisterReportComponent } from './child/register-report.component';
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { ReportComponent } from './report.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FiltersModule } from '../shared';

@NgModule({
    declarations: [ReportComponent, ReportFormComponent, RegisterReportComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ReportComponent }
        ]), FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatSelectModule,
        MatTooltipModule, MatDatepickerModule, MatDialogModule, NpDatepickerModule, MatProgressSpinnerModule, PerfectScrollbarModule,
        MatTableModule, MatSortModule, MatPaginatorModule, FiltersModule, MatMenuModule
    ],
    exports: [],
    providers: [ReportService],
    entryComponents: [RegisterReportComponent, ReportFormComponent]
})
export class ReportModule { }
