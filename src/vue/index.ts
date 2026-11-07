import type { App } from "vue";
import SocialShareButton from "./SocialShareButton.vue";
import SocialShareBox from "./SocialShareBox.vue";

export { SocialShareButton, SocialShareBox };
export type {
	NetworkKey,
	ShareOptions,
	NetworkInfo,
	SocialShareButtonProps,
	SocialShareBoxProps,
} from "../core/types";

export default {
	install(app: App): void {
		app.component("SocialShareButton", SocialShareButton);
		app.component("SocialShareBox", SocialShareBox);
	},
};
