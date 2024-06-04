import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './services/common/shared.service';
import { Subject } from 'rxjs';
import { EnumRole } from './source/models/enums/role.enum';
import { SystemService } from './services/business/system.service';
import { DateService } from './services/common/date.service';
declare let alertify: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

    _serverTime!: Date;

    constructor(
        private sharedService: SharedService,
        private systemService: SystemService,
        private dateService: DateService
    ) {
    }

	ngOnInit(): void {
        alertify.set('notifier','position', 'top-right');

		this.sharedService.logout.subscribe(p => {
			this.bye(p);
		});

        this.systemService.datetime()
        .subscribe({
            complete: () => {},
            error: e => {},
            next: (value) => {
                this._serverTime = Object.assign(new Date, value);
            },
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

    printServerTime() {
        if (this._serverTime != null && this._serverTime !== undefined) {
            return this.dateService.get_longDate(this._serverTime);
        }
        
        return "..."
    }
}
