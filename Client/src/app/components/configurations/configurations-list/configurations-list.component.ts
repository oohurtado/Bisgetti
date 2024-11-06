import { Component } from '@angular/core';
import { LocalStorageService } from '../../../services/common/local-storage.service';

@Component({
    selector: 'app-configurations-list',
    templateUrl: './configurations-list.component.html',
    styleUrl: './configurations-list.component.css'
})
export class ConfigurationsListComponent {

    constructor(public localStorageService: LocalStorageService) {
    }
    
}
