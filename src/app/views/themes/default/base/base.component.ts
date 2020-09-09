// Angular
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// Object-Path
import * as objectPath from 'object-path';
// RxJS
import { Subscription } from 'rxjs';
// Layout
import { LayoutConfigService, MenuConfigService, PageConfigService } from '../../../../core/_base/layout';
import { LayoutConfig } from '../../../../core/_config/default/layout.config';
import { MenuConfig } from '../../../../core/_config/default/menu.config';
import { PageConfig } from '../../../../core/_config/default/page.config';
import { HtmlClassService } from '../html-class.service';
import { trigger, transition, style, animate, query } from '@angular/animations';

@Component({
	selector: 'kt-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: [
		trigger('fadeInOutDownRoute', [

			transition('* => *', [
				query(':enter', [
					style({
						opacity: 0,
						width: 'calc(100% - 50px)',
						position: 'absolute',
						display: 'inline-block',
						transform: 'translateY(15px)',

					}),
				], { optional: true }),

				query(':leave', [
					style({
						opacity: 1,
						transform: 'translateY(0)',
						width: 'calc(100% - 50px)',
					}),
					animate('0.4s ease-out', style({
						opacity: 0,
						position: 'absolute',
						display: 'inline-block',
						transform: 'translateY(15px)',

					}
					))
				], { optional: true }),

				query(':enter', [
					style({
						opacity: 0,
						display: 'inline-block',
						transform: 'translateY(15px)',
					}),
					animate('0.4s ease-in', style({
						width: 'calc(100% - 50px)',
						opacity: 1,
						transform: 'translateY(0)',

					}))
				], { optional: true })
			])
		])
	]
})
export class BaseComponent implements OnInit, OnDestroy {
	// Public constructor
	selfLayout: string;
	asideDisplay: boolean;
	asideSecondary: boolean;
	subheaderDisplay: boolean;

	// Private properties
	private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/


	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param menuConfigService: MenuConfifService
	 * @param pageConfigService: PageConfigService
	 * @param htmlClassService: HtmlClassService
	 */
	constructor(
		private layoutConfigService: LayoutConfigService,
		private menuConfigService: MenuConfigService,
		private pageConfigService: PageConfigService,
		private htmlClassService: HtmlClassService, ) {
		this.loadRolesWithPermissions();


		// register configs by demos
		this.layoutConfigService.loadConfigs(new LayoutConfig().configs);
		this.menuConfigService.loadConfigs(new MenuConfig().configs);
		this.pageConfigService.loadConfigs(new PageConfig().configs);

		// setup element classes
		this.htmlClassService.setConfig(this.layoutConfigService.getConfig());

		const layoutSubdscription = this.layoutConfigService.onConfigUpdated$.subscribe(layoutConfig => {
			// reset body class based on global and page level layout config, refer to html-class.service.ts
			document.body.className = '';
			this.htmlClassService.setConfig(layoutConfig);
		});
		this.unsubscribe.push(layoutSubdscription);
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		const config = this.layoutConfigService.getConfig();
		this.selfLayout = objectPath.get(config, 'self.layout');
		this.asideDisplay = objectPath.get(config, 'aside.self.display');
		this.subheaderDisplay = objectPath.get(config, 'subheader.display');

		// let the layout type change
		const layoutConfigSubscription = this.layoutConfigService.onConfigUpdated$.subscribe(cfg => {
			setTimeout(() => {
				this.selfLayout = objectPath.get(cfg, 'self.layout');
			});
		});
		this.unsubscribe.push(layoutConfigSubscription);
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.unsubscribe.forEach(sb => sb.unsubscribe());
	}

	/**
	 * NGX Permissions, init roles
	 */
	loadRolesWithPermissions() {
		// this.currentUserPermissions$ = this.store.pipe(select(currentUserPermissions));
		// const subscr = this.currentUserPermissions$.subscribe(res => {
		// 	if (!res || res.length === 0) {
		// 		return;
		// 	}

		// 	this.permissionsService.flushPermissions();
		// 	res.forEach((pm: Permission) => this.permissionsService.addPermission(pm.name));
		// });
		// this.unsubscribe.push(subscr);
	}
}
