import { describe, expect, it } from "vitest";
import { getShareUrl, getShareUrls, getSupportedNetworks } from "../src/core/index";
import type { NetworkKey } from "../src/core/types";

const link = "https://example.com/a?b=1";
const encodedLink = encodeURIComponent(link);

describe("getShareUrl", () => {
	it("builds a URL for every supported network", () => {
		for (const { key } of getSupportedNetworks()) {
			expect(getShareUrl(key, { link })).toContain(encodedLink);
		}
	});

	it("throws for an unknown network, including Object prototype keys", () => {
		for (const key of ["nope", "constructor", "toString", "__proto__"]) {
			expect(() => getShareUrl(key as NetworkKey, { link })).toThrow(/Unknown network/);
		}
	});

	it("throws when link is empty", () => {
		expect(() => getShareUrl("facebook", { link: "" })).toThrow(/link/);
	});

	it("doesn't prepend a space when there is no message", () => {
		for (const key of ["whatsapp", "email", "sms", "viber"] as const) {
			expect(getShareUrl(key, { link })).not.toContain("%20" + encodedLink);
		}
	});

	it("joins message and link with a space", () => {
		expect(getShareUrl("whatsapp", { link, text: "hi" })).toBe(
			`https://api.whatsapp.com/send?text=hi%20${encodedLink}`,
		);
	});

	it("uses text as the email and sms body when body isn't given", () => {
		expect(getShareUrl("email", { link, text: "hi" })).toContain(`body=hi%20${encodedLink}`);
		expect(getShareUrl("sms", { link, text: "hi" })).toContain(`body=hi%20${encodedLink}`);
	});

	it("prefers body over text for email and sms", () => {
		expect(getShareUrl("email", { link, text: "hi", body: "yo" })).toContain(
			`body=yo%20${encodedLink}`,
		);
		expect(getShareUrl("sms", { link, text: "hi", body: "yo" })).toContain(
			`body=yo%20${encodedLink}`,
		);
	});

	it("includes text in viber messages", () => {
		expect(getShareUrl("viber", { link, text: "hi" })).toBe(
			`viber://forward?text=hi%20${encodedLink}`,
		);
	});

	it("uses text as the reddit and pinterest title when title isn't given", () => {
		expect(getShareUrl("reddit", { link, text: "hi" })).toContain("title=hi");
		expect(getShareUrl("pinterest", { link, text: "hi" })).toContain("description=hi");
		expect(getShareUrl("reddit", { link, text: "hi", title: "T" })).toContain("title=T");
	});

	it("defaults the email subject and lets it be overridden", () => {
		expect(getShareUrl("email", { link })).toContain("subject=Check%20this%20out");
		expect(getShareUrl("email", { link, subject: "S" })).toContain("subject=S&");
	});

	it("encodes user input", () => {
		expect(getShareUrl("sms", { link, text: "a&b" })).toContain("body=a%26b%20");
	});
});

describe("getShareUrls", () => {
	it("returns every network when passed null", () => {
		expect(Object.keys(getShareUrls(null, { link }))).toHaveLength(
			getSupportedNetworks().length,
		);
	});

	it("returns null for networks that fail", () => {
		expect(getShareUrls(["facebook", "nope" as NetworkKey], { link })).toEqual({
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
			nope: null,
		});
	});
});
