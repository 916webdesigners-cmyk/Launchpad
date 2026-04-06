const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing GEMINI_API_KEY in environment variables. Get one free at https://aistudio.google.com/apikey"
  );
}

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

export async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 16384,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini REST API error:", response.status, errorBody.substring(0, 500));
    throw new Error(`Gemini API returned ${response.status}: ${errorBody.substring(0, 200)}`);
  }

  const data = await response.json();

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error("Gemini returned no candidates");
  }

  // gemini-2.5-flash returns multiple parts: thinking (thought=true) and response
  // We need to find the last non-thought part which contains the actual JSON
  const parts = data.candidates[0].content.parts;
  let text = "";

  for (const part of parts) {
    if (part.text && !part.thought) {
      text += part.text;
    }
  }

  // Fallback: if no non-thought part found, use the last part
  if (!text && parts.length > 0) {
    text = parts[parts.length - 1].text || "";
  }

  // Clean up: remove potential markdown code fences
  text = text.replace(/^```json\n?/i, "").replace(/\n?```$/i, "").trim();

  if (!text) {
    throw new Error("Gemini returned empty text response");
  }

  return text;
}
