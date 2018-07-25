import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Storage } from '../localstorage/storage';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = environment.api;

  
  constructor(public http: HttpClient,public storage : Storage) {

  }

  getHeaders(){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    if(this.storage.getData('ngStorage-token'))
      headers = headers.set('Authorization', 'Bearer ' + this.storage.getData('ngStorage-token'));
    return headers;
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    const headers = this.getHeaders();
    return this.http.get(this.url + '/' + endpoint,{headers:headers});
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    const headers = this.getHeaders();
    return this.http.post(this.url + '/' + endpoint, body, {headers:headers});
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    const headers = this.getHeaders();
    return this.http.put(this.url + '/' + endpoint, body, {headers:headers});
  }

  delete(endpoint: string, reqOpts?: any) {
    const headers = this.getHeaders();
    return this.http.delete(this.url + '/' + endpoint, {headers:headers});
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    const headers = this.getHeaders();
    return this.http.put(this.url + '/' + endpoint, body, {headers:headers});
  }
}
