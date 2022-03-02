import { ClassEnumeration } from "../../Classes";

export type InformationState = {
	readonly [key in keyof ClassEnumeration]?: {
		[slug: string]: ClassEnumeration[key];
	};
};
