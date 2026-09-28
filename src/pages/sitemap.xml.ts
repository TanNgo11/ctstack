import type { APIRoute } from "astro";
import { getEmDashCollection, getSiteSettings } from "emdash";

const locales = ["vi", "en"] as const;
type Locale = (typeof locales)[number];

const staticPaths = ["/", "/projects", "/services", "/about", "/contact", "/faq"] as const;

function localizePath(path: string, locale: Locale): string {
	if (locale === "vi") return path;
	return path === "/" ? "/en" : `/en${path}`;
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function siteOrigin(value: unknown, fallback: string): string {
	if (typeof value !== "string" || !value) return fallback;
	try {
		return new URL(value).origin;
	} catch {
		return fallback;
	}
}

/** Read all published slugs of a collection, continuing through cursor pages. */
async function getSlugs(
	collection: "projects" | "pages" | "services",
	locale: Locale,
): Promise<string[]> {
	const slugs = new Set<string>();
	let cursor: string | undefined;

	for (;;) {
		const result = await getEmDashCollection(collection, {
			locale,
			status: "published",
			limit: 100,
			...(cursor ? { cursor } : {}),
		});
		if (result.error) break;
		for (const entry of result.entries) {
			if (entry.data.slug) slugs.add(entry.data.slug);
		}
		if (!result.nextCursor) break;
		cursor = result.nextCursor;
	}

	return [...slugs];
}

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
	let configuredUrl: unknown;
	try {
		const settings = await getSiteSettings();
		configuredUrl = settings.url;
	} catch {
		// The static route list remains useful before EmDash has been initialized.
	}
	const origin = siteOrigin(configuredUrl, url.origin);
	const collect = async (collection: "projects" | "pages" | "services") => {
		const slugs = new Set<string>();
		for (const locale of locales) {
			try {
				for (const slug of await getSlugs(collection, locale)) slugs.add(slug);
			} catch {
				// Skip a collection that can't be read; static routes still go out.
			}
		}
		return slugs;
	};
	const projectSet = await collect("projects");
	const serviceSet = await collect("services");
	// Policy pages served by /chinh-sach/[page]; `about` has its own static route.
	const pageSet = await collect("pages");
	pageSet.delete("about");

	const paths = new Set<string>();
	for (const path of staticPaths) {
		for (const locale of locales) paths.add(localizePath(path, locale));
	}
	for (const slug of projectSet) {
		for (const locale of locales) paths.add(localizePath(`/projects/${slug}`, locale));
	}
	for (const slug of serviceSet) {
		for (const locale of locales) paths.add(localizePath(`/services/${slug}`, locale));
	}
	for (const slug of pageSet) {
		for (const locale of locales) paths.add(localizePath(`/chinh-sach/${slug}`, locale));
	}

	const lines = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
	];
	for (const path of paths) {
		const viPath = path.startsWith("/en") ? path.slice(3) || "/" : path;
		const basePath = viPath;
		const viUrl = `${origin}${localizePath(basePath, "vi")}`;
		const enUrl = `${origin}${localizePath(basePath, "en")}`;
		const loc = `${origin}${path}`;
		lines.push("  <url>");
		lines.push(`    <loc>${escapeXml(loc)}</loc>`);
		lines.push(`    <xhtml:link rel="alternate" hreflang="vi" href="${escapeXml(viUrl)}" />`);
		lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(enUrl)}" />`);
		lines.push(
			`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(viUrl)}" />`,
		);
		lines.push("  </url>");
	}
	lines.push("</urlset>");

	return new Response(lines.join("\n"), {
		status: 200,
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
