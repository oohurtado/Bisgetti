import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/common/local-storage.service';
import { inject } from '@angular/core';

export const anonGuard: CanActivateFn = (route, state) => {
    const ls = inject(LocalStorageService)
	const r = inject(Router)

	// preguntamos si un usuario esta autenticado, si no lo esta, es anonimo
	if (!ls.isUserAuthenticated()) {
		return true;
	}

	// si un usuario esta autenticado entonces lo redireccionamos a un lugar donde si deberia estar
	r.navigateByUrl('/home');
	return false;
};
