import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigLoader } from '../utils/framework/config-loader.service';
import { CONST } from '../utils/constant';
import { ALERT_TYPE, Snackbar } from '../utils/ui/snackbar.service';
import { Spinner } from '../utils/ui/spinner.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor (
    private configLoader: ConfigLoader,
    private snackBar: Snackbar,
    private spinner: Spinner ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(this.errorMessageHandler.bind(this))
    );
  }

  /**
   * display error messages via the snack bar
   * @param errorResponse
   */
  public errorMessageHandler(errorResponse: HttpErrorResponse): Observable<any> {
    const errorConfigs = this.configLoader.configurations.get(CONST.APP_CONFIG.ERROR_CONFIG);
    const filteredErrorConfig = Object.keys(errorConfigs).filter(key => errorConfigs[key].endpointId === this.configLoader.endpointId);

    if (filteredErrorConfig && filteredErrorConfig.length > 0) {
      const errorKey = filteredErrorConfig[0];
      const type = errorConfigs[errorKey].type ? errorConfigs[errorKey].type : ALERT_TYPE.ERROR;
      const title = errorConfigs[errorKey].title ? errorConfigs[errorKey].title : 'Error(s) occurred.';
      let errorMessage = '';
      if (errorConfigs[errorKey].httpCodes[errorResponse.status]) {
        errorMessage = errorConfigs[errorKey].httpCodes[errorResponse.status];
      } else if (errorConfigs[errorKey].showApiError) {
        if (errorResponse?.error?.errors?.length > 0) {
          errorMessage = errorResponse?.error?.errors[0]?.message;
        }
      }
      const dismissDuration = errorConfigs[errorKey].dismissDuration ? errorConfigs[errorKey].dismissDuration : -1;
      this.snackBar.show(type, title, errorMessage, dismissDuration);
      this.spinner.hide();
    }
    return throwError(errorResponse);
  }

}
