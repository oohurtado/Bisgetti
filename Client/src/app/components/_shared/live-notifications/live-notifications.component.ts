import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { general } from '../../../source/common/general';
import { MessageOrderHub } from '../../../source/models/hub/message-order-hub';
import { Utils } from '../../../source/common/utils';
declare let alertify: any;

@Component({
    selector: 'app-live-notifications',
    templateUrl: './live-notifications.component.html',
    styleUrl: './live-notifications.component.css'
})
export class LiveNotificationsComponent implements OnInit, OnDestroy {
    private _connection!: HubConnection;

    constructor(
        public localStorageService: LocalStorageService,
		private router: Router
    ) {
        // this.initMassiveHub();
		this.initGroupHub();        
    }

	async ngOnInit() {
		alertify.set('notifier','position', 'top-right');

		this._connection.start()
		.then(_ => {
			// console.log('connection Started');
		}).catch(error => {			
			// return console.error(error);
		});

		this.joinGroup();
	}

	ngOnDestroy(): void {
		this.leaveGroup();
	}


	joinGroup() {
		this._connection.invoke('JoinGroup', this.localStorageService.getUserRole(), this.localStorageService.getUserFullName())
		.then(_ => {		
			alertify.success(`Conectado a grupo`);		
		});
	}

	leaveGroup() {
		this._connection.invoke('LeaveGroup', this.localStorageService.getUserRole(), this.localStorageService.getUserFullName())
			.then(_ => {
				alertify.success(`Desconectado de grupo`);	
			});
	}


    initMassiveHub() {
		const options: IHttpConnectionOptions = {
			accessTokenFactory: () => {
				return this.localStorageService.getValue(general.LS_TOKEN)!;
			},
		};

		this._connection = new HubConnectionBuilder()
			.withUrl(general.MASSIVE_LIVE_NOTIFICATION, options)
			.build();
			
		if (this.localStorageService.isUserBoss() || this.localStorageService.isUserChef()) {
			this._connection.on("NotifyToEmployeesInformationAboutAnOrder", (message: MessageOrderHub) => {
				console.log(message)
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

	initGroupHub() {
		const options: IHttpConnectionOptions = {
			accessTokenFactory: () => {
				return this.localStorageService.getValue(general.LS_TOKEN)!;
			},
		};

		this._connection = new HubConnectionBuilder()
			.withUrl(general.GROUP_LIVE_NOTIFICATION, options)
			.build();

		this._connection.onclose(() => {
			alertify.error(`Desconectado del hub =(`);
		});
	}
}
