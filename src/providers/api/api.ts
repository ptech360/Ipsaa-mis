import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { StorageService } from '../localstorage/storage';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AlertService } from '../alert/alert.service';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = environment.api;

  constructor(public http: HttpClient, public storage: StorageService, public errService: AlertService) {}

  getHeaders(optHeaders?: HttpHeaders) {
    let headers = new HttpHeaders();
    if (this.storage.getData('ngStorage-token')) {
      headers = headers.set(
        'Authorization',
        'Bearer ' + this.storage.getData('ngStorage-token')
      );
    }
    if (optHeaders) {
      for (const optHeader of optHeaders.keys()) {
        headers = headers.append(optHeader, optHeaders.get(optHeader));
      }
    }
    return headers;
  }

  get(endpoint: string, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .get(this.url + '/' + endpoint, { headers: headers, observe: 'response' })
      .map(this.extractData)
      .catch(this.handleError);
  }

  post(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .post(this.url + '/' + endpoint, body, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  put(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(endpoint: string, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .delete(this.url + '/' + endpoint, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  patch(endpoint: string, body: any, optHeaders?: HttpHeaders) {
    const headers = this.getHeaders(optHeaders);
    return this.http
      .put(this.url + '/' + endpoint, body, {
        headers: headers,
        observe: 'response'
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(response: HttpResponse<any>) {
    return response.body || response.status;
  }

  handleError(errorResponse: HttpErrorResponse) {
    const err: any = {};
    err.status = errorResponse.error ? errorResponse.error.status : errorResponse.status;
    err.message = errorResponse.error ? (errorResponse.error.message ? errorResponse.error.message : errorResponse.error.toString())
    : 'Something went wrong';
    this.errService.errorAlert(err.message);
    return Observable.throw(err);
  }
}
