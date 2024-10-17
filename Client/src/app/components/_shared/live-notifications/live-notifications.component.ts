import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { general } from '../../../source/common/general';
import { MessageHub } from '../../../source/models/hub/message-hub';
declare let alertify: any;

@Component({
    selector: 'app-live-notifications',
    templateUrl: './live-notifications.component.html',
    styleUrl: './live-notifications.component.css'
})
export class LiveNotificationsComponent implements OnInit {
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

		if (this.localStorageService.isUserBoss() || this.localStorageService.isUserChef()) {
			this._connection.on("NotifyToEmployeesInformationAboutAnOrder", (message: MessageHub) => {
				if (message.message === 'ORDER-CREATED') {
					alertify.success(`Orden nueva: #${message.extraData.toString().padStart(6, '0')}`);
				} else if (message.message === 'ORDER-UPDATED') {
					alertify.message(`Orden actualizada: #${message.extraData.toString().padStart(6, '0')}`);				
				} else if (message.message === 'ORDER-CANCELED') {
					alertify.error(`Orden cancelada: #${message.extraData.toString().padStart(6, '0')}`);
				} else if (message.message === 'ORDER-DECLINED') {
					alertify.error(`Orden declinada: #${message.extraData.toString().padStart(6, '0')}`);
				}
			});			
		}
	}
}
