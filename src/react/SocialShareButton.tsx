import React, { AnchorHTMLAttributes, CSSProperties } from "react";
import { getShareUrl, networks } from "../core/index";
import { isNetworkKey } from "../core/networks";
import type { SocialShareButtonProps } from "../core/types";

// Other <a> attributes (onClick, aria-*, data-*, ...) are passed through. href is generated,
// and title is the share title rather than the HTML attribute.
type AnchorAttributes = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	keyof SocialShareButtonProps | "href"
>;

interface Props extends SocialShareButtonProps, AnchorAttributes {
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
	...rest
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
			target="_blank"
			rel="noopener noreferrer"
			aria-label={showLabel ? undefined : meta.label}
			{...rest}
			href={href}
			style={baseStyle}
			className={`ss-btn ss-${network} ${className}`.trim()}
		>
			{children}
			{showLabel && <span>{meta.label}</span>}
		</a>
	);
}
