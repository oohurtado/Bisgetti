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

	_connectedToHub: boolean = false;
	_connectedToGroup: boolean = false;

    constructor(
        public localStorageService: LocalStorageService,
		private router: Router
    ) {
		this.initGroupHub();
    }

	async ngOnInit() {
		alertify.set('notifier','position', 'top-right');

		await Utils.delay(1000);

		this.startHub();
	}

	ngOnDestroy(): void {
		this.leaveGroup();
	}

	initGroupHub() {
		if (!(this.localStorageService.isUserBoss() || this.localStorageService.isUserChef() || this.localStorageService.isUserCustomer())) {
			return;
		}

		const options: IHttpConnectionOptions = {
			accessTokenFactory: () => {
				return this.localStorageService.getValue(general.LS_TOKEN)!;
			},
			withCredentials: true
		};

		this._connection = new HubConnectionBuilder()
			.withUrl(general.GROUP_LIVE_NOTIFICATION, options)
			.build();

		this._connection.on("NotifyToEmployeesInformationAboutAnOrder", (message: MessageOrderHub) => {
			if (message.message === 'ORDER-CREATED') {
				alertify.success(`#${message.extraData.toString().padStart(6, '0')} - ${message.statusTo}`);
			} else if (message.message === 'ORDER-UPDATED') {
				alertify.message(`#${message.extraData.toString().padStart(6, '0')} - ${message.statusTo}`);				
			} else if (message.message === 'ORDER-CANCELED') {
				alertify.error(`#${message.extraData.toString().padStart(6, '0')} - ${message.statusTo}`);
			} else if (message.message === 'ORDER-DECLINED') {
				alertify.error(`#${message.extraData.toString().padStart(6, '0')} - ${message.statusTo}`);
			}
		});			

		this._connection.onclose(() => {
			this._connectedToHub = false;
			this._connectedToGroup = false;
		});				
	}

	startHub() {
		if (!(this.localStorageService.isUserBoss() || this.localStorageService.isUserChef() || this.localStorageService.isUserCustomer())) {
			return;
		}

		this._connection.start()
			.then(_ => {
				this._connectedToHub = true;				
				this.joinGroup();				
			}).catch(error => {			
				this._connectedToHub = false;
				this._connectedToGroup = false;
			});		
	}

	joinGroup() {
		if (!this.localStorageService.isUserAuthenticated()) {
			return;
		}

		let group = '';
		if (this.localStorageService.isUserBoss() || this.localStorageService.isUserChef()) {
			group = this.localStorageService.getUserRole();
		} else {
			group = `user-${this.localStorageService.getUserId()}`;
		}

		this._connection.invoke('JoinGroup', group, this.localStorageService.getUserFullName())
			.then(_ => {		
				this._connectedToGroup = true;	
			})
			.catch(error => {			
				this._connectedToGroup = false;				
			});
	}

	leaveGroup() {
		if (!this.localStorageService.isUserAuthenticated()) {
			return;
		}

		let group = '';
		if (this.localStorageService.isUserBoss() || this.localStorageService.isUserChef()) {
			group = this.localStorageService.getUserRole();
		} else {
			group = `user-${this.localStorageService.getUserId()}`;
		}

		this._connection.invoke('LeaveGroup', group, this.localStorageService.getUserFullName())
			.then(_ => {
				this._connectedToGroup = false;
			});
	}	
}
