import React, { CSSProperties, HTMLAttributes } from "react";
import { SocialShareButton } from "./SocialShareButton";
import { getSupportedNetworks } from "../core/index";
import type { SocialShareBoxProps } from "../core/types";

// Other <div> attributes (aria-*, data-*, id, ...) are passed through to the wrapper.
// title is the share title rather than the HTML attribute.
type DivAttributes = Omit<HTMLAttributes<HTMLDivElement>, keyof SocialShareBoxProps | "children">;

interface Props extends SocialShareBoxProps, DivAttributes {
	buttonStyle?: CSSProperties;
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
	direction = "row",
	gap = "8px",
	buttonStyle = {},
	className = "",
	style = {},
	...rest
}: Props) {
	const allKeys = getSupportedNetworks().map((n) => n.key);
	const keys = socials ?? allKeys;

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
			{keys.map((key) => (
				<SocialShareButton
					key={key}
					network={key}
					link={link}
					text={text}
					subject={subject}
					body={body}
					title={title}
					media={media}
					showLabel={showLabel}
					style={buttonStyle}
				/>
			))}
		</div>
	);
}
