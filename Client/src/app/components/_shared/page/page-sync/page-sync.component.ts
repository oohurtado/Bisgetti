import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-page-sync',
    templateUrl: './page-sync.component.html',
    styleUrl: './page-sync.component.css'
})
export class PageSyncComponent {
    @Output() evt!: EventEmitter<void>;

    constructor() {
		this.evt = new EventEmitter();
	}

	onSyncClicked(event: Event) {
		this.evt.emit();
	}
}
