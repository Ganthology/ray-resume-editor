import { generateText } from "ai";
import { openai } from "../chat/route";

// Context summarization prompt
const CONTEXT_SUMMARY_PROMPT = `Based on the conversation history, create a comprehensive summary of all the information gathered about this person for their resume. Include:

- Personal Information (name, contact details, location)
- Work Experience (companies, positions, dates, achievements, responsibilities)
- Education (degrees, institutions, dates, GPA, relevant coursework)
- Skills (technical skills, soft skills, certifications, languages)
- Projects (personal or professional projects with descriptions)
- Leadership Experience (leadership roles, organizations)
- Research Experience (research positions, publications)
- Volunteer Experience (if mentioned)
- Awards and Achievements
- Professional Summary/Objective points

Format the summary clearly with sections and bullet points. Only include information that has been explicitly mentioned in the conversation. If a section has no information, omit it entirely.`;

export async function POST(req: Request) {
  try {
    console.log("Generate context API called");

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages);
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Generating context summary for", messages.length, "messages");

    const contextSummary = await generateText({
      model: openai("gpt-4o-mini"),
      messages: [
        {
          role: "system",
          content: CONTEXT_SUMMARY_PROMPT,
        },
        ...messages,
      ],
      temperature: 0.3,
      maxTokens: 2000,
    });

    console.log("Context summary generated successfully");

    return new Response(
      JSON.stringify({ contextSummary: contextSummary.text }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating context summary:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return new Response(
      JSON.stringify({
        error: "Failed to generate context summary",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
