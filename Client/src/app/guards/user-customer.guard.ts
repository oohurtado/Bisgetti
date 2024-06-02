import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/common/local-storage.service';

export const userCustomerGuard: CanActivateFn = (route, state) => {
	const ls = inject(LocalStorageService)
	const r = inject(Router)

	if (ls.isUserCustomer()) {
		return true;
	}

	r.navigateByUrl('/forbidden');
	return false;
};
