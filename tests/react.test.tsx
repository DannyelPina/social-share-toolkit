import { describe, expect, it, vi } from "vitest";
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

describe("React SocialShareButton attribute forwarding", () => {
	it("passes extra attributes through to the link", () => {
		const html = renderToStaticMarkup(
			<SocialShareButton
				network="facebook"
				link={link}
				id="share"
				data-track="fb"
				aria-describedby="hint"
			/>,
		);
		expect(html).toContain('id="share"');
		expect(html).toContain('data-track="fb"');
		expect(html).toContain('aria-describedby="hint"');
	});

	it("lets target, rel and aria-label be overridden", () => {
		const html = renderToStaticMarkup(
			<SocialShareButton
				network="facebook"
				link={link}
				showLabel={false}
				target="_self"
				rel="nofollow"
				aria-label="Share this page on Facebook"
			/>,
		);
		expect(html).toContain('target="_self"');
		expect(html).toContain('rel="nofollow"');
		expect(html).toContain('aria-label="Share this page on Facebook"');
	});

	it("always uses the generated href", () => {
		// href isn't allowed by the types, so cast to simulate untyped (JS) callers
		const props = {
			network: "facebook",
			link,
			href: "https://evil.test",
		} as unknown as Parameters<typeof SocialShareButton>[0];
		expect(renderToStaticMarkup(<SocialShareButton {...props} />)).toContain(
			'href="https://www.facebook.com/sharer/sharer.php?u=',
		);
	});

	it("passes onClick to the link", () => {
		const onClick = vi.fn();
		const element = SocialShareButton({ network: "facebook", link, onClick });
		expect(element?.props.onClick).toBe(onClick);
	});
});

describe("React SocialShareBox", () => {
	it("passes extra attributes through to the wrapper", () => {
		const html = renderToStaticMarkup(
			<SocialShareBox
				link={link}
				socials={["email"]}
				id="box"
				data-x="1"
				aria-label="Share"
			/>,
		);
		expect(html).toMatch(/<div id="box" data-x="1" aria-label="Share" class="ss-box"/);
	});

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

describe("React icons and labels", () => {
	it("renders an icon before the label", () => {
		const html = renderToStaticMarkup(
			<SocialShareButton network="facebook" link={link}>
				<svg />
			</SocialShareButton>,
		);
		expect(html).toContain("<svg></svg><span>Facebook</span>");
	});

	it("replaces the label and uses it as the accessible name", () => {
		expect(
			renderToStaticMarkup(
				<SocialShareButton network="facebook" link={link} label="Share on Facebook" />,
			),
		).toContain("<span>Share on Facebook</span>");
		expect(
			renderToStaticMarkup(
				<SocialShareButton
					network="facebook"
					link={link}
					label="Share"
					showLabel={false}
				/>,
			),
		).toContain('aria-label="Share"');
	});

	it("falls back to the network name for an empty label", () => {
		const html = renderToStaticMarkup(<SocialShareButton network="sms" link={link} label="" />);
		expect(html).toContain("<span>SMS</span>");
	});

	it("renders an icon and label for every box button", () => {
		const html = renderToStaticMarkup(
			<SocialShareBox
				link={link}
				socials={["reddit", "nope" as NetworkKey, "email"]}
				renderIcon={(n) => <i data-icon={n.key} />}
				getLabel={(n) => `Share on ${n.label}`}
			/>,
		);
		expect(html).toContain('<i data-icon="reddit"></i><span>Share on Reddit</span>');
		expect(html).toContain('<i data-icon="email"></i><span>Share on Email</span>');
		expect(html.indexOf("reddit")).toBeLessThan(html.indexOf("mailto"));
		expect(html).not.toContain("nope");
	});
});
