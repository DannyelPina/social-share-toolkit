import { describe, expect, it } from "vitest";
import { createSSRApp, h, type Component } from "vue";
import { renderToString } from "vue/server-renderer";
import { SocialShareBox, SocialShareButton } from "../src/vue/index";

const link = "https://example.com";

const render = (component: Component, props: Record<string, unknown>) =>
	renderToString(createSSRApp({ render: () => h(component, props) }));

describe("Vue SocialShareButton", () => {
	it("renders a share link with its label", async () => {
		const html = await render(SocialShareButton, { network: "facebook", link });
		expect(html).toContain('href="https://www.facebook.com/sharer/sharer.php?u=');
		expect(html).toContain("<span>Facebook</span>");
		expect(html).not.toContain("aria-label");
	});

	it("renders nothing for an empty link or unknown network", async () => {
		for (const props of [
			{ network: "email", link: "" },
			{ network: "nope", link },
			{ network: "constructor", link },
		]) {
			expect(await render(SocialShareButton, props)).not.toContain("<a");
		}
	});

	it("adds an accessible name when the label is hidden", async () => {
		const html = await render(SocialShareButton, {
			network: "whatsapp",
			link,
			showLabel: false,
		});
		expect(html).toContain('aria-label="WhatsApp"');
	});

	it("keeps the default email subject", async () => {
		const html = await render(SocialShareButton, { network: "email", link });
		expect(html).toContain("subject=Check%20this%20out");
	});

	it("passes body, title and media through", async () => {
		expect(await render(SocialShareButton, { network: "email", link, body: "yo" })).toContain(
			"body=yo%20",
		);
		expect(
			await render(SocialShareButton, {
				network: "pinterest",
				link,
				title: "T",
				media: "https://img",
			}),
		).toContain("media=https%3A%2F%2Fimg&amp;description=T");
	});
});

describe("Vue SocialShareBox", () => {
	it("passes share options to every button", async () => {
		const html = await render(SocialShareBox, {
			link,
			socials: ["email", "reddit"],
			text: "hi",
			title: "T",
		});
		expect(html).toContain("body=hi%20");
		expect(html).toContain("title=T");
	});

	it("renders an empty wrapper instead of throwing for an empty link", async () => {
		const html = await render(SocialShareBox, { link: "", socials: ["email"] });
		expect(html).not.toContain("<a");
	});
});
