import { PageData } from "./models/common/page-data";

export abstract class ListBase<T> {
    _pageData!: PageData<T>;
    _isProcessing!: boolean;

    pageNumber!: number;
	pageSize!: number;

    async onSyncClicked()  {
		this.pageNumber = 1;
		await this.getDataAsync();
	}

    abstract getDataAsync(): void;
}