import type { NetworkKey, NetworkMeta, ShareOptions } from "./types";

// Joins message and link with a space, skipping an empty message
const message = (text: string, link: string) => [text, link].filter(Boolean).join(" ");

const networks: Record<NetworkKey, NetworkMeta> = {
	facebook: {
		label: "Facebook",
		color: "#1877F2",
		url: ({ link }: ShareOptions) =>
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
	},
	twitter: {
		label: "Twitter / X",
		color: "#1DA1F2",
		url: ({ link, text = "" }: ShareOptions) =>
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
	},
	linkedin: {
		label: "LinkedIn",
		color: "#0A66C2",
		url: ({ link }: ShareOptions) =>
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
	},
	whatsapp: {
		label: "WhatsApp",
		color: "#25D366",
		url: ({ link, text = "" }: ShareOptions) =>
			`https://api.whatsapp.com/send?text=${encodeURIComponent(message(text, link))}`,
	},
	telegram: {
		label: "Telegram",
		color: "#229ED9",
		url: ({ link, text = "" }: ShareOptions) =>
			`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
	},
	pinterest: {
		label: "Pinterest",
		color: "#E60023",
		url: ({ link, media = "", title, text = "" }: ShareOptions) =>
			`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(link)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(title ?? text)}`,
	},
	reddit: {
		label: "Reddit",
		color: "#FF4500",
		url: ({ link, title, text = "" }: ShareOptions) =>
			`https://www.reddit.com/submit?url=${encodeURIComponent(link)}&title=${encodeURIComponent(title ?? text)}`,
	},
	email: {
		label: "Email",
		color: "#6B7280",
		url: ({ link, subject = "Check this out", body, text = "" }: ShareOptions) =>
			`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message(body ?? text, link))}`,
	},
	sms: {
		label: "SMS",
		color: "#34D399",
		url: ({ link, body, text = "" }: ShareOptions) =>
			`sms:?&body=${encodeURIComponent(message(body ?? text, link))}`,
	},
	viber: {
		label: "Viber",
		color: "#7360F2",
		url: ({ link, text = "" }: ShareOptions) =>
			`viber://forward?text=${encodeURIComponent(message(text, link))}`,
	},
};

// Own-property check, so keys like "constructor" aren't treated as networks
export function isNetworkKey(value: string): value is NetworkKey {
	return Object.prototype.hasOwnProperty.call(networks, value);
}

export default networks;
