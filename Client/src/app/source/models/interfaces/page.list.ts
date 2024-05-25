import { PageData } from "../common/page-data";

export interface IPageList<T> {
    _isProcessing: boolean;
    _pageData: PageData<T>;
}