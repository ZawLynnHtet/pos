// To parse this data:
//
//   import { Convert, Bill } from "./file";
//
//   const bill = Convert.toBill(json);

export interface Bill {
    id?: number;
    order_id?: number;
    menu_id: number;
    // payment_id?: number;
    qty: number;
    total_price: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toBill(json: string): Bill {
        return JSON.parse(json);
    }

    public static billToJson(value: Bill): string {
        return JSON.stringify(value);
    }
}
