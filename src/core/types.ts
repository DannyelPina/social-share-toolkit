export type NetworkKey =
	| "facebook"
	| "twitter"
	| "linkedin"
	| "whatsapp"
	| "telegram"
	| "pinterest"
	| "reddit"
	| "email"
	| "sms"
	| "viber";

export interface ShareOptions {
	link: string;
	text?: string;
	subject?: string;
	body?: string;
	media?: string;
	title?: string;
}

export interface NetworkMeta {
	label: string;
	color: string;
	url: (options: ShareOptions) => string;
}

export interface NetworkInfo {
	key: NetworkKey;
	label: string;
	color: string;
}

// Props shared by both React and Vue button components
export interface SocialShareButtonProps {
	network: NetworkKey;
	link: string;
	text?: string;
	subject?: string;
	body?: string;
	title?: string;
	media?: string;
	showLabel?: boolean;
}

// Props shared by both React and Vue box components
export interface SocialShareBoxProps {
	link: string;
	socials?: NetworkKey[];
	text?: string;
	subject?: string;
	body?: string;
	title?: string;
	media?: string;
	showLabel?: boolean;
	direction?: "row" | "column";
	gap?: string;
}
