import { Expect } from "jest-editor-support";
import { EnumOrderStatus } from "../models/enums/order-status-enum";
import { EnumDeliveryMethod } from "../models/enums/delivery-method-enum";
import { OrderResponse } from "../models/dtos/entities/order-response";
import { LocalStorageService } from "../../services/common/local-storage.service";

export class OrderHelper {
    static nextStep(currentStatus: string, deliveryMethod: string) : string {

        if (currentStatus === EnumOrderStatus.Delivered || currentStatus === EnumOrderStatus.Canceled || currentStatus === EnumOrderStatus.Declined) {
            return currentStatus;
        }
        
        if (deliveryMethod == EnumDeliveryMethod.TakeAway) {
            switch(currentStatus) {
                case EnumOrderStatus.Started:
                    return EnumOrderStatus.Accepted;
                case EnumOrderStatus.Accepted:
                    return EnumOrderStatus.Cooking;
                case EnumOrderStatus.Cooking:
                    return EnumOrderStatus.Ready;
                case EnumOrderStatus.Ready:
                    return EnumOrderStatus.Delivered;
                default:
                    throw new Error("Estatus no válido");                     
            }
        }

        if (deliveryMethod == EnumDeliveryMethod.ForDelivery) {
            switch(currentStatus)
            {
                case EnumOrderStatus.Started:
                    return EnumOrderStatus.Accepted;
                case EnumOrderStatus.Accepted:
                    return EnumOrderStatus.Cooking;
                case EnumOrderStatus.Cooking:
                    return  EnumOrderStatus.Ready;
                case EnumOrderStatus.Ready:
                    return EnumOrderStatus.OnTheRoad;
                case EnumOrderStatus.OnTheRoad:
                    return EnumOrderStatus.Delivered;
                default:
                    throw new Error("Estatus no válido");
            }
        }

        throw new Error("Método de entrega/Estatus no válido");        
    }

    static canUserChangeStatus(order: OrderResponse, localStorageService: LocalStorageService) {
        return true;
    }
}