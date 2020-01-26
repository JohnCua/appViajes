import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export abstract class MetodosBase{

    private baseURL=environment['api'].apiUrl;
    private _http;

    constructor (_http: HttpClient) { 
        this._http = _http;
    }

    protected get(url: String, params? : {[key: string] : any;}) {
        if (params) {
            var _httpParams = new HttpParams({
                fromObject: params
            });
            return this._http.get(this.baseURL + url, { params: _httpParams });
        }

        return this._http.get(this.baseURL + url );
    }

    protected post(url : String, data : {[key: string] : any;}, headers? : any) {
        if (headers) {
            var _headers = new HttpHeaders({
                fromObject: headers
            });
            return this._http.post(this.baseURL + url, data, {headers: _headers});
        }
        return this._http.post(this.baseURL + url, data);
    }

    protected put(url : String, data : {[key: string] : any;}, headers? : any) {
        if(headers) {
            var _headers = new HttpHeaders({
                fromObject: headers
            });
            return this._http.put(this.baseURL + url, data, {headers: _headers});
        }
        return this._http.put(this.baseURL + url, data);
    }

    protected delete(url : String, data? : {[key: string] : any;}) {
        if (data) {
            return this._http.request('delete', this.baseURL + url, {body: data});
        }
        return this._http.delete(this.baseURL + url);
    }

}