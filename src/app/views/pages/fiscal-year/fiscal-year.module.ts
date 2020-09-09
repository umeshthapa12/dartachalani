import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FiscalYearComponent } from './fiscal-year.component';
import { FYFormComponent } from './fy-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FiltersModule, ChangesConfirmModule, DeleteConfirmModule, ToastSnackbarModule } from '../shared';
import { FiscalYearService } from './fiscal-year.serice';

@NgModule({
    declarations: [FiscalYearComponent, FYFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: FiscalYearComponent }
        ]), FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDialogModule,
        MatProgressSpinnerModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule,
        PerfectScrollbarModule, FiltersModule, ChangesConfirmModule, DeleteConfirmModule, ToastSnackbarModule, MatMenuModule
    ],
    exports: [],
    providers: [FiscalYearService],
    entryComponents: [FYFormComponent]
})
export class FiscalYearModule { }
