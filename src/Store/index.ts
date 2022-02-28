import { ApplicationState } from "./Application";
import { FeatureState } from "./Feature";
import { InformationState } from "./Information";

export interface Store {
	readonly application: ApplicationState;
	readonly feature: FeatureState;
	readonly information: InformationState;
}
