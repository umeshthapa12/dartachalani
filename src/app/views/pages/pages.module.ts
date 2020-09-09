import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../../core/core.module';
import { PartialsModule } from '../partials/partials.module';
import { BranchFormComponent } from './branch/branch-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [BranchFormComponent],
	exports: [],
	imports: [
		CommonModule,
		NgbModule,
		CoreModule,
		PartialsModule,
		FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule
	],
	providers: [],
	entryComponents: [BranchFormComponent]
})
export class PagesModule {
}
