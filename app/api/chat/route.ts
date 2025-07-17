import { streamText, tool } from "ai";

import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: "strict", // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_SECRET_KEY,
});

// Define the schema for ResumeData
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
- Help users think about their experiences in terms of impact and results

IMPORTANT: 
1. After gathering meaningful information about the user's background, use the generateContext tool to create a structured summary
2. When you have sufficient information from the context to populate resume sections, use the updateResume tool to convert the context into structured resume data
3. Use these tools periodically throughout the conversation as new information is gathered, especially after collecting details about major resume sections

The workflow should be: gather info → generateContext → updateResume when sufficient data is available.`;

// Context generation tool
const generateContextTool = tool({
  description:
    "Generate a comprehensive context summary of the conversation for resume building. Use this tool after gathering meaningful information about the user's background, especially after collecting details about major resume sections like work experience, education, skills, etc.",
  parameters: z.object({
    conversationSummary: z
      .string()
      .describe(
        "A comprehensive summary of all information gathered about the person for their resume, formatted clearly with sections and bullet points. Include: Personal Information, Work Experience, Education, Skills, Projects, Leadership Experience, Research Experience, Volunteer Experience, Awards, and Professional Summary/Objective points. Only include sections that have been mentioned in the conversation."
      ),
  }),
  execute: async ({ conversationSummary }) => {
    console.log(
      "generateContextTool called with conversationSummary:",
      conversationSummary
    );
    return {
      contextSummary: conversationSummary,
      timestamp: new Date().toISOString(),
    };
  },
});

// Update resume tool
const updateResumeTool = tool({
  description:
    'Convert conversation context into structured resume data. Use this tool when you have sufficient information from the context to populate resume sections with meaningful data. Guidelines: Generate unique IDs (format: "exp-1", "edu-1", "skill-1", etc.), set included to true by default, use proper date formats (YYYY-MM-DD or MM/YYYY), for ongoing positions use "Present" as end date, categorize skills appropriately, create appropriate modules with proper ordering, set spacing to 16 by default.',
  parameters: z.object({
    resumeData: ResumeDataSchema.describe(
      "Complete structured resume data extracted from the conversation context. Fill in all available information from the conversation, leaving empty strings for missing information. Extract meaningful descriptions and achievements with quantifiable results when possible."
    ),
  }),
  execute: async ({ resumeData }) => {
    console.log("updateResumeTool called with resumeData:", resumeData);
    return {
      resumeData,
      timestamp: new Date().toISOString(),
      success: true,
    };
  },
});

export async function POST(req: Request) {
  try {
    console.log("Chat API called");

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
        model: openai("gpt-4o-mini"),
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        maxTokens: 1500,
        tools: {
          generateContext: generateContextTool,
          updateResume: updateResumeTool,
        },
        toolChoice: "auto",
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
