import React, { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { SocialShareButton } from "./SocialShareButton";
import { getSupportedNetworks } from "../core/index";
import type { NetworkInfo, SocialShareBoxProps } from "../core/types";

// Other <div> attributes (aria-*, data-*, id, ...) are passed through to the wrapper.
// title is the share title rather than the HTML attribute.
type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, keyof SocialShareBoxProps | "children">;

interface Props extends SocialShareBoxProps, DivAttributes {
	buttonStyle?: CSSProperties;
	// Returns the icon rendered before each button's label
	renderIcon?: (network: NetworkInfo) => ReactNode;
	className?: string;
	style?: CSSProperties;
}

export function SocialShareBox({
	link,
	socials = undefined,
	text = "",
	subject,
	body,
	title,
	media,
	showLabel = true,
	getLabel,
	direction = "row",
	gap = "8px",
	buttonStyle = {},
	renderIcon,
	className = "",
	style = {},
	...rest
}: Props) {
	const supported = getSupportedNetworks();
	// Unknown keys are dropped here; SocialShareButton would render nothing for them anyway
	const items = socials
		? socials.flatMap((key) => supported.filter((n) => n.key === key))
		: supported;

	return (
		<div
			{...rest}
			className={`ss-box ${className}`.trim()}
			style={{
				display: "flex",
				flexDirection: direction,
				flexWrap: "wrap",
				gap,
				...style,
			}}
		>
			{items.map((item) => (
				<SocialShareButton
					key={item.key}
					network={item.key}
					link={link}
					text={text}
					subject={subject}
					body={body}
					title={title}
					media={media}
					showLabel={showLabel}
					label={getLabel?.(item)}
					style={buttonStyle}
				>
					{renderIcon?.(item)}
				</SocialShareButton>
			))}
		</div>
	);
}
