import { CartElementResponse } from "./models/business/responses/cart-element-response";
import { Grouping } from "./models/common/grouping";
import { Tuple2 } from "./models/common/tuple";

export class CartHelper {
      
	getSuperTotal(tipPercent: number, total: number, shppingCost: number, ) {
		return this.getTip(tipPercent, total) + total + shppingCost;
	}

	getTotalInCart(cartGrouped: Grouping<string, CartElementResponse>[]) {
		let sum = 0;
		let count = 0;

		cartGrouped.forEach(p => {
			p.items.forEach(q => { 
				sum += q.productPrice * q.productQuantity 
				count += q.productQuantity;
			})
		});
		return new Tuple2<number,number>(sum,count);
	}

    getTotalByPerson(products: CartElementResponse[]) {
		let sum = 0;
		products.forEach(p => sum += p.productPrice * p.productQuantity);
		return sum;
	}

	getTip(tipPercent: number, total: number) {
		let tip = (total * tipPercent) / 100;
		return tip;		
	}
}