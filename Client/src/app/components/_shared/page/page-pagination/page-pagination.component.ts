import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IPageSelected } from '../../../../source/models/interfaces/page.interface';

@Component({
  selector: 'app-page-pagination',
  templateUrl: './page-pagination.component.html',
  styleUrl: './page-pagination.component.css'
})
export class PagePaginationComponent {
	@Input() pageSize!: number;
	@Input() pageSelected!: IPageSelected;

	@Output() evt_pageOption!: EventEmitter<string>;
	@Output() evt_pageSize!: EventEmitter<number>;

	isFirstDisabled!: boolean;
	isPreviousDisabled!: boolean;
	isNextDisabled!: boolean;
	isLastDisabled!: boolean;

	currentPageSize!: number;

	constructor() {
		this.evt_pageOption = new EventEmitter();
		this.evt_pageSize = new EventEmitter();
	}

	ngOnChanges(changes: SimpleChanges): void {
		let pageSize = changes['pageSize']?.currentValue as number;
		let pageSelected = changes['pageSelected']?.currentValue as IPageSelected;
		
		if (pageSelected !== undefined) {
			this.isFirstDisabled = pageSelected.from == 1;
			this.isPreviousDisabled = pageSelected.from == 1;
			this.isNextDisabled = pageSelected.to == pageSelected.total;
			this.isLastDisabled = pageSelected.to == pageSelected.total;
		}

		if (pageSize !== undefined) {
			this.currentPageSize = pageSize;			
		}
	}

	onOptionClicked(option: string) {
		this.evt_pageOption.emit(option);
	}

	onPageSizeClicked(event: Event, pageSize: number) {
		this.evt_pageSize.emit(pageSize);
		this.currentPageSize = pageSize;
	}
}
