import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutConfigService, SplashScreenService } from './core/_base/layout';
import { IsUserLoggedInAction, InitDataSet } from './store/app-store';


@Component({
	// tslint:disable-next-line:component-selector
	selector: 'body[kt-root]',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
	private readonly toDestroy$ = new Subject<void>();

	loader: boolean;

	constructor(
		private router: Router,
		private layoutConfigService: LayoutConfigService,
		private splashScreenService: SplashScreenService,
		private store: Store,
	) {
		this.init();
		this.checkSessionOnAppInit();
	}

	ngOnInit() {
		// enable/disable loader
		this.loader = this.layoutConfigService.getConfig('loader.enabled');

		this.router.events.pipe(takeUntil(this.toDestroy$)).subscribe(event => {
			if (event instanceof NavigationEnd) {
				// hide splash screen
				this.splashScreenService.hide();

				// scroll to top on every route change
				window.scrollTo(0, 0);
			}
		});
	}

	private checkSessionOnAppInit() {

		let ms = 30000;
		interval(ms).pipe(takeUntil(this.toDestroy$)).subscribe({
			next: _ => [this.store.dispatch(new IsUserLoggedInAction())]
		});

	}

	/**
	 * Repeated datasets of multiple sections should load at once
	 * so we can access them from entire app using ngxs state management.
	 * @link https://github.com/ngxs/store
	 */
	init = () => this.store.dispatch(new InitDataSet()).pipe(takeUntil(this.toDestroy$));

	ngOnDestroy() {
		this.toDestroy$.next();
		this.toDestroy$.complete();
	}
}
