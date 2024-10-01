import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tuple3 } from '../../../source/models/common/tuple';

@Component({
  selector: 'app-menu-one-option',
  templateUrl: './menu-one-option.component.html',
  styleUrl: './menu-one-option.component.css'
})
export class MenuOneOptionComponent {
    @Input() menu: Tuple3<string, string, boolean>[] = []; // val, text, selected
    @Output() evtOptionClicked!: EventEmitter<string>;
    
    constructor() {
        this.evtOptionClicked = new EventEmitter<string>();
    }

    onOptionClicked(event: Event, option: Tuple3<string, string, boolean>) {
        let btn = event.target as HTMLButtonElement;
        btn.blur();

        this.menu.forEach(p => {
            p.param3 = false;

            if (option.param1 === p.param1) {
                p.param3 = true;
                this.evtOptionClicked.emit(option.param1);
            }
        })
    }
}
