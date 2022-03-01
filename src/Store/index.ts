import { ApplicationState } from "./Application";
import { ControllersState } from "./Controllers";
import { InformationState } from "./Information";

export interface Store {
	readonly application: ApplicationState;
	readonly controllers: ControllersState;
	readonly information: InformationState;
}
