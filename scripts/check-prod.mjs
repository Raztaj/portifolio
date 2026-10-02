const ORIGIN = new URL(
  (process.env.PROD_URL || "https://portifolio-pink-gamma.vercel.app").replace(
    /\/+$/,
    "",
  ),
).origin;

const TIMEOUT = 15000;

async function get(path) {
  try {
    const res = await fetch(`${ORIGIN}${path}`, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const body = await res.text();
    return {
      status: res.status,
      type: res.headers.get("content-type") ?? "",
      url: res.url,
      urlOrigin: new URL(res.url).origin,
      age: res.headers.get("age") ?? "",
      vCache: res.headers.get("x-vercel-cache") ?? "",
      error: null,
      body,
    };
  } catch (error) {
    return {
      status: 0,
      type: "",
      url: "",
      urlOrigin: null,
      age: "",
      vCache: "",
      error,
      body: "",
    };
  }
}

const IS_HOME = (r) => r.status === 200 && r.urlOrigin === ORIGIN;

const CHECKS = [
  ["home is 200", "/", IS_HOME],
  ["home twitter card uses the wide banner", "/", (r) => IS_HOME(r) && r.body.includes("social-tw.png")],
  ["home uses summary_large_image", "/", (r) => IS_HOME(r) && r.body.includes("summary_large_image")],
  ["ar home uses the ar card", "/ar", (r) => r.status === 200 && r.body.includes("social-tw-ar.png")],
  [
    "case page twitter image is the real banner",
    "/en/work/shockwave",
    (r) =>
      r.status === 200 &&
      r.body.includes("twitter:image") &&
      r.body.includes("og/shockwave.png"),
  ],
  [
    "random path returns 404 with beam-me-home",
    "/nope",
    (r) => r.status === 404 && r.body.includes("BEAM ME HOME"),
  ],
  ["sitemap is served", "/sitemap.xml", (r) => r.status === 200],
  ["robots is served", "/robots.txt", (r) => r.status === 200],
  [
    "work screenshot is served as an image",
    "/work/hasdo/map-v2.png",
    (r) => r.status === 200 && r.type.startsWith("image/"),
  ],
];

async function attempt(path, ok) {
  for (let i = 0; i < 3; i++) {
    const res = await get(path);
    const pass = ok(res);
    if (pass || i === 2) return { pass, res };
    const { status, error } = res;
    const retryable =
      status >= 500 || (status === 0 && error?.name === "TimeoutError");
    if (!retryable) return { pass, res };
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }
}

let failed = 0;
for (const [name, path, ok] of CHECKS) {
  const { pass, res } = await attempt(path, ok);
  const stale = res.age ? ` [${res.vCache} age=${res.age}s]` : "";
  const detail =
    res.status === 0 ? ` err=${res.error?.message ?? "network"}` : "";
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${pass ? stale : detail}`);
  if (!pass) failed++;
}

process.exitCode = failed ? 1 : 0;