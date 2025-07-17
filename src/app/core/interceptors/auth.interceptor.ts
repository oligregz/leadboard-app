import { HttpInterceptorFn } from '@angular/common/http';

import { getLocalStorageKeyValue } from '@pages/utils/manage-local-storage.util';


export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = getLocalStorageKeyValue('access_token');

  if (token) {
    const cloned = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(cloned);
  }

  return next(request);
};
