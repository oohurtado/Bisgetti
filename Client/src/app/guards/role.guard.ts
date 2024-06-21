import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/common/local-storage.service';

export const roleGuard: CanActivateFn = (route, state) => {
	const ls = inject(LocalStorageService)
	const r = inject(Router)
	
	const allowedRoles = route.data['roles'] as Array<string>;	
	return ls.isUserInAnyRole(allowedRoles);
};
