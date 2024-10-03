import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { general } from '../../../source/common/general';
import { MessageHub } from '../../../source/models/hub/message-hub';
declare let alertify: any;

@Component({
    selector: 'app-new-orders',
    templateUrl: './new-orders.component.html',
    styleUrl: './new-orders.component.css'
})
export class NewOrdersComponent implements OnInit {
    private _connection!: HubConnection;

    constructor(
        public localStorageService: LocalStorageService,
		private router: Router
    ) {
        this.initHub();        
    }

	async ngOnInit() {
		alertify.set('notifier','position', 'top-right');

		this._connection.start()
		.then(_ => {
			// console.log('connection Started');
		}).catch(error => {			
			// return console.error(error);
		});
	}

    initHub() {
		const options: IHttpConnectionOptions = {
			accessTokenFactory: () => {
				return this.localStorageService.getValue(general.LS_TOKEN)!;
			},
		};

		this._connection = new HubConnectionBuilder()
			.withUrl(general.HUB_NOTIFY_TO_RESTAURANT, options)
			.build();

		if (this.localStorageService.isUserBoss()) {
			this._connection.on("NewOrderReceived_Boss", (messageHub: MessageHub) => {
				//console.log("message received: ", messageHub);
				alertify.alert('Nueva orden', 'Hemos recibido una nueva order!', function(){ }).set('closable', false);;

			});			
		}
	}
}
