import { Injectable } from '@angular/core';
import { UserAccessService } from '../business/user/user-access.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IErrorValidate } from '../../source/models/interfaces/error.interface';

@Injectable({
    providedIn: 'root'
})
export class UserValidatorService {

    constructor(private userAccessService: UserAccessService) { }

    comparePassword(controlName: string, matchingControlName: string) {
		return (formGroup: FormGroup) => {
			const control = formGroup.controls[controlName];
			const matchingControl = formGroup.controls[matchingControlName];

			if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
				return;
			}

			if (control.value !== matchingControl.value) {
				matchingControl.setErrors({ mustMatch: true });
			} else {
				matchingControl.setErrors(null);
			}
		};
	}

    isEmailAvailable(control: FormControl): Promise<IErrorValidate> | Observable<IErrorValidate> {
		if (!control.value) {
			return Promise.resolve(null!);
		}

		return new Promise((resolve, reject) => {
			this.userAccessService
				.isEmailAvailable(control.value)
				.subscribe({
					complete: () => { },
					error: (err) => { 
					},
					next: (isAvailable: boolean) => {
						if (isAvailable) {
							return resolve(null!);
						} else {
							return resolve({ emailInUse: true });
						}
					},
				});
		});
	}
}
