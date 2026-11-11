<template>
	<div class="ss-box" :style="boxStyle">
		<SocialShareButton
			v-for="item in items"
			:key="item.key"
			:network="item.key"
			:link="link"
			:text="text"
			:subject="subject"
			:body="body"
			:title="title"
			:media="media"
			:show-label="showLabel"
			:label="getLabel ? getLabel(item) : undefined"
			:custom-style="buttonStyle"
		>
			<slot name="icon" :network="item" />
		</SocialShareButton>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, CSSProperties } from "vue";
import SocialShareButton from "./SocialShareButton.vue";
import { getSupportedNetworks } from "../core/index";
import type { NetworkInfo, NetworkKey } from "../core/types";

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
		getLabel: {
			type: Function as PropType<(network: NetworkInfo) => string>,
			default: undefined,
		},
		direction: { type: String as PropType<"row" | "column">, default: "row" },
		gap: { type: String, default: "8px" },
		buttonStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
	},
	setup(props) {
		// Unknown keys are dropped here; SocialShareButton would render nothing for them anyway
		const items = computed<NetworkInfo[]>(() => {
			const supported = getSupportedNetworks();
			return props.socials
				? props.socials.flatMap((key) => supported.filter((n) => n.key === key))
				: supported;
		});

		const boxStyle = computed<CSSProperties>(() => ({
			display: "flex",
			flexDirection: props.direction,
			flexWrap: "wrap",
			gap: props.gap,
		}));

		return { items, boxStyle };
	},
});
</script>
