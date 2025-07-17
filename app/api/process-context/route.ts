import { generateObject } from "ai";
import { openai } from "../chat/route";
import { z } from "zod";

// Define the schema for ResumeData conversion
const ResumeDataSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    linkedinUrl: z.string(),
    personalSiteUrl: z.string(),
  }),
  experiences: z.array(
    z.object({
      id: z.string(),
      position: z.string(),
      company: z.string(),
      department: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
      included: z.boolean(),
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string(),
      institution: z.string(),
      graduationDate: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      location: z.string().optional(),
      gpa: z.string().optional(),
      description: z.string().optional(),
      included: z.boolean(),
    })
  ),
  skills: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      category: z.enum([
        "skill",
        "certification",
        "other",
        "language",
        "interest",
        "activity",
      ]),
      included: z.boolean(),
    })
  ),
  leadershipExperiences: z.array(
    z.object({
      id: z.string(),
      position: z.string(),
      organization: z.string(),
      department: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
      included: z.boolean(),
    })
  ),
  projectExperiences: z.array(
    z.object({
      id: z.string(),
      position: z.string(),
      organization: z.string(),
      department: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
      included: z.boolean(),
    })
  ),
  researchExperiences: z.array(
    z.object({
      id: z.string(),
      position: z.string(),
      organization: z.string(),
      department: z.string().optional(),
      location: z.string().optional(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
      included: z.boolean(),
    })
  ),
  summary: z.object({
    content: z.string(),
    included: z.boolean(),
  }),
  portfolio: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
      qrCode: z.string().optional(),
      included: z.boolean(),
    })
  ),
  modules: z.array(
    z.object({
      id: z.string(),
      type: z.enum([
        "experience",
        "education",
        "skills",
        "summary",
        "portfolio",
        "leadership",
        "project",
        "research",
      ]),
      title: z.string(),
      order: z.number(),
      enabled: z.boolean(),
    })
  ),
  spacing: z.number(),
});

const CONTEXT_PROCESSING_PROMPT = `You are an expert resume data processor. Your task is to convert conversational context about a person's background into structured resume data.

Parse the provided context and extract information to populate the following resume sections:
- Personal Information (name, email, phone, address, LinkedIn, personal website)
- Work Experience (position, company, dates, responsibilities, achievements)
- Education (degree, institution, dates, GPA if mentioned)
- Skills (technical skills, soft skills, certifications, languages)
- Leadership Experience (leadership roles, organizations)
- Project Experience (personal or professional projects)
- Research Experience (research positions, publications)
- Summary/Objective (professional summary)
- Portfolio (websites, GitHub, portfolios)

Guidelines:
1. Generate unique IDs for each item using a format like "exp-1", "edu-1", "skill-1", etc.
2. Set "included" to true for all items by default
3. Use proper date formats (YYYY-MM-DD or MM/YYYY)
4. Categorize skills appropriately (skill, certification, language, etc.)
5. Create appropriate modules with proper ordering
6. If information is missing, use empty strings or empty arrays
7. Set spacing to 16 by default
8. Extract meaningful descriptions and achievements with quantifiable results when possible

For dates, if only years are mentioned, use "YYYY-01-01" format for start dates and "YYYY-12-31" for end dates.
For ongoing positions, use "Present" as the end date.`;

export async function POST(req: Request) {
  try {
    console.log("Process context API called");

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

    const { context } = await req.json();

    if (!context || typeof context !== "string") {
      console.error("Invalid context format:", context);
      return new Response(
        JSON.stringify({ error: "Context is required and must be a string" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Processing context of length:", context.length);

    const result = await generateObject({
      model: openai("gpt-4o-mini"),
      schema: ResumeDataSchema,
      prompt: `${CONTEXT_PROCESSING_PROMPT}

Context to process:
${context}

Convert this context into structured resume data following the exact schema requirements.`,
    });

    console.log("Context processed successfully");

    return new Response(JSON.stringify(result.object), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing context:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "Unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return new Response(
      JSON.stringify({
        error: "Failed to process context",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
