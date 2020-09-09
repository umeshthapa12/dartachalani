import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseModel } from '../models';
import { BaseUrlCreator } from '../utils';


@Injectable({ providedIn: 'root' })
export class AuthService {

    private api = this.url.createUrl('Account', 'Admin');

    constructor(
        private http: HttpClient,
        private url: BaseUrlCreator
    ) { }

    /**
     *  log out active user authentication from server & client
     */
    userLogout(): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(`${this.api}/Logout`, {
            withCredentials: true
        });
    }

    /**
     * Checks whether the active session is a valid user. If so, get user information
     */
    isUserSessionValid(): Observable<ResponseModel> {
        return this.http.get<ResponseModel>(`${this.api}/IsValid`, {
            // this will make authentication of cookie of origins
            withCredentials: true,
        });
    }

    /**
     * get user site navigation
     */
    getSiteNav(): Observable<ResponseModel> {

        return of({ contentBody: items });

        // const u = `${this.url.createUrl('Permission', 'dartachalani')}/GetSideNav`;

        // return this.http.get<ResponseModel>(u, {
        //     // this will make authentication of cookie of origins
        //     withCredentials: true,
        // });

    }
}

let items = [
    // {
    //     title: 'Dashboard',
    //     root: true,
    //     icon: 'flaticon-home',
    //     page: '/dartachalani/main/dashboard',
    // },
    // {
    //     title: 'दर्ता',
    //     root: true,
    //     icon: 'flaticon-clipboard',
    //     page: '/dartachalani/main/darta',
    // },
    // {
    //     title: 'चलानी ',
    //     root: true,
    //     icon: 'flaticon-book',
    //     page: '/dartachalani/main/chalani',
    // },
    // {
    //     title: 'प्रतिवेदन',
    //     root: true,
    //     icon: 'flaticon-diagram',
    //     page: '/dartachalani/main/report',
    // },
    // {
    //     title: 'अन्य सेटिंग्स',
    //     root: true,
    //     icon: 'flaticon-settings',
    //     page: '/dc/setting',
    // },
    // { section: 'System' },

    {
        'sn': 1,
        'id': 1,
        'title': 'दर्ताचलानी',
        'root': true,
        'icon': 'flaticon-file',
        'submenu': [
            {
                'sn': 1,
                'id': 1,
                'title': 'ड्यासबोर्ड',
                'root': true,
                'page': '/dartachalani/main/dashboard',
            },
            {
                'sn': 2,
                'id': 2,
                'title': 'दर्ता',
                'root': false,
                'page': '/dartachalani/main/darta',
            },
            {
                'sn': 3,
                'id': 3,
                'title': 'चलानी',
                'root': false,
                'page': '/dartachalani/main/chalani'
            },
            {
                'sn': 8,
                'id': 8,
                'title': 'प्रतिवेदन',
                'root': false,
                'page': '/dartachalani/main/report'
            }
        ]
    },
    // {
    //     title: 'Setting',
    //     root: false,
    //     icon: 'flaticon-cogwheel',
    //     bullet: 'dot',
    //     submenu: [
    //         {
    //             title: 'कार्यालयको विवरण',
    //             root: true,
    //             page: '/dc/details'
    //         },
    //         {
    //             title: 'कारवाही इन्ट्री',
    //             root: true,
    //             page: '/dc/suspend'
    //         },
    //         {
    //             title: 'आर्थिक वर्ष',
    //             root: true,
    //             page: '/dc/fiscal-year'
    //         },
    //         {
    //             title: 'कार्यालयको शाखा',
    //             root: true,
    //             page: '/dc/branch'
    //         },
    //         {
    //             title: 'प्रयोगकर्ता',
    //             root: true,
    //             page: '/dc/user'
    //         },
    //         {
    //             title: 'पासवर्ड परिबर्तन',
    //             root: true,
    //             page: '/dc/c-password'
    //         },
    //     ]
    // },
];

