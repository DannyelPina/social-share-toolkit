import React, { CSSProperties } from "react";
import { getShareUrl, networks } from "../core/index";
import { isNetworkKey } from "../core/networks";
import type { SocialShareButtonProps } from "../core/types";

interface Props extends SocialShareButtonProps {
	style?: CSSProperties;
	className?: string;
	children?: React.ReactNode;
}

export function SocialShareButton({
	network,
	link,
	text = "",
	subject,
	body,
	title,
	media,
	showLabel = true,
	style = {},
	className = "",
	children,
}: Props) {
	// Render nothing rather than throw, e.g. while link is still loading
	if (!isNetworkKey(network) || !link) return null;
	const meta = networks[network];

	const href = getShareUrl(network, { link, text, subject, body, title, media });

	const baseStyle: CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		gap: "6px",
		padding: "8px 14px",
		borderRadius: "6px",
		backgroundColor: meta.color,
		color: "#fff",
		textDecoration: "none",
		fontFamily: "sans-serif",
		fontSize: "14px",
		fontWeight: 500,
		cursor: "pointer",
		...style,
	};

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			style={baseStyle}
			className={`ss-btn ss-${network} ${className}`.trim()}
			aria-label={showLabel ? undefined : meta.label}
		>
			{children}
			{showLabel && <span>{meta.label}</span>}
		</a>
	);
}
