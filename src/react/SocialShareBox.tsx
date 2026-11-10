import React, { CSSProperties } from "react";
import { SocialShareButton } from "./SocialShareButton";
import { getSupportedNetworks } from "../core/index";
import type { SocialShareBoxProps } from "../core/types";

interface Props extends SocialShareBoxProps {
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
}: Props) {
	const allKeys = getSupportedNetworks().map((n) => n.key);
	const keys = socials ?? allKeys;

	return (
		<div
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
