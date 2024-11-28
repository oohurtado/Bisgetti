import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EnumRole } from '../../source/models/enums/role-enum';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    
    
    constructor() { }
    
    // rol

    public logout: Subject<EnumRole> = new Subject<EnumRole>();

    public onLogout(role: EnumRole) {
		this.logout.next(role);
        window.location.reload();
	}

    // agregar productos al carrito

    public productAddedToCart: Subject<number> = new Subject<number>();

    public refreshCart(numberOfProducts: number) {
        this.productAddedToCart.next(numberOfProducts);
    }
}
