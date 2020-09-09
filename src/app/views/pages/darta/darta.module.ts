import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { RouterModule } from '@angular/router';
import { NpDatepickerModule } from 'angular-nepali-datepicker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BranchService } from '../branch/branch.service';
import { ChangesConfirmModule, DeleteConfirmModule, FiltersModule } from '../shared';
import { MatSelectSearchModule } from '../shared/select-search/select-search.module';
import { DartaFormComponent } from './darta-form.component';
import { DartaComponent } from './darta.component';
import { DartaService } from './darta.service';


@NgModule({
    declarations: [DartaComponent, DartaFormComponent],
    imports: [
        CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule,
        MatCheckboxModule, MatDatepickerModule, MatTooltipModule, MatDialogModule, ChangesConfirmModule, MatSelectSearchModule,
        NpDatepickerModule, MatTableModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, DeleteConfirmModule, ChangesConfirmModule,
        MatProgressSpinnerModule, MatMenuModule, PerfectScrollbarModule,FiltersModule,
        RouterModule.forChild([
            { path: '', component: DartaComponent }
        ])
    ],
    exports: [],
    providers: [DartaService, BranchService, BranchService],
    entryComponents: [DartaFormComponent]
})
export class DartaModule {

}
