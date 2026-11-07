import type { App, CSSProperties } from "vue";
import type {
	SocialShareButtonProps,
	SocialShareBoxProps,
	NetworkKey,
	ShareOptions,
	NetworkInfo,
} from "../core/types";

export declare const SocialShareButton: import("vue").DefineComponent<
	SocialShareButtonProps & { customStyle?: CSSProperties }
>;
export declare const SocialShareBox: import("vue").DefineComponent<
	SocialShareBoxProps & { buttonStyle?: CSSProperties }
>;

export type { NetworkKey, ShareOptions, NetworkInfo, SocialShareButtonProps, SocialShareBoxProps };

declare const plugin: { install(app: App): void };
export default plugin;
