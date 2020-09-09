// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FiltersModule } from '../shared';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { DartaService } from '../darta/darta.service';
import { ChalaniService } from '../chalani/chalani.service';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		RouterModule.forChild([
			{
				path: '',
				component: DashboardComponent
			},
		]), MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule,
		PerfectScrollbarModule,MatCheckboxModule, FiltersModule, MatMenuModule, MatSelectModule

	],
	providers: [DartaService,ChalaniService],
	declarations: [
		DashboardComponent,
	]
})
export class DashboardModule {
}
