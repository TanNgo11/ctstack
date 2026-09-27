// Full-page screenshot of a local page through Chrome's DevTools protocol.
// Usage: node scripts/screenshot.mjs <path> <width> <out.png> [dark|light] [baseUrl]
//   node scripts/screenshot.mjs / 390 shots/home-390.png
//   node scripts/screenshot.mjs /en/projects 1440 shots/projects-1440.png light http://localhost:4322
// Chrome/Edge is found automatically; set CHROME_PATH to override.
// Git Bash on Windows: prefix with MSYS_NO_PATHCONV=1 so "/" isn't turned into a Windows path.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

const [
	,
	,
	path = "/",
	width = "1440",
	out = "screenshot.png",
	scheme = "dark",
	base = "http://localhost:4321",
] = process.argv;

const candidates = [
	process.env.CHROME_PATH,
	"C:/Program Files/Google/Chrome/Application/chrome.exe",
	"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/usr/bin/google-chrome",
	"/usr/bin/chromium",
	"/usr/bin/chromium-browser",
].filter(Boolean);
const chromePath = candidates.find((p) => existsSync(p));
if (!chromePath) throw new Error("Chrome not found; set CHROME_PATH");

const port = 9300 + Math.floor(Math.random() * 500);
const profile = mkdtempSync(join(tmpdir(), "ctstack-shot-"));
const chrome = spawn(
	chromePath,
	[
		"--headless=new",
		"--disable-gpu",
		"--hide-scrollbars",
		`--remote-debugging-port=${port}`,
		`--user-data-dir=${profile}`,
		"about:blank",
	],
	{ stdio: "ignore" },
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
	let targets;
	for (let i = 0; i < 50 && !targets; i++) {
		try {
			targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
		} catch {
			await sleep(200);
		}
	}
	const page = targets.find((t) => t.type === "page");
	const ws = new WebSocket(page.webSocketDebuggerUrl);
	await new Promise((r) => (ws.onopen = r));

	let id = 0;
	const pending = new Map();
	let loaded;
	const loadedP = new Promise((r) => (loaded = r));
	ws.onmessage = (e) => {
		const m = JSON.parse(e.data);
		if (m.method === "Page.loadEventFired") loaded();
		if (m.id && pending.has(m.id)) {
			pending.get(m.id)(m);
			pending.delete(m.id);
		}
	};
	const send = (method, params = {}) =>
		new Promise((r) => {
			const i = ++id;
			pending.set(i, r);
			ws.send(JSON.stringify({ id: i, method, params }));
		});

	const w = Number(width);
	// mobile:false keeps the layout viewport at exactly `w` px.
	await send("Emulation.setDeviceMetricsOverride", {
		width: w,
		height: 900,
		deviceScaleFactor: 1,
		mobile: false,
	});
	await send("Emulation.setEmulatedMedia", {
		features: [{ name: "prefers-color-scheme", value: scheme }],
	});
	await send("Page.enable");
	const nav = await send("Page.navigate", { url: new URL(path, base).href });
	if (nav.error || nav.result?.errorText)
		throw new Error(`navigate failed: ${JSON.stringify(nav.error ?? nav.result)}`);
	await Promise.race([loadedP, sleep(30000)]);
	// Load lazy images before measuring the page.
	await send("Runtime.evaluate", {
		expression:
			"document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'))",
	});
	await sleep(2500);

	const { result } = await send("Runtime.evaluate", {
		expression: "Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)",
		returnByValue: true,
	});
	const height = Math.min(result.result.value, 8000);
	const shot = await send("Page.captureScreenshot", {
		format: "png",
		captureBeyondViewport: true,
		clip: { x: 0, y: 0, width: w, height, scale: 1 },
	});
	mkdirSync(dirname(out) || ".", { recursive: true });
	writeFileSync(out, Buffer.from(shot.result.data, "base64"));
	console.log(`${out} (${w}x${height}, ${scheme})`);
	ws.close();
} finally {
	chrome.kill();
	await sleep(300);
	rmSync(profile, { recursive: true, force: true, maxRetries: 3 });
}
