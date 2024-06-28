import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-page-create',
    templateUrl: './page-create.component.html',
    styleUrl: './page-create.component.css'
})
export class PageCreateComponent {
    @Output() evt!: EventEmitter<Event>;

    constructor() {
        this.evt = new EventEmitter();
    }

    onCreateClicked(event: Event) {
        this.evt.emit(event);
    }
}
