import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INavigation } from '../../../../source/models/interfaces/list/navigation.interface';
import { INavigationOptionSelected } from '../../../../source/models/interfaces/list/navigation-option-selected.interface';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.css'
})
export class PageNavigationComponent {
	@Input() data!: INavigation;
	@Output() evt_options!: EventEmitter<INavigationOptionSelected>;
	@Output() evt_back!: EventEmitter<void>;
	@Output() evt_home!: EventEmitter<void>;

	constructor() {
		this.evt_options = new EventEmitter();
		this.evt_back = new EventEmitter();
		this.evt_home = new EventEmitter();
	}

	onOptionClicked(event: Event, index: number) {
		let button = event.target as HTMLButtonElement;
		button.blur();

		this.evt_options.emit({
			data: this.data.options[index].data
		});
	}

	onBackClicked(event: Event) {
		let button = event.target as HTMLButtonElement;
		button.blur();

		this.evt_back.emit();
	}	
	
	onHomeClicked(event: Event) {
		let button = event.target as HTMLButtonElement;
		button.blur();

		this.evt_home.emit();
	}	
}
