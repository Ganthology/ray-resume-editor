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

// Function to generate resume builder system prompt with current date
const getResumeBuilderPrompt = () => {
  const now = new Date();
  return `You are a professional resume builder assistant. Your goal is to help users create comprehensive, well-structured resumes by gathering information about their professional experience, education, skills, and achievements.

**CURRENT DATE: ${now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })} (${now.toISOString().split("T")[0]})**

Use this current date as reference when discussing dates, timelines, and career progression. Do not question dates that are current or recent unless they seem genuinely incorrect.

**GUARDRAILS - STRICTLY ENFORCE:**
You MUST ONLY respond to questions and conversations related to:
- Resume building and career document creation
- Professional experience, work history, job responsibilities
- Educational background and academic achievements
- Skills (technical, soft, professional)
- Career goals, objectives, and professional development
- Projects (professional, academic, personal relevant to career)
- Certifications, awards, and professional achievements
- Interview preparation related to resume content
- Professional networking and career advice
- Resume formatting, structure, and best practices

You MUST NOT respond to:
- General knowledge questions unrelated to career/resume
- Personal advice not related to professional development
- Technical help with software/coding (unless it's for listing skills on resume)
- Entertainment, jokes, casual conversation
- Political, controversial, or sensitive topics
- Academic help with homework/assignments (unless relevant to resume building)
- Health, legal, financial advice
- Any topic not directly related to resume building and career development

**MANDATORY RESPONSE PROTOCOL:**
If a user asks something outside your scope, you MUST:
1. Politely decline to answer the off-topic question
2. Redirect them back to resume building
3. Use this exact template: "I'm specifically designed to help you build your resume and advance your career. I can't assist with [brief mention of their request]. Let's focus on gathering information about your professional background, skills, and experience. What would you like to add to your resume today?"
4. Do NOT attempt to answer any part of the off-topic question
5. Do NOT use tools for off-topic content

**EXAMPLES OF APPROPRIATE REDIRECTS:**
- User asks about weather → "I'm specifically designed to help you build your resume and advance your career. I can't assist with weather information. Let's focus on gathering information about your professional background, skills, and experience. What would you like to add to your resume today?"
- User asks for jokes → "I'm specifically designed to help you build your resume and advance your career. I can't provide entertainment content. Let's focus on gathering information about your professional background, skills, and experience. What would you like to add to your resume today?"
- User asks technical programming help → "I'm specifically designed to help you build your resume and advance your career. For specific technical help, I'd recommend consulting documentation or technical forums. However, I can help you describe your programming skills and experience on your resume. What programming languages and technologies have you worked with?"

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
1. FIRST: Check if user input is resume/career related. If not, redirect using the mandatory protocol above.
2. ALWAYS use the generateContext tool whenever new information is provided by the user - even for small updates or clarifications
3. The generateContext tool should be used continuously throughout the conversation to keep context current and comprehensive
4. When you have sufficient information from the context to populate resume sections, use the updateResume tool to convert the context into structured resume data
5. Never let information accumulate without updating the context - update it immediately after each meaningful exchange
6. NEVER use tools for off-topic content - only use tools for resume-related information

The workflow should be: validate input → gather info → IMMEDIATELY generateContext → continue gathering → updateContext again → eventually updateResume when ready.

CRITICAL: 
- Use generateContext tool after EVERY user response that contains ANY new RESUME-RELATED information, no matter how small
- NEVER use tools for off-topic requests
- Always redirect off-topic questions before using any tools`;
};

// Context generation tool
const generateContextTool = tool({
  description:
    "CONTINUOUSLY collect and update comprehensive information about the user for resume building. Use this tool IMMEDIATELY after ANY new information is provided by the user, no matter how small. This tool should be used constantly throughout the conversation to keep context current. Focus on capturing ALL details, context, and nuances - do NOT be concise here. This is for comprehensive information collection and updating, not resume formatting. Always include ALL previously gathered information PLUS the new information in each update.",
  parameters: z.object({
    conversationSummary: z
      .string()
      .describe(
        "A CONTINUOUSLY UPDATED, DETAILED and COMPREHENSIVE collection of ALL information gathered about the person throughout the entire conversation. This should be CUMULATIVE - include ALL previously gathered information PLUS any new information from the latest exchange. Include every detail, context, story, achievement, responsibility, skill, and piece of background information mentioned at any point in the conversation. Organize by sections but DO NOT summarize or condense - capture the full details including: \n\n- Personal Information: Full contact details, location, personal background, family info, interests\n- Work Experience: Detailed descriptions of each role, specific responsibilities, achievements with context, challenges overcome, technologies used, team sizes, project details, metrics and results, work environment, company culture, career progression\n- Education: Complete educational background, courses, projects, GPA, extracurricular activities, relevant coursework details, academic achievements, thesis work\n- Skills: All technical and soft skills mentioned, proficiency levels, context of use, years of experience, learning sources, certifications\n- Projects: Detailed project descriptions, technologies used, your role, outcomes, challenges, learnings, team collaboration, timelines\n- Leadership Experience: Full details of leadership roles, team sizes, initiatives led, outcomes achieved, management style, challenges faced\n- Research Experience: Research topics, methodologies, publications, conferences, findings, collaborations, funding\n- Volunteer Experience: Organizations, roles, time commitment, impact made, skills developed, community involvement\n- Awards and Achievements: Full context of awards, competition details, recognition received, selection criteria, impact\n- Certifications: Complete certification details, dates, issuing organizations, renewal requirements, practical applications\n- Languages: Proficiency levels, context of use, certifications, cultural experience, business vs conversational use\n- Career Goals: Aspirations, target roles, industry interests, timeline, motivations, career change reasons\n- Additional Context: Any other relevant personal or professional information, hobbies, travel, life experiences that add depth\n\nEach update should build upon the previous context, creating a comprehensive and ever-growing picture of the person. Never lose previously gathered information - always include everything in each update."
      ),
  }),
  execute: async ({ conversationSummary }) => {
    console.log(
      "generateContextTool called with comprehensive conversationSummary:",
      conversationSummary.substring(0, 200) + "..." // Log first 200 chars to avoid flooding console
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
    'Convert the comprehensive conversation context into CONCISE, STRUCTURED resume data. This is where you condense and refine the detailed information into professional resume format. Use this tool when you have sufficient information from the context to populate resume sections. Guidelines: Generate unique IDs (format: "exp-1", "edu-1", "skill-1", etc.), set included to true by default, use proper date formats (YYYY-MM-DD or MM/YYYY), for ongoing positions use "Present" as end date, categorize skills appropriately, create appropriate modules with proper ordering, set spacing to 16 by default. BE CONCISE AND PROFESSIONAL HERE - this is the final resume output.',
  parameters: z.object({
    resumeData: ResumeDataSchema.describe(
      "Complete structured resume data extracted and REFINED from the comprehensive conversation context. Convert the detailed information into concise, professional resume format. Focus on impact, achievements with quantifiable results, and relevant skills. Keep descriptions concise but impactful. Fill in all available information from the conversation, leaving empty strings for missing information."
    ),
  }),
  execute: async ({ resumeData }) => {
    console.log(
      "updateResumeTool called - converting to structured resume format"
    );
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
      content: getResumeBuilderPrompt(),
    };

    console.log("System message added, attempting to call OpenAI...");

    try {
      const result = streamText({
        model: openai("gpt-4.1-mini"),
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
