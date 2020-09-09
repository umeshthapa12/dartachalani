import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { FileUrlsModel, ResponseModel, UsersModel } from '../../../../../models';
import { BaseUrlCreator } from '../../../../../utils';
import { takeUntil, filter, map, delay } from 'rxjs/operators';
import { LogoutAction } from '../../../../../store/app-store';

@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit ,OnDestroy {
	private toDestroy$ = new Subject<void>();

	@Select('userLogin', 'userSession')
	// returned model
	userSession$: Observable<ResponseModel>;

	// active user info
	userInfo: UsersModel = {};

	// getter prop, since we need to update change state in realtime, Angular automatically checks for the getter prop
	get avatar() {
		const a = (this.userInfo.avatar && this.userInfo.avatar.getUrl ||
			'https://api.adorable.io/avatars/face/eyes7/nose10/mouth9/7e7acc/100');
		return a;
	}

	constructor(
		private url: BaseUrlCreator,
		private store: Store
	) { }


	/**
	 * On init
	 */
	ngOnInit(): void {

		this.userSession$.pipe(
			takeUntil(this.toDestroy$),
			filter(_ => _ && _.contentBody),
			map(_ => <UsersModel>_.contentBody),
			// dev only
			map(this.baseUrlMapper())
		).subscribe({
			next: m => this.userInfo = m
		});
	}

	ngOnDestroy() {
		this.toDestroy$.next();
		this.toDestroy$.complete();
	}

	/**
	 * Log out
	 */
	logout() {

		this.store.dispatch(new LogoutAction()).pipe(
			takeUntil(this.toDestroy$),
			delay(600)
		).subscribe({
			next: _ => {
				const base = location.protocol + '//' + location.host;
				window.location.href = base + '/admin';
			}
		});
	}

	private baseUrlMapper(): (value: UsersModel, index: number) => UsersModel {
		return (res) => {
			if (res.avatar) {
				const u: FileUrlsModel = { ...res.avatar };
				u.getUrl = `${this.url.baseUrl}${u.getUrl}`;
				u.deleteUrl = `${this.url.baseUrl}${u.deleteUrl}`;
				return {
					...res,
					avatar: { ...u }
				};
			}
			return res;
		};
	}
}
