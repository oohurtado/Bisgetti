import { Component, Input } from '@angular/core';
import { Tuple2, Tuple3 } from '../../../../../../source/models/common/tuple';

@Component({
    selector: 'app-add-element-to-element',
    templateUrl: './add-element-to-element.component.html',
    styleUrl: './add-element-to-element.component.css'
})
export class AddElementToElementComponent {
    @Input() elements!: Tuple2<number,string>[]; // id element, text element
    @Input() elementId!: number;
    @Input() elementText!: string;

    @Input() open!: boolean;
}
