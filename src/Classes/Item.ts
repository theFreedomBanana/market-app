
/**
 * An Item represents any objet up for sales in our market.
 */
export interface Item {
	readonly added: number;
	readonly description: string;
	readonly itemType: string;
	readonly manufacturer: string;
	readonly name: string;
	readonly price: number;
	readonly slug: string;
	readonly tags: string[];
}
