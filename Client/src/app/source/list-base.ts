import { LocalStorageService } from "../services/common/local-storage.service";
import { ListFactory } from "./factories/list-factory";
import { PageData } from "./models/common/page-data";
import { INavigationOptionSelected, IOrder, IOrderSelected, IPageSelected } from "./models/interfaces/page.interface";

export abstract class ListBase<T> {

	constructor(section: string|null, localStorageService: LocalStorageService) {

        this.localStorageService = localStorageService;

		this.pageNumber = 1;
		this.pageSize = localStorageService.getPageSize();	

		if (section !== null) {			
			this._pageOrder = ListFactory.getOrder(section);		
			this._pageOrderSelected = ListFactory.getOrderInit(this._pageOrder);
		}
	}

    localStorageService!: LocalStorageService;

    _pageData!: PageData<T>;
    _isProcessing!: boolean;

    pageNumber!: number;
	pageSize!: number;
	pageSelected!: IPageSelected;

    _pageOrder!: IOrder;
	_pageOrderSelected!: IOrderSelected;    
	_pageNavigationOptionSelecter!: INavigationOptionSelected;

	_error: string|null = null;
	
    async onSyncClicked()  {
		this._error = null;
		this.pageNumber = 1;
		await this.getDataAsync();
	}

    async onOrderClicked(orderSelected: IOrderSelected)
	{	
		this._error = null;
		this._pageOrderSelected = orderSelected;
		this.pageNumber = 1;
		await this.getDataAsync();	
	}

    abstract getDataAsync(): void;

	updatePage(pageData: PageData<T>) {	
		this._error = null;	
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
		this._error = null;
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
		this._error = null;
		this.pageNumber = 1;
		this.pageSize = pageSize;
		await this.getDataAsync();
		this.localStorageService.setPageSize(this.pageSize);
	}
}