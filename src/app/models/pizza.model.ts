import { ITopping } from "./topping.model";

export interface IPizza {
    id: string;
    name: string;
    description: string;
    smallImageUrl: string;
    largeImageUrl: string;
    toppings?: ITopping[];
}