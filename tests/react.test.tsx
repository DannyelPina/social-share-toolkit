import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SocialShareBox, SocialShareButton } from "../src/react/index";
import type { NetworkKey } from "../src/core/types";

const link = "https://example.com";

describe("React SocialShareButton", () => {
	it("renders a share link with its label", () => {
		const html = renderToStaticMarkup(<SocialShareButton network="facebook" link={link} />);
		expect(html).toContain('href="https://www.facebook.com/sharer/sharer.php?u=');
		expect(html).toContain("<span>Facebook</span>");
		expect(html).not.toContain("aria-label");
	});

	it("renders nothing for an empty link or unknown network", () => {
		expect(renderToStaticMarkup(<SocialShareButton network="email" link="" />)).toBe("");
		expect(
			renderToStaticMarkup(<SocialShareButton network={"nope" as NetworkKey} link={link} />),
		).toBe("");
		expect(
			renderToStaticMarkup(
				<SocialShareButton network={"constructor" as NetworkKey} link={link} />,
			),
		).toBe("");
	});

	it("adds an accessible name when the label is hidden", () => {
		const html = renderToStaticMarkup(
			<SocialShareButton network="whatsapp" link={link} showLabel={false} />,
		);
		expect(html).toContain('aria-label="WhatsApp"');
	});

	it("keeps the default email subject", () => {
		const html = renderToStaticMarkup(<SocialShareButton network="email" link={link} />);
		expect(html).toContain("subject=Check%20this%20out");
	});

	it("passes body, title and media through", () => {
		expect(
			renderToStaticMarkup(<SocialShareButton network="email" link={link} body="yo" />),
		).toContain("body=yo%20");
		expect(
			renderToStaticMarkup(
				<SocialShareButton network="pinterest" link={link} title="T" media="https://img" />,
			),
		).toContain("media=https%3A%2F%2Fimg&amp;description=T");
	});
});

describe("React SocialShareBox", () => {
	it("passes share options to every button", () => {
		const html = renderToStaticMarkup(
			<SocialShareBox link={link} socials={["email", "reddit"]} text="hi" title="T" />,
		);
		expect(html).toContain("body=hi%20");
		expect(html).toContain("title=T");
	});

	it("renders an empty wrapper instead of throwing for an empty link", () => {
		const html = renderToStaticMarkup(<SocialShareBox link="" socials={["email"]} />);
		expect(html).not.toContain("<a");
	});
});
