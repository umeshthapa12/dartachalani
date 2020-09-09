import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompareValidatorsDirective } from './compare-validator.directive';
import { ReplaceSpacesDirective } from './replace-spaces.directive';
import { ListStickyHeaderDirective } from './sticky-list-header.directive';
import { DragDropDirective } from './filedraganddrop';

@NgModule({
    declarations: [ListStickyHeaderDirective, CompareValidatorsDirective, ReplaceSpacesDirective, DragDropDirective],
    imports: [CommonModule],
    exports: [ListStickyHeaderDirective, CompareValidatorsDirective, ReplaceSpacesDirective],
})
export class DirectivesModule { }
