import { Company } from "./Company";
import { Item } from "./Item";
/**
 * The class enumeration is the complete list of classes, gathered by name.
*/
export interface ClassEnumeration {
	company: Company;
	item: Item;
}

/**
 * A utility to type as any value of an interface T
 */
export type ValueOf<T> = T[keyof T];
