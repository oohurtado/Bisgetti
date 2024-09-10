import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'deliveryMethod'
})
export class DeliveryMethodPipe implements PipeTransform {

	transform(value: string): string {
		switch (value) {
			// case 'on-site':
			// 	return 'Comer en el restaurante';
			case 'take-away':
				return 'Recoger en restaurante';
			case 'for-delivery':
				return 'Enviar a una dirección';
		}

		return `No se pudo resolver el valor '${value}' para el pipe 'RoleStr' no encontrado`
	}

}