import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class FiscalYearService {

    getList(): Observable<any> {
        return of(LIST);
    }

    getListById(id: number): Observable<any> {
        let v = LIST.find(_ => _.id === id);
        return of(v);
    }

    delete(id: number): Observable<any> {
        let v = LIST.findIndex(_ => _.id === id);
        LIST.splice(v, 1);
        return of(LIST);
    }

    add(data: any): Observable<any> {
        LIST.push(data);
        data.id = LIST.length + 1;
        return of(LIST);

    }


}

let LIST = [
    { id: 99, sn: 1, name: '2076/77' }
];

