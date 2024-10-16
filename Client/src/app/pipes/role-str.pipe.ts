import { Pipe, PipeTransform } from '@angular/core';
import { EnumRole } from '../source/models/enums/role-enum';

@Pipe({
    name: 'roleStr'
})
export class RoleStrPipe implements PipeTransform {

    transform(value: string): string {
        switch(value)
        {
            case EnumRole.UserAdmin:
                return 'Administrador';
            case EnumRole.UserBoss:
                return 'Jefe';
            case EnumRole.UserCustomer:
                return 'Consumidor';
            case EnumRole.UserChef:
                return 'Chef';
        }

		return `No se pudo resolver el valor '${value}' para el pipe 'RoleStr' no encontrado`
    }

}