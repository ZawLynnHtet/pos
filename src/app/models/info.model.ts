export interface Restaurant {
  id: number;
  restaurant_name: string;
  logoImg: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toRestaurant(json: string): Restaurant {
    return JSON.parse(json);
  }

  public static restaurantToJson(value: Restaurant): string {
    return JSON.stringify(value);
  }
}
