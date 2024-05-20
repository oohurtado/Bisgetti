import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/common/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
	const ls = inject(LocalStorageService)
	const r = inject(Router)
	
    // preguntamos si un usuario esta autenticado
	if (ls.isUserAuthenticated()) {
		return true;
	}

    // si un usuario no esta autenticado entonces lo redireccionamos a un lugar donde si deberia estar
	r.navigateByUrl('/login');
	return false;
};
