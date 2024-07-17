import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from './services/common/shared.service';
import { Subject } from 'rxjs';
import { EnumRole } from './source/models/enums/role.enum';
import { SystemService } from './services/business/system.service';
import { DateService } from './services/common/date.service';
import { MenuStuffService } from './services/business/menu-stuff.service';
import { AddOrRemoveElementRequest } from './source/models/dtos/menus/add-or-remove-element-request';
import { Utils } from './source/utils';
import { PositionElementRequest } from './source/models/dtos/menus/position-element-request';
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
        private dateService: DateService,
        private menuStuffService: MenuStuffService
    ) {
    }

	async ngOnInit() {
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

        await this.testStuff();
	}

	ngOnDestroy(): void {
		this.sharedService.logout.unsubscribe();
		this.sharedService.logout = new Subject<EnumRole>();
	}

    bye(role: EnumRole) {
        if (role === EnumRole.UserAdmin) {
            alertify.message("Bye!", 1);
        } else if (role === EnumRole.UserBoss) {
            alertify.message("A descansar!", 1);
        } else if (role === EnumRole.UserCustomer) {
            alertify.message("Vuelva pronto!", 1);
        }
    }

    printServerTime() {
        if (this._serverTime != null && this._serverTime !== undefined) {
            return this.dateService.get_longDate(this._serverTime);
        }
        
        return "..."
    }

    async testStuff() {
        // await this.menuStuffService.getMenuAsync(1)
        //     .then(p => {
        //         console.log(p)
        //     })
        //     .catch(e => { });

        // await this.menuStuffService.getMenuStuffAsync(0)
        //     .then(p => {
        //         console.log(p)
        //     })
        //     .catch(e => { });

        // await this.menuStuffService.getCategoriesAsync()
        //     .then(p => {
        //         console.log(p)
        //     })
        //     .catch(e => { });
        
        // await this.menuStuffService.getProductsAsync()
        //     .then(p => {
        //         console.log(p)
        //     })
        //     .catch(e => { });

        // let tmp = new AddOrRemoveElementRequest(6, 2, null,  "add");
        //let tmp = new AddOrRemoveElementRequest(6, 1, 3, "add");
        // this.menuStuffService.addOrRemoveElement(tmp)
        //     .subscribe({
        //         complete: () => {
        //             console.log("completado");
        //         },
        //         error: (e : string) => {
        //             console.log(Utils.getErrorsResponse(e))
        //         },
        //         next: (val) => {
        //             console.log("agregado");
        //         }
        //     });

        // let tmp = new AddOrRemoveElementRequest(6, 1, null, "remove");
        // //let tmp = new AddOrRemoveElementRequest(6, 1, 1, "remove");
        // this.menuStuffService.addOrRemoveElement(tmp)
        //     .subscribe({
        //         complete: () => {
        //             console.log("completado");
        //         },
        //         error: (e : string) => {
        //             console.log(Utils.getErrorsResponse(e))
        //         },
        //         next: (val) => {
        //             console.log("agregado");
        //         }
        //     });

        //let tmp = new MoveElementRequest(6, 1, null, "move-down");
        // let tmp = new MoveElementRequest(6, 1, 1, "move-up");
        // this.menuStuffService.updateElementPosition(tmp)
        //     .subscribe({
        //         complete: () => {
        //             console.log("completado!!!!!!!!");
        //         },
        //         error: (e : string) => {
        //             console.log(Utils.getErrorsResponse(e))
        //         },
        //         next: (val) => {
        //             console.log("agregado");
        //         }
        //     });        
    }
}

