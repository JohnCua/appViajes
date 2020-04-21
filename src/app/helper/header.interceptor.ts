import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';



@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
     login = true;
    constructor( private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.login) {
            request = request.clone({
                setHeaders: {
                    Accept: 'application/json',
                }
            });
            return next.handle(request).catch(
                (err: HttpErrorResponse) => {
                    // El token ha expirado.
                    // (err.status === 0) el proxy/firewall
                    // devuelve respuestas vacias (por eso el status es 0)
                    // cuando ocurre un error de autenticacion.
                    // Necesario a menos que el proxy/firewall sea configurado correctamente
                    if (err.status === 401 || err.status === 0) {
                        // Navegamos a la pestaña de login.
                        console.log(err);
                        // this.router.navigateByUrl('/login');
                    }
                    return Observable.throw(err);
              });
        }

        return next.handle(request);
    }
}
