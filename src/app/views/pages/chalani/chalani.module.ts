import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ChalaniFormComponent } from './chalani-form.component';
import { ChalaniService } from './chalani.service';
import { BranchService } from '../branch/branch.service';
import { ChangesConfirmModule, FiltersModule, DeleteConfirmModule } from '../shared';
import { MatSelectSearchModule } from '../shared/select-search/select-search.module';
import { ChalaniComponent } from './chalani.component';

@NgModule({
    declarations: [
        ChalaniComponent, ChalaniFormComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ChalaniComponent }
        ]),
        FormsModule, ReactiveFormsModule, MatInputModule, MatCheckboxModule, MatFormFieldModule, MatDatepickerModule,
        MatSelectModule, MatTooltipModule, MatSelectSearchModule, MatTableModule, MatSortModule, MatPaginatorModule,
        PerfectScrollbarModule, HttpClientModule, MatProgressSpinnerModule, MatMenuModule,
        NpDatepickerModule, FiltersModule, DeleteConfirmModule, ChangesConfirmModule,
    ],
    exports: [],
    providers: [ChalaniService, BranchService],
    entryComponents: [ChalaniFormComponent]
})
export class ChalaniModule { }
