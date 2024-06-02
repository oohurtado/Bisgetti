import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EnumRole } from '../../source/models/enums/role.enum';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    
    public logout: Subject<EnumRole> = new Subject<EnumRole>();
    
    constructor() { }
    
    public onLogout(role: EnumRole) {
		this.logout.next(role);		
	}
}
