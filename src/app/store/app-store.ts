import { Action, State, StateContext, Store } from '@ngxs/store';
import { mergeMap, tap } from 'rxjs/operators';
import { ResponseModel } from '../models/app.model';
import { AuthService } from '../services/auth.service';
import { initDropdownsAction } from './dropdown-data.store';
import { initFilterActions } from './filter-data.store';
import { LoadSiteNavAction } from './site-nav.store';
import { Injectable } from '@angular/core';

/*----------------------------------------
    login state section
-----------------------------------------*/
/**
 * Repeated datasets of multiple sections should load at once
 * so we can access them from entire app using ngxs state management.
 * @link https://github.com/ngxs/store
 */
export class InitDataSet {
    static readonly type = '[app] initialize reusable startup datasets';
}

export class InitUserLoginAction {
    static readonly type = '[user] being login';
    constructor(public initLogin: ResponseModel) { }
}

export class LogoutAction {
    static readonly type = '[user] is logout';
}

export class IsUserLoggedInAction {
    static readonly type = '[user] check active session';
}

export class AppStartupAction {
    static readonly type = '[user] get user info';
    constructor(public userSession: ResponseModel) { }
}


@Injectable()
@State<ResponseModel>({
    name: 'userLogin',
})
export class AppState {

    constructor(
        private appService: AuthService,
        private store: Store
    ) { }

    @Action(InitDataSet)
    appInit() {
        // initialize dropdowns collection
        this.store.dispatch(new initDropdownsAction());

        // initialize filter data collection
        this.store.dispatch(new initFilterActions());

        // load site nav and init
        this.store.dispatch(new LoadSiteNavAction());


        // rest...
    }


    // when user log out the app
    @Action(LogoutAction)
    logout(ctx: StateContext<ResponseModel>) {
        return this.appService.userLogout().pipe(
            tap(_ => ctx.setState(null))
        );
    }

    // when app loads, we check for the active session
    @Action(IsUserLoggedInAction)
    isLoggedIn(ctx: StateContext<ResponseModel>) {
        return this.appService.isUserSessionValid().pipe(
            // re-init login info based on active session response
            tap(res => {
                // set if it needed where it dispatched
                const state = ctx.getState();
                ctx.setState({ ...state, ...res });
            }),
            mergeMap(res => ctx.dispatch(new AppStartupAction(res)))
        );
    }

    // use user info if the session is active
    @Action(AppStartupAction)
    appStartupUserInfo(ctx: StateContext<ResponseModel>, action: AppStartupAction) {
        const state = ctx.getState();
        ctx.setState({ ...state, ...action });
    }

}
