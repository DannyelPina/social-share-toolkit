import networks from "./networks";
import type {
	NetworkKey,
	NetworkInfo,
	ShareOptions,
	SocialShareButtonProps,
	SocialShareBoxProps,
} from "./types";

export type { NetworkKey, NetworkInfo, ShareOptions, SocialShareButtonProps, SocialShareBoxProps };
export { networks };

export function getShareUrl(networkName: NetworkKey, options: ShareOptions): string {
	const network = networks[networkName];
	if (!network) throw new Error(`Unknown network: "${networkName}"`);
	if (!options.link) throw new Error("`options.link` is required.");
	return network.url(options);
}

export function getShareUrls(
	networkNames: NetworkKey[] | null = null,
	options: ShareOptions,
): Partial<Record<NetworkKey, string | null>> {
	const keys = networkNames ?? (Object.keys(networks) as NetworkKey[]);
	return keys.reduce<Partial<Record<NetworkKey, string | null>>>((acc, key) => {
		try {
			acc[key] = getShareUrl(key, options);
		} catch {
			acc[key] = null;
		}
		return acc;
	}, {});
}

export function getSupportedNetworks(): NetworkInfo[] {
	return (Object.keys(networks) as NetworkKey[]).map((key) => ({
		key,
		label: networks[key].label,
		color: networks[key].color,
	}));
}
