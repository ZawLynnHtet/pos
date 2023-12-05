// To parse this data:
//
//   import { Convert, Employee } from "./file";
//
//   const employee = Convert.toEmployee(json);

export interface Employee {
  employee_id?: number;
  gender: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  // img: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toEmployee(json: string): Employee {
    return JSON.parse(json);
  }

  public static employeeToJson(value: Employee): string {
    return JSON.stringify(value);
  }
}
