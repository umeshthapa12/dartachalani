import { Action, State, StateContext, Store } from '@ngxs/store';
import { merge } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { DropdownModel, DropdownProviderService } from '../services/dropdown-provider.service';
import { Injectable } from '@angular/core';

/*----------------------------------------
    dropdown data load state section
-----------------------------------------*/
/**
 * initialize dropdown collections at app startups
 */
export class initDropdownsAction {
    static readonly type = '[dropdown] init on app start';
}


/**
 * Gets system roles
 */
export class SystemRolesAction {
    static readonly type = '[dropdown] loads roles';
    constructor(public roles: DropdownModel[]) { }
}

/**
 * Gets  status list
 */
export class RowStatusAction {
    static readonly type = '[dropdown] status';
    constructor(public status: DropdownModel[]) { }
}


/**
 * Gets  module name lists
 */
export class SysModuleAction {
    static readonly type = '[dropdown] system module names';
    constructor(public moduleNames: DropdownModel[]) { }
}

/**
 * Gets routing types for SPA app
 */
export class RouteTypesAction {
    static readonly type = '[dropdown] routing types';
    constructor(public routeTypes: DropdownModel[]) { }
}

/**
 * Gets routing value of area names
 */
export class AppAreasAction {
    static readonly type = '[dropdown] route value of areas';
    constructor(public routeAreas: DropdownModel[]) { }
}


@Injectable()
@State({
    // state name
    name: 'dropdowns',
    defaults: []
})
export class DropdownDataState {

    constructor(
        private dropdown: DropdownProviderService,
        private store: Store) { }

    @Action(initDropdownsAction)
    initDropdowns() {

        const obs = [
            // roles
            this.dropdown.getRoles().pipe(delay(1000),
                switchMap(y => this.store.dispatch(new SystemRolesAction(y)))
            ),
            // status
            this.dropdown.getStatus().pipe(delay(1000),
                switchMap(y => this.store.dispatch(new RowStatusAction(y)))
            ),
            // routing types
            this.dropdown.getAppRouteTypes().pipe(delay(1000),
                switchMap(y => this.store.dispatch(new RouteTypesAction(y)))
            ),
            // system module names
            this.dropdown.getSysModuleNames().pipe(delay(1000),
                switchMap(y => this.store.dispatch(new SysModuleAction(y)))
            ),
            // API route area names
            this.dropdown.getApiAreaNames().pipe(delay(1000),
                switchMap(y => this.store.dispatch(new AppAreasAction(y)))
            ),
        ];

        return merge(...obs);
    }

    /*-- roles --*/
    @Action(SystemRolesAction)
    roles(ctx: StateContext<DropdownModel[]>, action: SystemRolesAction) {
        const state = ctx.getState();
        ctx.setState({ ...state, ...action });
    }

    /*-- roles --*/
    @Action(RowStatusAction)
    status(ctx: StateContext<DropdownModel[]>, action: RowStatusAction) {
        const state = ctx.getState();
        ctx.setState({ ...state, ...action });
    }

    /*-- route types --*/
    @Action(RouteTypesAction)
    routeTypes(ctx: StateContext<DropdownModel[]>, action: RouteTypesAction) {
        const state = ctx.getState();
        ctx.setState({ ...state, ...action });
    }

    /*-- route types --*/
    @Action(SysModuleAction)
    moduleNames(ctx: StateContext<DropdownModel[]>, action: SysModuleAction) {
        const state = ctx.getState();
        ctx.setState({ ...state, ...action });
    }

    /*-- area names --*/
    @Action(AppAreasAction)
    areaNames(ctx: StateContext<DropdownModel[]>, action: AppAreasAction) {
        const state = ctx.getState();
        ctx.setState({ ...state, ...action });
    }

}


