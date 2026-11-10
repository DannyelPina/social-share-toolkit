<template>
	<div class="ss-box" :style="boxStyle">
		<SocialShareButton
			v-for="key in resolvedNetworks"
			:key="key"
			:network="key"
			:link="link"
			:text="text"
			:subject="subject"
			:body="body"
			:title="title"
			:media="media"
			:show-label="showLabel"
			:custom-style="buttonStyle"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, CSSProperties } from "vue";
import SocialShareButton from "./SocialShareButton.vue";
import { getSupportedNetworks } from "../core/index";
import type { NetworkKey } from "../core/types";

export default defineComponent({
	name: "SocialShareBox",
	components: { SocialShareButton },
	props: {
		link: { type: String, required: true },
		socials: { type: Array as PropType<NetworkKey[]>, default: null },
		text: { type: String, default: "" },
		subject: { type: String, default: undefined },
		body: { type: String, default: undefined },
		title: { type: String, default: undefined },
		media: { type: String, default: undefined },
		showLabel: { type: Boolean, default: true },
		direction: { type: String as PropType<"row" | "column">, default: "row" },
		gap: { type: String, default: "8px" },
		buttonStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
	},
	setup(props) {
		const resolvedNetworks = computed<NetworkKey[]>(
			() => props.socials ?? getSupportedNetworks().map((n) => n.key),
		);

		const boxStyle = computed<CSSProperties>(() => ({
			display: "flex",
			flexDirection: props.direction,
			flexWrap: "wrap",
			gap: props.gap,
		}));

		return { resolvedNetworks, boxStyle };
	},
});
</script>
