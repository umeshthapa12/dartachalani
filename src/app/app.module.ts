import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import * as json from 'highlight.js/lib/languages/json';
import * as scss from 'highlight.js/lib/languages/scss';
import * as typescript from 'highlight.js/lib/languages/typescript';
import * as xml from 'highlight.js/lib/languages/xml';
import { InlineSVGModule } from 'ng-inline-svg';
import { HighlightLanguage, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutConfigService, LayoutRefService, MenuAsideService, MenuConfigService, MenuHorizontalService, PageConfigService, SplashScreenService, SubheaderService } from './core/_base/layout';
import { LayoutConfig } from './core/_config/default/layout.config';
import { AddNowClickElementFocuserService, AuthService, CanActivateUser, CookieService, DropdownProviderService } from './services';
import { AppState } from './store/app-store';
import { DropdownDataState } from './store/dropdown-data.store';
import { FilterConditionState } from './store/filter-data.store';
import { SiteNaveState } from './store/site-nav.store';
import { BaseUrlCreator, CustomAnimationPlayer, CustomDateAdapter, ExtendedMatDialog, ParamGenService, PredefinedAnimations, QuilljsService, RandomUnique, RowContentStatus, WithCredentialsInterceptor } from './utils';
import { SnackToastService } from './views/pages/shared/snakbar-toast/toast.service';
import { PartialsModule } from './views/partials/partials.module';
import { ThemeModule } from './views/themes/default/theme.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	// initialize app by loading default demo layout config
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}

export function hljsLanguages(): HighlightLanguage[] {
	return [
		{ name: 'typescript', func: typescript },
		{ name: 'scss', func: scss },
		{ name: 'xml', func: xml },
		{ name: 'json', func: json }
	];
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		CoreModule,
		AppRoutingModule,
		HttpClientModule,
		PartialsModule,
		OverlayModule,
		NgbModule,
		ThemeModule,
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		InlineSVGModule.forRoot(),
		NgxsModule.forRoot([
			AppState,
			FilterConditionState,
			DropdownDataState,
			SiteNaveState
		], {
				developmentMode: !environment.production
			}
		),
		NgxsReduxDevtoolsPluginModule.forRoot({
			name: 'admin-main',
			disabled: environment.production,
		}),
	],
	providers: [
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
		},
		{
			// layout config initializer
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService], multi: true
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: { languages: hljsLanguages }
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: WithCredentialsInterceptor,
			multi: true
		},

		SubheaderService,
		MenuHorizontalService,
		MenuAsideService,

		QuilljsService,
		CustomDateAdapter,
		BaseUrlCreator,
		AddNowClickElementFocuserService,
		AuthService,
		CookieService,
		DropdownProviderService,
		SnackToastService,
		RandomUnique,
		ExtendedMatDialog,
		RowContentStatus,
		ParamGenService,
		PredefinedAnimations,
		CustomAnimationPlayer,
		CanActivateUser,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
