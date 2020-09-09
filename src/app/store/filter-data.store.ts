import { Action, State, StateContext, Store } from '@ngxs/store';
import { merge } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { DropdownModel, DropdownProviderService } from '../services/dropdown-provider.service';
import { Injectable } from '@angular/core';

/*----------------------------------------
    filter data load state section
-----------------------------------------*/
export class initFilterActions {
    static readonly type = '[filter] init on app start';
}

export class FilterConditionsAction {
    static readonly type = '[filter] loads filter conditions';
    constructor(public filterConditions: DropdownModel[]) { }
}

@Injectable()
@State({
    name: 'filter',
    defaults: []
})
export class FilterConditionState {

    constructor(
        private dropdown: DropdownProviderService,
        private store: Store) { }

    @Action(initFilterActions)
    initFilters() {
        const obs = [
            // filter conditions
            this.dropdown.getFilterConditions().pipe(delay(1000),
                switchMap(c => this.store.dispatch(new FilterConditionsAction(c)))
            ),
            // more..
        ];

        return merge(...obs);

    }

    @Action(FilterConditionsAction)
    loadConditions(ctx: StateContext<DropdownModel[]>, action: FilterConditionsAction) {
        const state = ctx.getState();
        ctx.setState({ ...state, ...action });
    }

}


