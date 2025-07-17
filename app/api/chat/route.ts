import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: "strict", // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_SECRET_KEY,
});

// Define the resume builder system prompt
const RESUME_BUILDER_PROMPT = `You are a professional resume builder assistant. Your goal is to help users create comprehensive, well-structured resumes by gathering information about their professional experience, education, skills, and achievements.

Follow these guidelines:
1. Be conversational and friendly while maintaining professionalism
2. Ask targeted questions to gather specific information needed for a resume
3. Help organize information into proper resume sections
4. Provide suggestions for improving resume content
5. Ask follow-up questions to get more details when needed

Key information to gather:
- Personal Information (name, contact details, location)
- Professional Summary/Objective
- Work Experience (company, position, dates, achievements, responsibilities)
- Education (degree, institution, graduation date, GPA if relevant)
- Skills (technical and soft skills)
- Certifications
- Projects (personal or professional)
- Awards and Achievements
- Languages (if applicable)
- Volunteer Experience (if relevant)

When users provide information, acknowledge it and ask relevant follow-up questions to get more details. Help them quantify achievements with metrics when possible.

Remember to:
- Ask one main question at a time to avoid overwhelming the user
- Provide helpful suggestions based on best practices
- Keep responses focused and actionable
- Help users think about their experiences in terms of impact and results`;

export async function POST(req: Request) {
  try {
    console.log("Chat API called");

    // Check if OpenAI API key is configured
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

    console.log("OpenAI API key is configured");
    console.log(
      "API key starts with:",
      process.env.OPENAI_API_KEY?.slice(0, 10)
    );

    // Parse request body
    let body;
    try {
      body = await req.json();
      console.log("Request body parsed successfully");
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages);
      return new Response(
        JSON.stringify({ error: "Messages must be an array" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Messages validated, count:", messages.length);

    // Add the system prompt to the beginning of the conversation
    const systemMessage = {
      role: "system",
      content: RESUME_BUILDER_PROMPT,
    };

    console.log("System message added, attempting to call OpenAI...");

    try {
      const result = streamText({
        model: openai("gpt-4.1-mini"),
        messages: [systemMessage, ...messages],
        // temperature: 0.7,
        // maxTokens: 1000,
        onError: (error) => {
          console.error("OpenAI API error in streamText:", error);
        },
      });

      console.log("OpenAI call successful, returning stream response");
      return result.toDataStreamResponse();
    } catch (openaiError) {
      console.error("OpenAI API error:", openaiError);
      console.error("OpenAI error details:", {
        message:
          openaiError instanceof Error
            ? openaiError.message
            : String(openaiError),
        name: openaiError instanceof Error ? openaiError.name : "Unknown",
        stack: openaiError instanceof Error ? openaiError.stack : undefined,
      });

      return new Response(
        JSON.stringify({
          error: "OpenAI API error",
          details:
            openaiError instanceof Error
              ? openaiError.message
              : String(openaiError),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Unexpected error in chat API:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return new Response(
      JSON.stringify({
        error: "Unexpected server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
