<template>
	<a
		v-if="shareUrl"
		:href="shareUrl"
		target="_blank"
		rel="noopener noreferrer"
		:class="`ss-btn ss-${network}`"
		:style="buttonStyle"
		:aria-label="showLabel ? undefined : name"
	>
		<slot />
		<span v-if="showLabel">{{ name }}</span>
	</a>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, CSSProperties } from "vue";
import { getShareUrl, networks } from "../core/index";
import { isNetworkKey } from "../core/networks";
import type { NetworkKey } from "../core/types";

export default defineComponent({
	name: "SocialShareButton",
	props: {
		network: { type: String as PropType<NetworkKey>, required: true },
		link: { type: String, required: true },
		text: { type: String, default: "" },
		subject: { type: String, default: undefined },
		body: { type: String, default: undefined },
		title: { type: String, default: undefined },
		media: { type: String, default: undefined },
		showLabel: { type: Boolean, default: true },
		label: { type: String, default: undefined },
		customStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
	},
	setup(props) {
		const meta = computed(() => (isNetworkKey(props.network) ? networks[props.network] : null));

		const name = computed(() => props.label || meta.value?.label);

		// Render nothing rather than throw, e.g. while link is still loading
		const shareUrl = computed(() =>
			meta.value && props.link
				? getShareUrl(props.network, {
						link: props.link,
						text: props.text,
						subject: props.subject,
						body: props.body,
						title: props.title,
						media: props.media,
					})
				: null,
		);

		const buttonStyle = computed<CSSProperties>(() => ({
			display: "inline-flex",
			alignItems: "center",
			gap: "6px",
			padding: "8px 14px",
			borderRadius: "6px",
			backgroundColor: meta.value?.color ?? "#333",
			color: "#fff",
			textDecoration: "none",
			fontFamily: "sans-serif",
			fontSize: "14px",
			fontWeight: 500,
			cursor: "pointer",
			...props.customStyle,
		}));

		return { name, shareUrl, buttonStyle };
	},
});
</script>
