import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../authenticate/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar, private _authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newHeaders = req.headers;
        let token = localStorage.getItem('token');
        if (token) {
            newHeaders = newHeaders.append('Authorization', 'Bearer' + ' ' + token);
        }
        const authReq = req.clone({ headers: newHeaders });
        this._authService.spinnerState(true);
        return next.handle(authReq).pipe(tap(response => {
            if (response instanceof HttpResponse) {
                this._authService.spinnerState(false);
            }
        }), catchError(error => {
            let errorMsg = "Error occured try after sometime";
            if(error.error && error.error['status']) 
            errorMsg = error.error['status'];
            this._snackBar.open(errorMsg, "Close", {
                duration: 6000,
                verticalPosition: 'top'
            });
            this._authService.spinnerState(false);
            return throwError(error);
        })
        );
    }
}