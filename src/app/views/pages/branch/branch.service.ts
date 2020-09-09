import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class BranchService {

    getList(): Observable<any> {
        return of(LIST);
    }

    delete(id: number): Observable<any> {
        let v = LIST.findIndex(_ => _.id === id);
        LIST.splice(v, 1);
        return of(LIST);
    }

    getListById(id: number): Observable<any> {
        let v = LIST.find(_ => _.id === id);
        return of(v);
    }

    add(data: any): Observable<any> {
        LIST.push(data);
        data.id = LIST.length + 1;
        return of(LIST);
    }
}


let LIST = [
    { id: 31, sn: 1, name: 'काठमाडौँ' },
    { id: 311, sn: 2, name: 'कास्की' },
    { id: 422, sn: 3, name: 'मोरंग' },
    { id: 532, sn: 4, name: 'कन्द्रिय समन्वय इकाई' },
    { id: 234, sn: 5, name: 'स्थानीय तह समन्वय शाखा' },
    { id: 1242, sn: 6, name: 'प्रसासन योजना महाशाखा' },
    { id: 4312, sn: 7, name: 'आर्थिक प्रसासन महाशाखा' },
];

