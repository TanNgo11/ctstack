import { getTranslations } from "emdash";
import { localizePath, locales, type Lang } from "../i18n/ui";

/**
 * Build per-language paths for a content entry from its translations, for
 * the language switcher. Languages without a published translation map to
 * null so the switcher falls back to that language's home page.
 */
export async function contentAlternates(
	collection: string,
	entryId: string,
	pathFor: (slug: string) => string,
): Promise<Record<Lang, string | null>> {
	const { translations } = await getTranslations(collection, entryId);
	const result = Object.fromEntries(locales.map((l) => [l, null])) as Record<Lang, string | null>;
	for (const tr of translations) {
		const lang = tr.locale as Lang;
		if (!locales.includes(lang) || tr.status !== "published" || !tr.slug) continue;
		result[lang] = localizePath(pathFor(tr.slug), lang);
	}
	return result;
}

/** Only allow http(s) links from CMS fields into hrefs. */
export function safeExternalUrl(value: string | undefined | null): string | undefined {
	if (!value) return undefined;
	try {
		const url = new URL(value);
		return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
	} catch {
		return undefined;
	}
}

export function splitStack(stack: string | undefined | null): string[] {
	return (stack ?? "")
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

/**
 * Split Portable Text into sections that each start at an h2 block, so a case
 * study can lay out "Problem / Solution / Result" side by side. Content with no
 * h2 comes back as one section.
 */
export function splitByHeading<T extends { style?: string }>(
	blocks: T[] | undefined | null,
): T[][] {
	const sections: T[][] = [];
	for (const block of blocks ?? []) {
		if (block.style === "h2" || sections.length === 0) sections.push([]);
		sections[sections.length - 1]!.push(block);
	}
	return sections;
}

/** getEmDashEntry reports a missing slug as an error rather than a null entry. */
export function isNotFoundError(error: unknown): boolean {
	return (error as { name?: string } | undefined)?.name === "LiveEntryNotFoundError";
}
