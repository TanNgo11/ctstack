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

export const projectIndustries = [
	"fnb",
	"beauty",
	"real_estate",
	"retail",
	"education",
	"other",
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
	"home.testimonialsEyebrow": "Khách hàng nói gì",
	"home.testimonialsTitle": "Kết quả qua lời khách hàng",
	"home.processTitle": "Từ ý tưởng đến sản phẩm, rõ ràng và minh bạch",
	"home.processEyebrow": "Quy trình làm việc",
	"home.whyEyebrow": "Vì sao chọn CTStack",
	"home.whyTitle": "Cam kết rõ ràng, ghi vào hợp đồng",
	"home.why": [
		["Báo giá cố định", "Chốt phạm vi và chi phí trước khi làm. Không phát sinh ngoài thoả thuận."],
		["Demo mỗi tuần", "Bạn xem tiến độ trên link demo thật và góp ý sớm, không phải chờ đến cuối."],
		["Bàn giao toàn bộ", "Source code, tên miền, hosting và tài khoản quản trị đứng tên bạn."],
		["Bảo hành 12 tháng", "Sửa lỗi miễn phí, hỗ trợ qua Zalo trong giờ hành chính."],
	],
	"home.pricingEyebrow": "Bảng giá",
	"home.pricingTitle": "Chọn gói phù hợp, nâng cấp khi cần",
	"home.pricingPopular": "Phổ biến",
	"home.pricingCta": "Nhận báo giá chi tiết",
	"home.pricingNote": "Giá cuối tuỳ phạm vi tính năng. Báo giá chi tiết trong 24 giờ, miễn phí.",
	"home.tiers": [
		{
			name: "Cơ bản",
			price: "8 triệu",
			desc: "Website giới thiệu cho doanh nghiệp nhỏ, cần lên online nhanh.",
			features: [
				"5–8 trang, giao diện theo mẫu tuỳ chỉnh",
				"Tối ưu mobile và tốc độ",
				"SEO cơ bản, Google Analytics",
				"Form liên hệ gửi về email",
				"Bảo hành 6 tháng",
			],
			popular: false,
		},
		{
			name: "Chuyên nghiệp",
			price: "12 triệu",
			desc: "Thiết kế riêng theo thương hiệu, tự cập nhật nội dung.",
			features: [
				"10–15 trang, thiết kế riêng",
				"CMS tự cập nhật tin tức, dự án",
				"SEO on-page, sitemap, schema",
				"Song ngữ Việt – Anh",
				"Bảo hành 12 tháng, bảo trì miễn phí 3 tháng",
			],
			popular: true,
		},
		{
			name: "Bán hàng",
			price: "15 triệu",
			desc: "Cửa hàng online đầy đủ từ giỏ hàng đến giao vận.",
			features: [
				"Giỏ hàng, thanh toán VNPay/MoMo",
				"Quản lý sản phẩm, tồn kho, đơn hàng",
				"Tích hợp GHN, GHTK",
				"Báo cáo doanh thu",
				"Bảo hành 12 tháng, bảo trì miễn phí 6 tháng",
			],
			popular: false,
		},
		{
			name: "Doanh nghiệp",
			price: "30 triệu",
			desc: "Web app, hệ thống nội bộ theo đúng quy trình của bạn.",
			features: [
				"Phân tích nghiệp vụ, thiết kế UX",
				"Phân quyền, dashboard, báo cáo",
				"Tích hợp API, phần mềm sẵn có",
				"Triển khai trên hạ tầng của bạn",
				"Bảo hành 12 tháng, hỗ trợ theo SLA",
			],
			popular: false,
		},
	],
	"home.contactEyebrow": "Liên hệ",
	"contact.trust": [
		"Phản hồi trong 24 giờ",
		"Đề xuất cụ thể, không chung chung",
		"Bảo mật thông tin",
	],
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
	"projects.industry": "Ngành",
	"projects.duration": "Thời gian",
	"projects.team": "Đội ngũ",
	"projects.features": "Tính năng chính",
	"projects.testimonial": "Khách hàng nhận xét",
	"projects.liveBadge": "Live",
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

	"industry.fnb": "F&B",
	"industry.beauty": "Spa & làm đẹp",
	"industry.real_estate": "Bất động sản",
	"industry.retail": "Bán lẻ",
	"industry.education": "Giáo dục",
	"industry.other": "Khác",

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
	"contact.success": "Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.",
	"contact.privacy": "Thông tin của bạn chỉ được dùng để trao đổi về dự án.",
	"contact.selectService": "Chọn nhu cầu của bạn",
	"contact.selectBudget": "Chọn khoảng ngân sách",
	"contact.selectDefault": "Chọn một mục",
	"contact.emailShort": "Email",
	"contact.locationLabel": "Khu vực",
	"contact.location": "Việt Nam",
	"contact.channelsTitle": "Kênh liên hệ",
	"contact.zaloShort": "Zalo",
	"contact.phoneShort": "Điện thoại",
	"contact.messengerShort": "Messenger",
	"contact.hoursLabel": "Giờ làm việc",
	"contact.hours": "T2–T7, 8:30–18:00",
	"contact.nextStepsEyebrow": "Sau khi gửi",
	"contact.nextStepsTitle": "Bạn sẽ nhận được gì tiếp theo",
	"contact.nextSteps": [
		["Chúng tôi gọi lại trong 24h", "Xác nhận nhu cầu và thống nhất thời gian trao đổi."],
		["Trao đổi chi tiết & đề xuất", "Làm rõ phạm vi, mục tiêu và hướng triển khai phù hợp."],
		["Báo giá rõ ràng", "Nhận báo giá theo phạm vi đã thống nhất, không phát sinh bất ngờ."],
	],

	"notFound.title": "Không tìm thấy trang",
	"notFound.text": "Trang bạn tìm không tồn tại hoặc đã được chuyển.",
	"notFound.home": "Về trang chủ",

	"footer.rights": "Bảo lưu mọi quyền.",
	"theme.light": "Sáng",
	"theme.dark": "Tối",
	"theme.system": "Hệ thống",

	"seo.homeDescription":
		"CTStack thiết kế và xây dựng website, web app và ứng dụng di động giúp doanh nghiệp bán hàng và vận hành tốt hơn.",
	"seo.projectsDescription":
		"Xem các website, web app và ứng dụng di động CTStack đã thiết kế và phát triển cho doanh nghiệp.",
	"seo.servicesDescription":
		"Dịch vụ thiết kế website, phát triển web app và ứng dụng di động phù hợp với quy trình kinh doanh của bạn.",
	"seo.aboutDescription":
		"Tìm hiểu CTStack, nhóm phát triển phần mềm xây dựng website, web app và ứng dụng di động cho doanh nghiệp vừa và nhỏ.",
	"seo.contactDescription":
		"Trao đổi về website hoặc ứng dụng của bạn với CTStack và nhận đề xuất cụ thể trong vòng 24 giờ.",
	"seo.notFoundDescription": "Trang bạn tìm không tồn tại hoặc đã được chuyển.",
	"seo.faqDescription":
		"Giải đáp về chi phí, thời gian, bảo hành, kỹ thuật và quản lý nội dung khi làm website, ứng dụng với CTStack.",
	"faq.eyebrow": "FAQ",
	"faq.title": "Câu hỏi thường gặp",
	"faq.intro": "Những điều khách hàng hay hỏi trước khi bắt đầu một dự án.",
	"faq.search": "Tìm câu hỏi…",
	"faq.searchLabel": "Tìm trong câu hỏi thường gặp",
	"faq.all": "Tất cả",
	"faq.cat.pricing": "Chi phí & báo giá",
	"faq.cat.timeline": "Thời gian & quy trình",
	"faq.cat.warranty": "Bảo hành & bảo trì",
	"faq.cat.technical": "Kỹ thuật & SEO",
	"faq.cat.content": "Quản lý nội dung",
	"faq.empty": "Không tìm thấy câu hỏi phù hợp.",
	"faq.askTitle": "Chưa thấy câu trả lời?",
	"faq.askText": "Gửi câu hỏi cho chúng tôi, bạn sẽ nhận được trả lời trong 24 giờ.",
	"faq.askCta": "Gửi câu hỏi",
	"footer.support": "Hỗ trợ",
	"footer.faq": "Câu hỏi thường gặp",
	"footer.warranty": "Chính sách bảo hành",
	"footer.privacy": "Bảo mật",
	"footer.terms": "Điều khoản",

	"serviceDetail.cta": "Nhận tư vấn & báo giá trong 24h",
	"serviceDetail.packagesEyebrow": "Bảng giá",
	"serviceDetail.packagesTitle": "Chọn gói phù hợp",
	"serviceDetail.painsEyebrow": "Vấn đề thường gặp",
	"serviceDetail.painsTitle": "Những vấn đề chúng tôi hay gặp",
	"serviceDetail.comparisonEyebrow": "So sánh",
	"serviceDetail.comparisonTitle": "Tự làm hay thuê CTStack?",
	"serviceDetail.comparisonCriterion": "Tiêu chí",
	"serviceDetail.comparisonDiy": "Tự làm / giải pháp có sẵn",
	"serviceDetail.comparisonUs": "CTStack",
	"serviceDetail.questionsEyebrow": "Trước khi ký hợp đồng",
	"serviceDetail.questionsTitle": "Những câu nên hỏi trước khi chọn đơn vị làm",
	"serviceDetail.processTitle": "Quy trình 6 bước",
	"serviceDetail.process": [
		["Trao đổi", "Nghe mục tiêu, khách hàng và ngân sách của bạn."],
		["Đề xuất", "Phạm vi, timeline và báo giá cố định."],
		["Thiết kế", "Giao diện trên Figma, 2–3 vòng góp ý."],
		["Lập trình", "Demo mỗi tuần trên link thật."],
		["Kiểm thử", "Tốc độ, mobile, SEO, form, trình duyệt."],
		["Bàn giao", "Hướng dẫn sử dụng, bàn giao tài khoản, bảo hành."],
	],
	"serviceDetail.relatedProjects": "Dự án liên quan",
	"serviceDetail.faqTitle": "Câu hỏi về dịch vụ này",
	"serviceDetail.faqAll": "Xem tất cả câu hỏi",
	"serviceDetail.relatedServices": "Dịch vụ liên quan",
	"serviceDetail.viewDetails": "Xem chi tiết",
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
	"home.testimonialsEyebrow": "What clients say",
	"home.testimonialsTitle": "Results, in our clients’ words",
	"home.processTitle": "From idea to product, clear and transparent",
	"home.processEyebrow": "How we work",
	"home.whyEyebrow": "Why CTStack",
	"home.whyTitle": "Clear commitments, written into the contract",
	"home.why": [
		["Fixed quote", "Scope and cost are agreed before we start. No surprise extras."],
		[
			"Weekly demos",
			"Follow progress on a live demo link and give feedback early, not at the end.",
		],
		["Full handover", "Source code, domain, hosting and admin accounts are in your name."],
		["12-month warranty", "Free bug fixes and Zalo support during business hours."],
	],
	"home.pricingEyebrow": "Pricing",
	"home.pricingTitle": "Pick a package, upgrade when you need to",
	"home.pricingPopular": "Popular",
	"home.pricingCta": "Get a detailed quote",
	"home.pricingNote": "Final price depends on scope. Free detailed quote within 24 hours.",
	"home.tiers": [
		{
			name: "Basic",
			price: "$350",
			desc: "A company website for small businesses that need to get online fast.",
			features: [
				"5–8 pages from a customised template",
				"Mobile and speed optimised",
				"Basic SEO, Google Analytics",
				"Contact form to your inbox",
				"6-month warranty",
			],
			popular: false,
		},
		{
			name: "Professional",
			price: "$500",
			desc: "Custom design for your brand, content you can update yourself.",
			features: [
				"10–15 pages, custom design",
				"CMS for news and projects",
				"On-page SEO, sitemap, schema",
				"Vietnamese – English",
				"12-month warranty, 3 months free maintenance",
			],
			popular: true,
		},
		{
			name: "E-commerce",
			price: "$700",
			desc: "A full online store from cart to delivery.",
			features: [
				"Cart, VNPay/MoMo payments",
				"Products, stock and orders",
				"GHN, GHTK shipping",
				"Sales reports",
				"12-month warranty, 6 months free maintenance",
			],
			popular: false,
		},
		{
			name: "Enterprise",
			price: "$1,200",
			desc: "Web apps and internal systems built around your process.",
			features: [
				"Business analysis and UX design",
				"Roles, dashboards, reports",
				"API and existing software integration",
				"Deployed on your infrastructure",
				"12-month warranty, SLA support",
			],
			popular: false,
		},
	],
	"home.contactEyebrow": "Contact",
	"contact.trust": [
		"Reply within 24 hours",
		"Specific proposals, not boilerplate",
		"Your details stay private",
	],
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
	"projects.industry": "Industry",
	"projects.duration": "Duration",
	"projects.team": "Team",
	"projects.features": "Key features",
	"projects.testimonial": "Client feedback",
	"projects.liveBadge": "Live",
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

	"industry.fnb": "F&B",
	"industry.beauty": "Beauty & wellness",
	"industry.real_estate": "Real estate",
	"industry.retail": "Retail",
	"industry.education": "Education",
	"industry.other": "Other",

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
	"contact.success": "Thank you! We will contact you within 24 hours.",
	"contact.privacy": "Your details are only used to discuss your project.",
	"contact.selectService": "Choose a service",
	"contact.selectBudget": "Choose a budget range",
	"contact.selectDefault": "Choose an option",
	"contact.emailShort": "Email",
	"contact.locationLabel": "Location",
	"contact.location": "Vietnam",
	"contact.channelsTitle": "Other ways to reach us",
	"contact.zaloShort": "Zalo",
	"contact.phoneShort": "Phone",
	"contact.messengerShort": "Messenger",
	"contact.hoursLabel": "Working hours",
	"contact.hours": "Mon–Sat, 8:30 am–6:00 pm",
	"contact.nextStepsEyebrow": "What happens next",
	"contact.nextStepsTitle": "What happens after you send it",
	"contact.nextSteps": [
		["We call back within 24 hours", "We confirm your needs and agree on a time to talk."],
		["Detailed discussion & proposal", "We clarify scope, goals and the right way to build it."],
		["A clear quote", "You get a quote based on the agreed scope, with no surprises."],
	],

	"notFound.title": "Page not found",
	"notFound.text": "The page you're looking for doesn't exist or has moved.",
	"notFound.home": "Back to home",

	"footer.rights": "All rights reserved.",
	"theme.light": "Light",
	"theme.dark": "Dark",
	"theme.system": "System",

	"seo.homeDescription":
		"CTStack designs and builds websites, web apps and mobile apps that help businesses sell and operate better.",
	"seo.projectsDescription":
		"Explore websites, web apps and mobile apps CTStack has designed and built for businesses.",
	"seo.servicesDescription":
		"Website design, web app development and mobile app services shaped around your business workflow.",
	"seo.aboutDescription":
		"Meet CTStack, a software team building websites, web apps and mobile apps for small and medium businesses.",
	"seo.contactDescription":
		"Tell CTStack about your website or app and receive a specific proposal within 24 hours.",
	"seo.notFoundDescription": "The page you are looking for does not exist or has moved.",
	"seo.faqDescription":
		"Answers about cost, timeline, warranty, technology and content management when building with CTStack.",
	"faq.eyebrow": "FAQ",
	"faq.title": "Frequently asked questions",
	"faq.intro": "What clients usually ask before starting a project.",
	"faq.search": "Search questions…",
	"faq.searchLabel": "Search the FAQ",
	"faq.all": "All",
	"faq.cat.pricing": "Pricing & quotes",
	"faq.cat.timeline": "Timeline & process",
	"faq.cat.warranty": "Warranty & maintenance",
	"faq.cat.technical": "Technical & SEO",
	"faq.cat.content": "Content management",
	"faq.empty": "No matching questions.",
	"faq.askTitle": "Didn’t find your answer?",
	"faq.askText": "Send us your question and we will reply within 24 hours.",
	"faq.askCta": "Ask a question",
	"footer.support": "Support",
	"footer.faq": "FAQ",
	"footer.warranty": "Warranty",
	"footer.privacy": "Privacy",
	"footer.terms": "Terms",

	"serviceDetail.cta": "Get advice and a quote within 24 hours",
	"serviceDetail.packagesEyebrow": "Pricing",
	"serviceDetail.packagesTitle": "Choose a package",
	"serviceDetail.painsEyebrow": "Common problems",
	"serviceDetail.painsTitle": "Problems we see most often",
	"serviceDetail.comparisonEyebrow": "Comparison",
	"serviceDetail.comparisonTitle": "Do it yourself or hire CTStack?",
	"serviceDetail.comparisonCriterion": "Criterion",
	"serviceDetail.comparisonDiy": "DIY / off-the-shelf",
	"serviceDetail.comparisonUs": "CTStack",
	"serviceDetail.questionsEyebrow": "Before you sign",
	"serviceDetail.questionsTitle": "Questions to ask before you choose a vendor",
	"serviceDetail.processTitle": "Our 6-step process",
	"serviceDetail.process": [
		["Discovery", "Your goals, customers and budget."],
		["Proposal", "Scope, timeline and a fixed quote."],
		["Design", "Screens in Figma, 2–3 feedback rounds."],
		["Development", "A live demo link every week."],
		["Testing", "Speed, mobile, SEO, forms, browsers."],
		["Handover", "Training, account handover, warranty."],
	],
	"serviceDetail.relatedProjects": "Related projects",
	"serviceDetail.faqTitle": "Questions about this service",
	"serviceDetail.faqAll": "See all questions",
	"serviceDetail.relatedServices": "Related services",
	"serviceDetail.viewDetails": "View details",
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

export function industryLabel(lang: Lang, industry: string | undefined): string | undefined {
	if (!industry) return undefined;
	const key = `industry.${industry}` as keyof Dict;
	const value = dicts[lang][key];
	return typeof value === "string" ? value : industry;
}
