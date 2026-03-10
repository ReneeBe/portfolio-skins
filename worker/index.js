const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const PROMPT = (description) => `Generate a color theme for a portfolio website based on this vibe: "${description}"

Return ONLY a valid JSON object with exactly these keys:
{
  "--background": string,
  "--foreground": string,
  "--blob-1": string,
  "--blob-2": string,
  "--blob-3": string,
  "--blob-4": string,
  "--blob-opacity": string,
  "--blob-blur": string,
  "--grad-a": string,
  "--grad-b": string,
  "--grad-c": string,
  "--grad-d": string,
  "--glass-bg": string,
  "--glass-border": string,
  "--glass-strong-bg": string,
  "--glass-strong-border": string,
  "--blur-glass": string,
  "--blur-glass-strong": string,
  "--font-heading": string,
  "--font-body": string,
  "--bg-pattern": string
}

Rules:
- --background: page background color (can be light or dark depending on the vibe)
- --foreground: primary text color, must be readable on --background
- --blob-1 through --blob-4: hex colors for blurred glowing background orbs (set --blob-opacity to "0" if using --bg-pattern instead)
- --blob-opacity: decimal string e.g. "0.18" — set to "0" if the bg-pattern provides the visual interest
- --blob-blur: blur radius for orbs e.g. "120px"
- --grad-a through --grad-d: hex gradient colors for accent text and buttons
- --glass-bg: rgba() for frosted glass card backgrounds (e.g. "rgba(255,255,255,0.04)")
- --glass-border: rgba() for frosted glass borders (e.g. "rgba(255,255,255,0.10)")
- --glass-strong-bg: slightly more opaque than --glass-bg
- --glass-strong-border: slightly more opaque than --glass-border
- --blur-glass: backdrop blur for glass cards e.g. "20px"
- --blur-glass-strong: stronger backdrop blur e.g. "32px"
- --font-heading: one generic CSS font keyword only — must be exactly one of: serif, sans-serif, monospace, cursive, fantasy. No font names, no quotes, no commas.
- --font-body: one generic CSS font keyword only — must be exactly one of: serif, sans-serif, monospace, cursive, fantasy. No font names, no quotes, no commas.
- --bg-pattern: a CSS background-image value for a decorative background pattern, OR "none".
  Use patterns for vibrant/patterned vibes. For subtle/dark themes use "none" and rely on blob orbs instead.
  Lisa Frank → use cursive font + bright magenta/cyan/yellow blobs + leopard print pattern
  Tie-dye → conic-gradient swirl. Polka dots → radial-gradient circles. Stripes → repeating-linear-gradient.
  Examples:
    Leopard print: "radial-gradient(ellipse 22px 14px at 10% 15%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 14px 20px at 28% 8%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 18px 12px at 50% 20%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 24px 16px at 72% 10%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 16px 22px at 90% 18%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 20px 14px at 18% 42%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 14px 18px at 40% 50%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 22px 12px at 62% 38%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 16px 24px at 82% 46%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 20px 16px at 8% 68%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 18px 22px at 32% 72%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 24px 14px at 55% 65%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 14px 20px at 78% 74%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 20px 18px at 96% 62%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 16px 14px at 22% 88%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 22px 16px at 48% 90%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 18px 20px at 70% 84%, #2a1a00 100%, transparent 100%), radial-gradient(ellipse 14px 16px at 92% 92%, #2a1a00 100%, transparent 100%)"
    Stripes: "repeating-linear-gradient(45deg, #ff69b4 0px, #ff69b4 10px, #00cfff 10px, #00cfff 20px)"
    Tie-dye swirl: "conic-gradient(from 0deg, #ff6fd8, #ff9f43, #ffe234, #6bff6b, #43cfff, #a855f7, #ff6fd8)"
    Polka dots: "radial-gradient(circle 18px at 25px 25px, hotpink 100%, transparent 100%), radial-gradient(circle 18px at 75px 75px, cyan 100%, transparent 100%)"

No explanation. Return only the raw JSON object.`;

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: CORS });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: CORS });
    }

    let description;
    try {
      ({ description } = await request.json());
    } catch {
      return Response.json({ error: "Invalid JSON" }, { status: 400, headers: CORS });
    }

    if (!description?.trim()) {
      return Response.json({ error: "Description required" }, { status: 400, headers: CORS });
    }

    if (!env.ANTHROPIC_API_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 503, headers: CORS });
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages: [{ role: "user", content: PROMPT(description) }],
      }),
    });

    if (!anthropicRes.ok) {
      return Response.json({ error: "Upstream API error" }, { status: 502, headers: CORS });
    }

    const data = await anthropicRes.json();
    const text = data.content?.[0]?.text ?? "";

    // Strip markdown code fences if present
    const stripped = text.replace(/```(?:json)?\n?/g, "").trim();
    const match = stripped.match(/\{[\s\S]*\}/);

    if (!match) {
      return Response.json({ error: "Invalid AI response", raw: text.slice(0, 200) }, { status: 500, headers: CORS });
    }

    try {
      // Remove trailing commas before } or ] which Claude sometimes produces
      const cleaned = match[0].replace(/,(\s*[}\]])/g, "$1");
      const vars = JSON.parse(cleaned);
      return Response.json(vars, { headers: CORS });
    } catch (e) {
      return Response.json({ error: "Failed to parse theme", raw: match[0].slice(0, 200) }, { status: 500, headers: CORS });
    }
  },
};
