import { ApplicationState } from "./Application";
import { InformationState } from "./Information";

export interface Store {
	readonly application: ApplicationState;
	readonly information: InformationState;
}
