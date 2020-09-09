import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CanActivateUser } from '../../../services';
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';


const routes: Routes = [
	{ path: '', redirectTo: 'dartachalani/main/dashboard', pathMatch: 'full' },
	{ path: 'dartachalani/main', redirectTo: 'dartachalani/main/dashboard', pathMatch: 'full' },
	{
		path: 'dartachalani/main',
		component: BaseComponent,
		canActivate: [ CanActivateUser],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{ path: 'setting/roles', loadChildren: () => import('../../pages/roles/roles.module').then(m => m.RolesModule) },
			{
				path: 'setting/users',
				loadChildren: () => import('../../pages/accounts/user-account.module').then(m => m.UserAccountModule)
			},
			{
				path: 'setting/navs',
				loadChildren: () => import('../../pages/dynamic-navs/site-navs.module').then(m => m.SiteNavsModule)
			},
			{
				path: 'setting/mail-server',
				loadChildren: () => import('../../pages/mail-server/mail-server.module').then(m => m.MailServerModule)
			},
			{
				path: 'setting/mail-templates',
				loadChildren: () => import('../../pages/mail-template/mail-template.module').then(m => m.MailTemplateModule)
			},
			{
				path: 'setting/sms-server',
				loadChildren: () => import('../../pages/sms-server/sms-server.module').then(m => m.SmsServerModule)
			},
			{
				path: 'darta',
				loadChildren: () => import('../../pages/darta/darta.module').then(m => m.DartaModule)
			},
			{
				path: 'chalani',
				loadChildren: () => import('../../pages/chalani/chalani.module').then(m => m.ChalaniModule)
			},
			{
				path: 'branch',
				loadChildren: () => import('../../pages/branch/branch.module').then(m => m.BranchModule)
			},
			{
				path: 'report',
				loadChildren: () => import('../../pages/report/report.module').then(m => m.ReportModule)
			},
			{
				path: 'fiscal-year',
				loadChildren: () => import('../../pages/fiscal-year/fiscal-year.module').then(m => m.FiscalYearModule)
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
