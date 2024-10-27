import { Pipe, PipeTransform } from '@angular/core';
import { EnumOrderStatus } from '../source/models/enums/order-status-enum';

@Pipe({
    name: 'orderStatusCustomerForDelivery'
})
export class OrderStatusCustomerForDeliveryPipe implements PipeTransform {

    transform(value: string): string {
        switch (value) {
          case EnumOrderStatus.Received:
                return 'Recibido';
            case EnumOrderStatus.Accepted:
                return 'En Proceso';
            case EnumOrderStatus.Canceled:
                return 'Cancelado';
            case EnumOrderStatus.Declined:
                return 'Declinado';
            case EnumOrderStatus.Cooking:
                return 'En Proceso';
            case EnumOrderStatus.Ready:
                return 'En Proceso';
            case EnumOrderStatus.OnTheRoad:
                return 'En Ruta';
            case EnumOrderStatus.Delivered:
                return 'Entregado';
        }

        return `No se pudo resolver el valor '${value}' para el pipe 'OrderStatusCustomer' no encontrado`
    }
}
