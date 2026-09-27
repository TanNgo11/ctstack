import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	i18n: {
		defaultLocale: "vi",
		locales: ["vi", "en"],
		routing: { prefixDefaultLocale: false },
	},
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			plugins: [formsPlugin({ defaultSpamProtection: "honeypot" })],
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Be Vietnam Pro",
			cssVariable: "--font-heading",
			weights: [400, 500, 600, 700],
			subsets: ["latin", "vietnamese"],
			fallbacks: ["sans-serif"],
		},
	],
	devToolbar: { enabled: false },
});
