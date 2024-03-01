export interface Vinyl {
  id: number;
  vinyl: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toVinyl(json: string): Vinyl {
    return JSON.parse(json);
  }

  public static vinylToJson(value: Vinyl): string {
    return JSON.stringify(value);
  }
}
