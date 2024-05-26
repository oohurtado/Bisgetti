import { LocalStorageService } from "../services/common/local-storage.service";
import { ListFactory } from "./factories/list-factory";
import { PageData } from "./models/common/page-data";
import { IOrderSelected } from "./models/interfaces/list/order-selected.interface";
import { IOrder } from "./models/interfaces/list/order.interface";
import { INavigationOptionSelected } from "./models/interfaces/list/navigation-option-selected.interface";
import { INavigation } from "./models/interfaces/list/navigation.interface";
import { IPageSelected } from "./models/interfaces/list/page-selected.interface";

export abstract class ListBase<T> {

	constructor(section: string, localStorageService: LocalStorageService) {

        this.localStorageService = localStorageService;

		this.pageNumber = 1;
		this.pageSize = localStorageService.getPageSize();	

        this._pageOrder = ListFactory.getOrder(section);
		this._pageNavigation = ListFactory.getNavigation(section);
        this._pageOrderSelected = ListFactory.getOrderInit(this._pageOrder);
	}

    localStorageService!: LocalStorageService;

    _pageData!: PageData<T>;
    _isProcessing!: boolean;

    pageNumber!: number;
	pageSize!: number;
	pageSelected!: IPageSelected;

    _pageOrder!: IOrder;
	_pageOrderSelected!: IOrderSelected;
    _pageNavigation!: INavigation;
	_pageNavigationOptionSelecter!: INavigationOptionSelected;

    async onSyncClicked()  {
		this.pageNumber = 1;
		await this.getDataAsync();
	}

    async onOrderClicked(orderSelected: IOrderSelected)
	{	
		this._pageOrderSelected = orderSelected;
		this.pageNumber = 1;
		await this.getDataAsync();	
	}

    abstract getDataAsync(): void;
	abstract onCreateClicked(optionSelected: INavigationOptionSelected): void;
	abstract onBackClicked(): void;
	abstract onHomeClicked(): void;

	updatePage(pageData: PageData<T>) {		
		let pageFrom = (this.pageNumber * this.pageSize) - this.pageSize + 1;
		let pageTo = pageFrom + this._pageData.data.length - 1;
		let pageTotal = pageData.grandTotal;

		if (pageTotal == 0) {
			this.pageSelected = { from: 0, to: 0, total: 0 };
		}
		else {
			this.pageSelected = { from: pageFrom, to: pageTo, total: pageTotal };
		}
	}

	async onPageOptionClicked(option: string) {
		let lastPage = Math.ceil(this._pageData.grandTotal / this.pageSize);

		switch (option) {
			case "first":
				this.pageNumber = 1;
				break;
			case "previous":
				if (this.pageNumber > 1) {
					this.pageNumber--;
				}
				break;
			case "next":
				if (this.pageNumber < lastPage) {
					this.pageNumber++;
				}
				break;		
			case "last":
				this.pageNumber = lastPage;
				break;
		}

		await this.getDataAsync();
	}

	async onPageSizeClicked(pageSize: number) {
		this.pageNumber = 1;
		this.pageSize = pageSize;
		await this.getDataAsync();
		this.localStorageService.setPageSize(this.pageSize);
	}
}