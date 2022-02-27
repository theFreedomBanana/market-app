import { Item } from "../../Classes/Item";

export interface InformationState {
	readonly item: {
		[slug: string]: Item;
	}
}
