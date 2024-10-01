import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tuple3, Tuple4 } from '../../../source/models/common/tuple';

@Component({
  selector: 'app-menu-one-option',
  templateUrl: './menu-one-option.component.html',
  styleUrl: './menu-one-option.component.css'
})
export class MenuOneOptionComponent {
    @Input() menu: Tuple4<string, string, boolean, boolean>[] = []; // val, text, enabled, selected
    @Output() evtOptionClicked!: EventEmitter<string>;
    
    constructor() {
        this.evtOptionClicked = new EventEmitter<string>();
    }

    onOptionClicked(event: Event, option: Tuple3<string, string, boolean>) {
        let btn = event.target as HTMLButtonElement;
        btn.blur();

        this.menu.forEach(p => {
            p.param4 = false;

            if (option.param1 === p.param1) {
                p.param4 = true;
                this.evtOptionClicked.emit(option.param1);
            }
        })
    }
}
