import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, State, StateContext } from '@ngxs/store';
import { delay, tap } from 'rxjs/operators';
import { ResponseModel, SiteNavs } from '../models';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

/**
 * Gets menu lists based on permission given by admin.
 */
export class LoadSiteNavAction {
    static readonly type = '[user] gets user site navigation';
}

/**
 * Initialize menu lists based on permission given by admin.
 */
export class InitSiteNavAction {
    static readonly type = '[user] init user site navigation';
    constructor(public leftAside: SiteNavs[]) { }
}

@Injectable()
@State<ResponseModel>({
    name: 'navigation'
})
export class SiteNaveState {
    constructor(
        private auth: AuthService,
        private snack: MatSnackBar
    ) { }
    @Action(LoadSiteNavAction)
    loadSiteNav(ctx: StateContext<ResponseModel>) {

        // we want to stream to the API call and treat
        return this.auth.getSiteNav().pipe(
            tap(res => ctx.dispatch(new InitSiteNavAction(res.contentBody || []))),
            delay(3000),
            tap(_ => {
                const d: SiteNavs[] = _.contentBody;

                if (!d || d.length <= 0) {
                    this.snack.open('You have no menu. Login as admin and add it from user permission section.', 'close', {
                        verticalPosition: 'top',
                        horizontalPosition: 'center'
                    });
                }
            })
        );
    }

    @Action(InitSiteNavAction)
    initSiteNavs(ctx: StateContext<ResponseModel>, action: InitSiteNavAction) {

        action.leftAside.forEach(el => el.submenu ? el.bullet = 'dot' : null);
        const state = ctx.getState();

        ctx.setState({ ...state, ...action, });
    }
}
