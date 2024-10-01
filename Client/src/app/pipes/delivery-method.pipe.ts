import { Pipe, PipeTransform } from '@angular/core';
import { general } from '../source/common/general';
import { EnumDeliveryMethod } from '../source/models/enums/delivery-method-enum';

@Pipe({
	name: 'deliveryMethod'
})
export class DeliveryMethodPipe implements PipeTransform {

	transform(value: string): string {
		switch (value) {
			// case 'on-site':
			// 	return 'Comer en el restaurante';
			case EnumDeliveryMethod.TakeAway:
				return 'Recoger en restaurante';
			case EnumDeliveryMethod.ForDelivery:
				return 'Enviar a dirección';
		}

		return `No se pudo resolver el valor '${value}' para el pipe 'RoleStr' no encontrado`
	}

}