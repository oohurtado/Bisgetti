import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder, IOrderSelected } from '../../../../source/models/interfaces/page.interface';

@Component({
  selector: 'app-page-order',
  templateUrl: './page-order.component.html',
  styleUrl: './page-order.component.css'
})
export class PageOrderComponent {
    @Input() data!: IOrder;
    @Output() evt!: EventEmitter<IOrderSelected>;

    currentOption!: string;
    orderSelected!: IOrderSelected;

    constructor() {
        this.evt = new EventEmitter();
    }

    ngOnInit(): void {
        this.orderSelected = {
            data: this.data.list[this.data.startPosition].data,
            isAscending: this.data.isAscending,
        }
    }

    onOptionClicked(event: Event, index: number) {
        this.orderSelected.data = this.data.list[index].data;
        this.currentOption = this.orderSelected.data;

        this.evt.emit(this.orderSelected);
    }

    onSortClicked(event: Event) {
        let button = event.target as HTMLButtonElement;
        button.blur();
        this.orderSelected.isAscending = !this.orderSelected.isAscending;
        this.evt.emit(this.orderSelected);
    }

    isCurrentOptionSelected(data: string): boolean {
        return data === this.orderSelected.data;
    }
}
