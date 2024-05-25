import { Component } from '@angular/core';
import { IPageList } from '../../../../../source/models/interfaces/page.list';
import { UserResponse } from '../../../../../source/models/dtos/user/user-response';
import { PageData } from '../../../../../source/models/common/page-data';

@Component({
    selector: 'app-ua-users-list',
    templateUrl: './ua-users-list.component.html',
    styleUrl: './ua-users-list.component.css'
})
export class UaUsersListComponent implements IPageList<UserResponse> {
    
    _isProcessing!: boolean;
    _pageData!: PageData<UserResponse>;

    constructor() {        
    }    
}
