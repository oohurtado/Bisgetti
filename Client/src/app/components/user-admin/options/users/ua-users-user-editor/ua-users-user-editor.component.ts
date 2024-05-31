import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../../source/form-base';

@Component({
    selector: 'app-ua-users-user-editor',
    templateUrl: './ua-users-user-editor.component.html',
    styleUrl: './ua-users-user-editor.component.css'
})
export class UaUsersUserEditorComponent extends FormBase implements OnInit {

    constructor() {
        super();
    }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
    }

    override setupFormAsync(): void {
        // throw new Error('Method not implemented.');
    }

}
