import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './services/common/shared.service';
import { Subject } from 'rxjs';
import { EnumRole } from './source/models/enums/role.enum';
declare let alertify: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(private sharedService: SharedService) {
    }

	ngOnInit(): void {
        alertify.set('notifier','position', 'top-right');

		this.sharedService.logout.subscribe(p => {
			this.bye(p);
		});
	}

	ngOnDestroy(): void {
		this.sharedService.logout.unsubscribe();
		this.sharedService.logout = new Subject<EnumRole>();
	}

    bye(role: EnumRole) {
        if (role === EnumRole.UserAdmin) {
            alertify.message("Bye!", 3);
        } else if (role === EnumRole.UserBoss) {
            alertify.message("A descansar!", 3);
        } else if (role === EnumRole.UserCustomer) {
            alertify.message("Vuelva pronto!", 3);
        }
    }
}
