
/**
 * Type declarations for assets.
 */

declare module "*.jpg" {
	const value: string;
	export = value;
}

declare module "*.png" {
	const value: string;
	export = value;
}

declare module "*.svg" {
	const value: React.ElementType<React.ComponentPropsWithRef<"svg">>;
	export = value;
}
