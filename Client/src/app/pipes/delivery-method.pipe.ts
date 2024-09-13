import { Pipe, PipeTransform } from '@angular/core';
import { general } from '../source/general';

@Pipe({
	name: 'deliveryMethod'
})
export class DeliveryMethodPipe implements PipeTransform {

	transform(value: string): string {
		switch (value) {
			// case 'on-site':
			// 	return 'Comer en el restaurante';
			case general.DELIVERY_METHOD_TAKE_AWAY:
				return 'Recoger en restaurante';
			case general.DELIVERY_METHOD_FOR_DELIVER:
				return 'Enviar a dirección';
		}

		return `No se pudo resolver el valor '${value}' para el pipe 'RoleStr' no encontrado`
	}

}