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

/**
 * Quick contact channels (header, footer, floating buttons). Empty hides the
 * channel. TODO: fill in real values before launch.
 */
export const contactPhone: string = ""; // e.g. "+84901234567"
export const zaloUrl: string = ""; // e.g. "https://zalo.me/84901234567"
export const messengerUrl: string = ""; // e.g. "https://m.me/ctstack"

/** Form slugs created in the admin (Forms plugin), one per language. */
export const contactFormId: Record<Lang, string> = {
	vi: "lien-he",
	en: "contact",
};

/** Technologies shown on the home page (proper names, not translated). */
export const techStack = [
	"React",
	"Next.js",
	"Astro",
	"React Native",
	"Node.js",
	"Cloudflare",
] as const;

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
	"nav.menu": "Mở menu",
	"nav.close": "Đóng menu",
	"lang.switch": "English",

	"home.eyebrow": "Studio phát triển phần mềm",
	"home.title": "Website và ứng dụng giúp doanh nghiệp bán được hàng",
	"home.intro":
		"Từ landing page, website bán hàng tới web app và mobile app — CTStack lo từ thiết kế, lập trình tới vận hành.",
	"home.ctaPrimary": "Nhận báo giá",
	"home.ctaSecondary": "Xem dự án",
	"home.techTitle": "Công nghệ chúng tôi sử dụng",
	"home.mockRevenue": "Doanh thu",
	"home.mockOrders": "Đơn hàng",
	"home.mockCustomers": "Khách hàng",
	"home.mockChart": "Doanh thu theo tháng",
	"home.mockShop": "Cửa hàng",
	"home.servicesTitle": "Giải pháp phù hợp cho mọi giai đoạn phát triển",
	"home.servicesLink": "Xem tất cả dịch vụ",
	"home.servicesEyebrow": "Dịch vụ của chúng tôi",
	"home.projectsTitle": "Những sản phẩm tạo ra giá trị thật",
	"home.projectsLink": "Xem tất cả dự án",
	"home.projectsEyebrow": "Dự án nổi bật",
	"home.processTitle": "Từ ý tưởng đến sản phẩm, rõ ràng và minh bạch",
	"home.processEyebrow": "Quy trình làm việc",
	"home.process": [
		["Trao đổi", "Nghe bài toán, mục tiêu và ngân sách của bạn."],
		["Đề xuất", "Báo giá rõ ràng, phạm vi và timeline cụ thể."],
		["Thiết kế & code", "Demo theo từng giai đoạn để bạn góp ý sớm."],
		["Bàn giao & bảo trì", "Deploy, hướng dẫn sử dụng, hỗ trợ sau bàn giao."],
	],
	"global.ctaTitle": "Có ý tưởng cần làm?",
	"global.ctaText": "Kể cho chúng tôi nghe — phản hồi trong vòng 24 giờ.",
	"global.ctaAction": "Nhận báo giá",
	"footer.services": "Dịch vụ",
	"footer.company": "Công ty",
	"footer.connect": "Kết nối",
	"footer.contact": "Liên hệ",
	"footer.location": "Làm việc từ Việt Nam, phục vụ toàn cầu",
	"floating.contact": "Liên hệ nhanh",
	"floating.zalo": "Chat Zalo",
	"floating.call": "Gọi ngay",
	"floating.messenger": "Nhắn Messenger",

	"projects.title": "Dự án",
	"projects.eyebrow": "Portfolio",
	"projects.intro":
		"Một vài sản phẩm chúng tôi đã thiết kế và phát triển cho doanh nghiệp Việt Nam.",
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
	"projects.back": "Tất cả dự án",
	"projects.highlights": "Kết quả nổi bật",
	"projects.gallery": "Hình ảnh dự án",
	"projects.moreComing": "Còn nhiều dự án thú vị khác đang được thực hiện…",
	"projects.nextCta": "Cùng tạo nên dự án tiếp theo của bạn?",

	"category.website": "Website",
	"category.web_app": "Web app",
	"category.mobile_app": "Mobile app",
	"category.ecommerce": "Thương mại điện tử",
	"category.landing_page": "Landing page",

	"services.title": "Dịch vụ",
	"services.heading": "Giải pháp phần mềm vừa vặn với doanh nghiệp",
	"services.intro": "Chọn đúng điểm bắt đầu, mở rộng khi bạn sẵn sàng.",
	"services.priceFrom": "Từ",
	"services.contact": "Tư vấn gói này",
	"services.empty": "Chưa có dịch vụ nào.",

	"contact.eyebrow": "Liên hệ",
	"contact.title": "Kể cho chúng tôi về dự án của bạn",
	"contact.titleA": "Kể cho chúng tôi",
	"contact.titleB": "về dự án của bạn",
	"contact.intro":
		"Bạn đang có một ý tưởng mới, cần nâng cấp sản phẩm hiện tại hay muốn tìm người đồng hành lâu dài? Hãy để lại vài thông tin, chúng tôi sẽ phản hồi trong vòng 24 giờ.",
	"contact.emailLabel": "Hoặc email trực tiếp",
	"contact.formTitle": "Gửi thông tin dự án",
	"contact.formSubtitle": "Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.",
	"contact.privacy": "Thông tin của bạn chỉ được dùng để trao đổi về dự án.",
	"contact.selectService": "Chọn nhu cầu của bạn",
	"contact.selectBudget": "Chọn khoảng ngân sách",
	"contact.selectDefault": "Chọn một mục",
	"contact.emailShort": "Email",
	"contact.locationLabel": "Khu vực",
	"contact.location": "Việt Nam",

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
	"nav.menu": "Open menu",
	"nav.close": "Close menu",
	"lang.switch": "Tiếng Việt",

	"home.eyebrow": "Software development studio",
	"home.title": "Websites and apps that help your business sell",
	"home.intro":
		"From landing pages and online stores to web and mobile apps — CTStack handles design, development and operations.",
	"home.ctaPrimary": "Get a quote",
	"home.ctaSecondary": "See our work",
	"home.techTitle": "Technologies we use",
	"home.mockRevenue": "Revenue",
	"home.mockOrders": "Orders",
	"home.mockCustomers": "Customers",
	"home.mockChart": "Monthly revenue",
	"home.mockShop": "Shop",
	"home.servicesTitle": "Solutions for every stage of growth",
	"home.servicesLink": "See all services",
	"home.servicesEyebrow": "Our services",
	"home.projectsTitle": "Products that create real value",
	"home.projectsLink": "See all projects",
	"home.projectsEyebrow": "Featured work",
	"home.processTitle": "From idea to product, clear and transparent",
	"home.processEyebrow": "How we work",
	"home.process": [
		["Discovery", "We learn your problem, goals and budget."],
		["Proposal", "A clear quote with scope and timeline."],
		["Design & build", "Staged demos so you can give feedback early."],
		["Launch & support", "Deployment, handover training and ongoing support."],
	],
	"global.ctaTitle": "Have an idea to build?",
	"global.ctaText": "Tell us about it — we reply within 24 hours.",
	"global.ctaAction": "Get a quote",
	"footer.services": "Services",
	"footer.company": "Company",
	"footer.connect": "Connect",
	"footer.contact": "Contact",
	"footer.location": "Based in Vietnam, working worldwide",
	"floating.contact": "Quick contact",
	"floating.zalo": "Chat on Zalo",
	"floating.call": "Call us",
	"floating.messenger": "Message on Messenger",

	"projects.title": "Projects",
	"projects.eyebrow": "Portfolio",
	"projects.intro": "A few products we have designed and built for Vietnamese businesses.",
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
	"projects.back": "All projects",
	"projects.highlights": "Key results",
	"projects.gallery": "Project gallery",
	"projects.moreComing": "More exciting projects are in progress…",
	"projects.nextCta": "Shall we build your next project together?",

	"category.website": "Website",
	"category.web_app": "Web app",
	"category.mobile_app": "Mobile app",
	"category.ecommerce": "E-commerce",
	"category.landing_page": "Landing page",

	"services.title": "Services",
	"services.heading": "Software that fits your business",
	"services.intro": "Start at the right point, scale when you are ready.",
	"services.priceFrom": "From",
	"services.contact": "Ask about this",
	"services.empty": "No services yet.",

	"contact.eyebrow": "Contact",
	"contact.title": "Tell us about your project",
	"contact.titleA": "Tell us",
	"contact.titleB": "about your project",
	"contact.intro":
		"Starting something new, improving an existing product or looking for a long-term partner? Leave a few details and we will reply within 24 hours.",
	"contact.emailLabel": "Or email us directly",
	"contact.formTitle": "Send us your project",
	"contact.formSubtitle": "We will get back to you within 24 hours.",
	"contact.privacy": "Your details are only used to discuss your project.",
	"contact.selectService": "Choose a service",
	"contact.selectBudget": "Choose a budget range",
	"contact.selectDefault": "Choose an option",
	"contact.emailShort": "Email",
	"contact.locationLabel": "Location",
	"contact.location": "Vietnam",

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
