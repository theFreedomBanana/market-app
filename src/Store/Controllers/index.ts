
export interface ControllersState {
	readonly feature: {
		readonly [label: string]: {
			readonly [field: string]: any;
		};
	}
	readonly utility: {
		readonly [label: string]: {
			readonly [field: string]: any;
		};
	}
}
