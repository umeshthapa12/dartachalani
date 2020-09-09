// Angular
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
// Object path
import * as objectPath from 'object-path';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
// Services
import { MenuConfigService } from './menu-config.service';

@Injectable()
export class MenuAsideService {
	// Public properties
	classes: string;
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	private readonly baseUrl = environment.baseUrl;

	@Select('navigation', 'leftAside') nav$: Observable<any[]>;

	/**
	 * Service Constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 * @param store: Store<AppState>
	 */
	constructor(
		private menuConfigService: MenuConfigService, ) {
		this.loadMenu();
	}

	/**
	 * Load menu
	 */
	loadMenu() {
		// get menu list
		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');

		this.nav$.pipe(filter(_ => _ && _.length > 0))
			.subscribe(m => this.menuList$.next(m), _ => this.menuList$.next(menuItems))

	}
}
