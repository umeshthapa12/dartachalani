export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			'items': [
				// {
				// 	'title': 'Pages',
				// 	'root': true,
				// 	'icon-': 'flaticon-add',
				// 	'toggle': 'click',
				// 	'custom-class': 'kt-menu__item--active',
				// 	'alignment': 'left',
				// 	submenu: []
				// },
				// {
				// 	'title': 'Features',
				// 	'root': true,
				// 	'icon-': 'flaticon-line-graph',
				// 	'toggle': 'click',
				// 	'alignment': 'left',
				// 	submenu: []
				// },
				// {
				// 	'title': 'Apps',
				// 	'root': true,
				// 	'icon-': 'flaticon-paper-plane',
				// 	'toggle': 'click',
				// 	'alignment': 'left',
				// 	submenu: []
				// }
			]
		},
		aside: {
			self: {},
			items: [
				{
					title: 'Dashboard',
					root: true,
					icon: 'flaticon-home',
					page: '/admin/main/dashboard',
				},
				{
					title: 'Companies',
					root: true,
					icon: 'fa fa-industry',
					page: 'companies'
				},
				{
					title: 'Job Seekers',
					root: true,
					icon: 'flaticon-users',
					page: 'job-seeker'
				},
				{ section: 'System' },
				{
					title: 'Settings',
					root: false,
					icon: 'flaticon-cogwheel',
					bullet: 'dot',
					submenu: [
						{
							title: 'Navigation',
							root: true,
							page: 'setting/navs'
						},
						{
							title: 'Roles',
							root: true,
							page: 'setting/roles'
						},
						{
							title: 'users',
							root: true,
							page: 'setting/users'
						},
						{
							title: 'Mail Server',
							root: true,
							page: 'setting/mail-server'
						},
						{
							title: 'SMS',
							root: true,
							page: 'setting/sms'
						},
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
