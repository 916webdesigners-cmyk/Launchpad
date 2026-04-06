import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";
import { buildWorkflowPrompt } from "@/lib/prompts";
import type { QuestionnaireAnswers, GeneratedWorkflow } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const answers: QuestionnaireAnswers = await req.json();

    if (!answers.projectDescription) {
      return NextResponse.json(
        { error: "Missing project description" },
        { status: 400 }
      );
    }

    const prompt = buildWorkflowPrompt(answers);
    const text = await callGemini(prompt);

    let parsed: GeneratedWorkflow;

    try {
      parsed = JSON.parse(text);
    } catch (parseError) {
      const pe = parseError as Error;
      console.error("JSON parse error:", pe.message);
      console.error("Response length:", text.length);
      console.error("First 200 chars:", text.substring(0, 200));
      console.error("Last 200 chars:", text.substring(Math.max(0, text.length - 200)));
      return NextResponse.json(
        { error: "Failed to parse workflow output. Please try again." },
        { status: 500 }
      );
    }

    // Validate the response has the expected shape
    if (!parsed.phases || !Array.isArray(parsed.phases) || parsed.phases.length === 0) {
      return NextResponse.json(
        { error: "Generated workflow was incomplete. Please try again." },
        { status: 500 }
      );
    }

    // Ensure defaults for optional fields
    parsed.skillFiles = parsed.skillFiles || [];
    parsed.recommendedStack = parsed.recommendedStack || [];
    parsed.warnings = parsed.warnings || [];

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Gemini API error:", err.message);
    return NextResponse.json(
      { error: err.message || "Something went wrong generating your workflow." },
      { status: 500 }
    );
  }
}
