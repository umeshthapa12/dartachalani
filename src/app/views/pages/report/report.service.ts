import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseUrlCreator } from '../../../../../src/app/utils/extensions/base-url';
import { ParamGenService } from '../../../../../src/app/utils/generators/query-params';
import { ResponseModel, QueryModel } from '../../../../../src/app/models';

@Injectable()
export class ReportService {

    private readonly api = this.url.createUrl('', '');

    constructor(
        private http: HttpClient,
        private url: BaseUrlCreator,
        private paramGen: ParamGenService
    ) { }

    getReports<T extends ResponseModel>(params?: QueryModel): Observable<T> {
        const p = this.paramGen.createParams(params);
        return this.http.get<T>(`${this.api}/Get`, { params: p });
    }

    addOrUpdate<T extends ResponseModel>(body: any): Observable<T> {

        return body.id > 0
            ? this.http.put<T>(`${this.api}/Update`, body)
            : this.http.post<T>(`${this.api}/Create`, body);
    }

    deleteReport<T extends ResponseModel>(id: number): Observable<T> {
        return this.http.delete<T>(`${this.api}/Delete/${id}`);
    }

}
