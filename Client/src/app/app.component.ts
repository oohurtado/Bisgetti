import { Component } from '@angular/core';
import { LocalStorageService } from './services/common/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {    

    constructor(private localStorageService: LocalStorageService) {
    }

    isUserAuthenticated() {
        return this.localStorageService.isUserAuthenticated();
    }
}
