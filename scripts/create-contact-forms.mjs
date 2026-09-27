// Create the contact forms (vi: "lien-he", en: "contact") on a local dev database.
// Usage: start `pnpm dev`, then `node scripts/create-contact-forms.mjs [baseUrl]`.
// Dev only: signs in through the dev-bypass route. Existing forms are left alone.

const base = process.argv[2] ?? "http://localhost:4321";
const api = `${base}/_emdash/api/plugins/emdash-forms`;

const bypass = await fetch(`${base}/_emdash/api/setup/dev-bypass?redirect=/`, {
	redirect: "manual",
});
const cookie = (bypass.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).join("; ");
if (!cookie) throw new Error(`dev-bypass returned no session cookie (HTTP ${bypass.status})`);

async function call(route, body) {
	const res = await fetch(`${api}/${route}`, {
		method: "POST",
		headers: { "Content-Type": "application/json", "X-EmDash-Request": "1", cookie },
		body: JSON.stringify(body ?? {}),
	});
	const json = await res.json().catch(() => ({}));
	if (!res.ok) throw new Error(`${route}: HTTP ${res.status} ${JSON.stringify(json)}`);
	return json.data ?? json;
}

const field = (id, type, label, extra = {}) => ({
	id,
	type,
	label,
	name: id,
	required: false,
	width: "full",
	...extra,
});
const options = (items) => items.map(([value, label]) => ({ value, label }));

const forms = [
	{
		name: "Liên hệ",
		slug: "lien-he",
		fields: [
			field("name", "text", "Họ tên", {
				placeholder: "Ví dụ: Nguyễn Văn A",
				required: true,
				width: "half",
			}),
			field("phone", "tel", "Số điện thoại", { placeholder: "Ví dụ: 0901 234 567", width: "half" }),
			field("email", "email", "Email", { placeholder: "Ví dụ: ban@domain.com", required: true }),
			field("service", "select", "Bạn cần làm gì?", {
				placeholder: "Chọn nhu cầu của bạn",
				options: options([
					["website", "Website doanh nghiệp"],
					["ecommerce", "Website bán hàng"],
					["web_app", "Web app theo yêu cầu"],
					["mobile_app", "Ứng dụng di động"],
					["maintenance", "Bảo trì & tối ưu"],
					["other", "Khác"],
				]),
			}),
			field("budget", "select", "Ngân sách dự kiến", {
				placeholder: "Chọn khoảng ngân sách",
				options: options([
					["lt15", "Dưới 15 triệu"],
					["15-30", "15–30 triệu"],
					["30-60", "30–60 triệu"],
					["gt60", "Trên 60 triệu"],
					["unknown", "Chưa xác định"],
				]),
			}),
			field("message", "textarea", "Mô tả dự án", {
				placeholder: "Hãy chia sẻ thêm về ý tưởng, mục tiêu và yêu cầu của bạn...",
				required: true,
			}),
		],
		settings: {
			submitLabel: "Gửi yêu cầu",
			confirmationMessage: "Cảm ơn bạn! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
		},
	},
	{
		name: "Contact",
		slug: "contact",
		fields: [
			field("name", "text", "Full name", {
				placeholder: "e.g. Jane Doe",
				required: true,
				width: "half",
			}),
			field("phone", "tel", "Phone", { placeholder: "e.g. +84 901 234 567", width: "half" }),
			field("email", "email", "Email", { placeholder: "e.g. you@company.com", required: true }),
			field("service", "select", "What do you need?", {
				placeholder: "Choose a service",
				options: options([
					["website", "Business website"],
					["ecommerce", "E-commerce website"],
					["web_app", "Custom web app"],
					["mobile_app", "Mobile app"],
					["maintenance", "Maintenance & optimisation"],
					["other", "Other"],
				]),
			}),
			field("budget", "select", "Estimated budget", {
				placeholder: "Choose a budget range",
				options: options([
					["lt600", "Under $600"],
					["600-1200", "$600–1,200"],
					["1200-2500", "$1,200–2,500"],
					["gt2500", "Over $2,500"],
					["unknown", "Not sure yet"],
				]),
			}),
			field("message", "textarea", "Project description", {
				placeholder: "Tell us about your idea, goals and requirements...",
				required: true,
			}),
		],
		settings: {
			submitLabel: "Send request",
			confirmationMessage: "Thank you! We will reply within 24 hours.",
		},
	},
];

const existing = await call("forms/list");
const slugs = new Set((existing.items ?? existing.forms ?? existing ?? []).map((f) => f.slug));
for (const form of forms) {
	if (slugs.has(form.slug)) {
		console.log(`skip ${form.slug} (exists)`);
		continue;
	}
	await call("forms/create", {
		name: form.name,
		slug: form.slug,
		pages: [{ fields: form.fields }],
		settings: form.settings,
	});
	console.log(`created ${form.slug}`);
}
