/**
 * UI strings and locale helpers.
 *
 * CMS content (projects, services, pages) is translated in the admin via
 * EmDash translations. Everything hardcoded in templates lives here.
 */

export const locales = ["vi", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "vi";

export const langNames: Record<Lang, string> = {
	vi: "Tiếng Việt",
	en: "English",
};

/** Public contact email shown on the contact page. Empty hides it. */
export const contactEmail = "";

/** Form slugs created in the admin (Forms plugin), one per language. */
export const contactFormId: Record<Lang, string> = {
	vi: "lien-he",
	en: "contact",
};

export const projectCategories = [
	"website",
	"web_app",
	"mobile_app",
	"ecommerce",
	"landing_page",
] as const;

const vi = {
	"site.tagline": "Thiết kế & phát triển website, ứng dụng",
	"site.description":
		"CTStack thiết kế và xây dựng website, web app và ứng dụng di động cho doanh nghiệp.",
	"nav.home": "Trang chủ",
	"nav.projects": "Dự án",
	"nav.services": "Dịch vụ",
	"nav.about": "Giới thiệu",
	"nav.contact": "Liên hệ",
	"nav.cta": "Nhận báo giá",
	"lang.switch": "English",

	"home.eyebrow": "Studio phát triển phần mềm",
	"home.title": "Website và ứng dụng giúp doanh nghiệp bán được hàng",
	"home.intro":
		"Từ landing page, website bán hàng tới web app và mobile app — CTStack lo từ thiết kế, lập trình tới vận hành.",
	"home.ctaPrimary": "Nhận báo giá",
	"home.ctaSecondary": "Xem dự án",
	"home.servicesTitle": "Dịch vụ",
	"home.servicesLink": "Tất cả dịch vụ",
	"home.projectsTitle": "Dự án tiêu biểu",
	"home.projectsLink": "Tất cả dự án",
	"home.processTitle": "Quy trình làm việc",
	"home.process": [
		["Trao đổi", "Nghe bài toán, mục tiêu và ngân sách của bạn."],
		["Đề xuất", "Báo giá rõ ràng, phạm vi và timeline cụ thể."],
		["Thiết kế & code", "Demo theo từng giai đoạn để bạn góp ý sớm."],
		["Bàn giao & bảo trì", "Deploy, hướng dẫn sử dụng, hỗ trợ sau bàn giao."],
	],
	"home.ctaBandTitle": "Có ý tưởng cần làm?",
	"home.ctaBandText": "Kể cho chúng tôi nghe — phản hồi trong vòng 24 giờ.",

	"projects.title": "Dự án",
	"projects.intro": "Một số sản phẩm CTStack đã thiết kế và phát triển.",
	"projects.all": "Tất cả",
	"projects.empty": "Chưa có dự án nào.",
	"projects.emptyFilter": "Không có dự án nào thuộc nhóm này.",
	"projects.more": "Xem thêm",
	"projects.view": "Xem dự án",
	"projects.live": "Xem sản phẩm thực tế",
	"projects.client": "Khách hàng",
	"projects.year": "Năm",
	"projects.stack": "Công nghệ",
	"projects.type": "Loại",
	"projects.results": "Kết quả",
	"projects.other": "Dự án khác",

	"category.website": "Website",
	"category.web_app": "Web app",
	"category.mobile_app": "Mobile app",
	"category.ecommerce": "Thương mại điện tử",
	"category.landing_page": "Landing page",

	"services.title": "Dịch vụ",
	"services.intro":
		"Chọn đúng thứ bạn cần. Chưa chắc? Liên hệ để được tư vấn miễn phí.",
	"services.priceFrom": "Từ",
	"services.contact": "Tư vấn gói này",
	"services.empty": "Chưa có dịch vụ nào.",

	"contact.eyebrow": "Liên hệ",
	"contact.title": "Kể cho chúng tôi về dự án của bạn",
	"contact.intro":
		"Mô tả ngắn bạn cần làm gì, thời gian và ngân sách dự kiến. Chúng tôi sẽ phản hồi qua email hoặc điện thoại trong 24 giờ.",
	"contact.emailLabel": "Hoặc email trực tiếp",

	"notFound.title": "Không tìm thấy trang",
	"notFound.text": "Trang bạn tìm không tồn tại hoặc đã được chuyển.",
	"notFound.home": "Về trang chủ",

	"footer.rights": "Bảo lưu mọi quyền.",
	"theme.light": "Sáng",
	"theme.dark": "Tối",
	"theme.system": "Hệ thống",
};

type Dict = typeof vi;

const en: Dict = {
	"site.tagline": "Websites & apps, designed and built",
	"site.description":
		"CTStack designs and builds websites, web apps and mobile apps for businesses.",
	"nav.home": "Home",
	"nav.projects": "Projects",
	"nav.services": "Services",
	"nav.about": "About",
	"nav.contact": "Contact",
	"nav.cta": "Get a quote",
	"lang.switch": "Tiếng Việt",

	"home.eyebrow": "Software development studio",
	"home.title": "Websites and apps that help your business sell",
	"home.intro":
		"From landing pages and online stores to web and mobile apps — CTStack handles design, development and operations.",
	"home.ctaPrimary": "Get a quote",
	"home.ctaSecondary": "See our work",
	"home.servicesTitle": "Services",
	"home.servicesLink": "All services",
	"home.projectsTitle": "Selected work",
	"home.projectsLink": "All projects",
	"home.processTitle": "How we work",
	"home.process": [
		["Discovery", "We learn your problem, goals and budget."],
		["Proposal", "A clear quote with scope and timeline."],
		["Design & build", "Staged demos so you can give feedback early."],
		["Launch & support", "Deployment, handover training and ongoing support."],
	],
	"home.ctaBandTitle": "Have an idea to build?",
	"home.ctaBandText": "Tell us about it — we reply within 24 hours.",

	"projects.title": "Projects",
	"projects.intro": "A selection of products CTStack has designed and built.",
	"projects.all": "All",
	"projects.empty": "No projects yet.",
	"projects.emptyFilter": "No projects in this category.",
	"projects.more": "Load more",
	"projects.view": "View project",
	"projects.live": "Visit live site",
	"projects.client": "Client",
	"projects.year": "Year",
	"projects.stack": "Stack",
	"projects.type": "Type",
	"projects.results": "Results",
	"projects.other": "More work",

	"category.website": "Website",
	"category.web_app": "Web app",
	"category.mobile_app": "Mobile app",
	"category.ecommerce": "E-commerce",
	"category.landing_page": "Landing page",

	"services.title": "Services",
	"services.intro":
		"Pick what you need. Not sure? Get in touch for a free consultation.",
	"services.priceFrom": "From",
	"services.contact": "Ask about this",
	"services.empty": "No services yet.",

	"contact.eyebrow": "Contact",
	"contact.title": "Tell us about your project",
	"contact.intro":
		"Briefly describe what you need, your timeline and budget. We reply by email or phone within 24 hours.",
	"contact.emailLabel": "Or email us directly",

	"notFound.title": "Page not found",
	"notFound.text": "The page you're looking for doesn't exist or has moved.",
	"notFound.home": "Back to home",

	"footer.rights": "All rights reserved.",
	"theme.light": "Light",
	"theme.dark": "Dark",
	"theme.system": "System",
};

const dicts: Record<Lang, Dict> = { vi, en };

/**
 * Map the optional `[...lang]` route param to a language: undefined is the
 * default language, a known non-default locale maps to itself, anything else
 * is not a valid route (null -> 404).
 */
export function langFromParam(param: string | undefined): Lang | null {
	if (!param) return defaultLang;
	return locales.includes(param as Lang) && param !== defaultLang ? (param as Lang) : null;
}

/** Language of a pathname, from its locale prefix. */
export function langFromPath(pathname: string): Lang {
	for (const l of locales) {
		if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) return l;
	}
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t<K extends keyof Dict>(key: K): Dict[K] {
		return dicts[lang][key];
	};
}

/** Prefix a site path with the locale segment (default locale has none). */
export function localizePath(path: string, lang: Lang): string {
	const clean = path.startsWith("/") ? path : `/${path}`;
	if (lang === defaultLang) return clean;
	return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Strip the locale prefix from a pathname: "/en/projects" -> "/projects". */
export function unlocalizePath(pathname: string): string {
	for (const l of locales) {
		if (l === defaultLang) continue;
		if (pathname === `/${l}` || pathname === `/${l}/`) return "/";
		if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
	}
	return pathname;
}

export function categoryLabel(lang: Lang, category: string | undefined): string | undefined {
	if (!category) return undefined;
	const key = `category.${category}` as keyof Dict;
	const value = dicts[lang][key];
	return typeof value === "string" ? value : category;
}
