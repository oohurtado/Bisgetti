import { RoleStrPipe } from "../../pipes/role-str.pipe";
import { Tuple2 } from "../models/common/tuple";
import { EnumRole } from "../models/enums/role.enum";

export class ListFactory {

    public static get(section: string): Tuple2<string,string>[] {
        switch (section) {
            case 'cart-delivery-methods':
                return  [
                    // new Tuple2("on-site", "Comer en el restaurante"),
                    new Tuple2("take-away", "Recoger en restaurante"),
                    new Tuple2("for-delivery", "Enviar a dirección"),
                ];
            case 'user-change-role':
                let pipe = new RoleStrPipe();
                return  [
                    new Tuple2(EnumRole.UserAdmin, pipe.transform(EnumRole.UserAdmin)),
                    new Tuple2(EnumRole.UserBoss, pipe.transform(EnumRole.UserBoss)),
                    new Tuple2(EnumRole.UserCustomer, pipe.transform(EnumRole.UserCustomer))
                ];
            case 'my-account-address-countries':
                return  [
                    new Tuple2("México", "México"),             
                ];
            case 'my-account-address-states':
                return  [
                    new Tuple2("Aguascalientes", "Aguascalientes"),
                    new Tuple2("Baja California", "Baja California"),
                    new Tuple2("Baja California Sur", "Baja California Sur"),
                    new Tuple2("Campeche", "Campeche"),
                    new Tuple2("Chiapas", "Chiapas"),
                    new Tuple2("Chihuahua", "Chihuahua"),
                    new Tuple2("Ciudad de México", "Ciudad de México"),
                    new Tuple2("Coahuila", "Coahuila"),
                    new Tuple2("Colima", "Colima"),
                    new Tuple2("Durango", "Durango"),
                    new Tuple2("Guanajuato", "Guanajuato"),
                    new Tuple2("Guerrero", "Guerrero"),
                    new Tuple2("Hidalgo", "Hidalgo"),
                    new Tuple2("Jalisco", "Jalisco"),
                    new Tuple2("Estadi de México", "Estadi de México"),
                    new Tuple2("Michoacán", "Michoacán"),
                    new Tuple2("Morelos", "Morelos"),
                    new Tuple2("Nayarit", "Nayarit"),
                    new Tuple2("Nuevo León", "Nuevo León"),
                    new Tuple2("Oaxaca", "Oaxaca"),
                    new Tuple2("Puebla", "Puebla"),
                    new Tuple2("Querétaro", "Querétaro"),
                    new Tuple2("Quintana Roo", "Quintana Roo"),
                    new Tuple2("San Luis Potosí", "San Luis Potosí"),
                    new Tuple2("Sinaloa", "Sinaloa"),
                    new Tuple2("Sonora", "Sonora"),
                    new Tuple2("Tabasco", "Tabasco"),
                    new Tuple2("Tamaulipas", "Tamaulipas"),
                    new Tuple2("Tlaxcala", "Tlaxcala"),
                    new Tuple2("Veracruz", "Veracruz"),
                    new Tuple2("Yucatán", "Yucatán"),
                    new Tuple2("Zacatecas", "Zacatecas")
                ];
        }

        throw new Error(`ListFactory: '${section}' not implemented.`);
    }
}