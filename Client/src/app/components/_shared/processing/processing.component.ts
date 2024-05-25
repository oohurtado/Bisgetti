import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-processing',
    templateUrl: './processing.component.html',
    styleUrl: './processing.component.css'
})
export class ProcessingComponent {
    @Input() text!: string;
}
