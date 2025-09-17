import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { pdfToText } from 'pdf-ts';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_SECRET_KEY,
});

const ResumeSchema = z.object({
  personalInfo: z
    .object({
      name: z.string().default(''),
      email: z.string().default(''),
      phone: z.string().default(''),
      address: z.string().default(''),
      linkedinUrl: z.string().default(''),
      personalSiteUrl: z.string().default(''),
    })
    .default({
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedinUrl: '',
      personalSiteUrl: '',
    }),
  experiences: z
    .array(
      z.object({
        id: z.string().default(''),
        position: z.string().default(''),
        company: z.string().default(''),
        department: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().default(''),
        endDate: z.string().default(''),
        description: z.string().default(''),
        included: z.boolean().default(true),
      }),
    )
    .default([]),
  education: z
    .array(
      z.object({
        id: z.string().default(''),
        degree: z.string().default(''),
        fieldOfStudy: z.string().default(''),
        institution: z.string().default(''),
        graduationDate: z.string().default(''),
        startDate: z.string().default(''),
        endDate: z.string().default(''),
        location: z.string().optional(),
        gpa: z.string().optional(),
        description: z.string().optional(),
        included: z.boolean().default(true),
      }),
    )
    .default([]),
  skills: z
    .array(
      z.object({
        id: z.string().default(''),
        name: z.string().default(''),
        category: z
          .enum(['skill', 'certification', 'other', 'language', 'interest', 'activity'])
          .default('skill'),
        included: z.boolean().default(true),
      }),
    )
    .default([]),
  leadershipExperiences: z
    .array(
      z.object({
        id: z.string().default(''),
        position: z.string().default(''),
        organization: z.string().default(''),
        department: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().default(''),
        endDate: z.string().default(''),
        description: z.string().default(''),
        included: z.boolean().default(true),
      }),
    )
    .default([]),
  projectExperiences: z
    .array(
      z.object({
        id: z.string().default(''),
        position: z.string().default(''),
        organization: z.string().default(''),
        department: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().default(''),
        endDate: z.string().default(''),
        description: z.string().default(''),
        included: z.boolean().default(true),
      }),
    )
    .default([]),
  researchExperiences: z
    .array(
      z.object({
        id: z.string().default(''),
        position: z.string().default(''),
        organization: z.string().default(''),
        department: z.string().optional(),
        location: z.string().optional(),
        startDate: z.string().default(''),
        endDate: z.string().default(''),
        description: z.string().default(''),
        included: z.boolean().default(true),
      }),
    )
    .default([]),
  summary: z
    .object({
      content: z.string().default(''),
      included: z.boolean().default(true),
    })
    .default({ content: '', included: true }),
  portfolio: z
    .array(
      z.object({
        id: z.string().default(''),
        name: z.string().default(''),
        url: z.string().default(''),
        qrCode: z.string().default(''),
        included: z.boolean().default(true),
      }),
    )
    .default([]),
  modules: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum([
          'summary',
          'experience',
          'leadership',
          'project',
          'research',
          'education',
          'skills',
          'portfolio',
        ]),
        title: z.string(),
        order: z.number().int(),
        enabled: z.boolean().default(true),
      }),
    )
    .default([]),
  spacing: z.number().default(25),
  styles: z
    .object({
      fitMode: z.enum(['compact', 'normal']).default('normal'),
      spacing: z
        .object({
          horizontal: z.number().default(30),
          vertical: z.number().default(30),
        })
        .optional(),
      fonts: z
        .object({
          headers: z.string().default(''),
          content: z.string().default(''),
        })
        .optional(),
    })
    .optional(),
});

function ensureIds<T extends { id?: string }>(items: T[], prefix: string): (T & { id: string })[] {
  return items.map((item, index) => ({
    ...item,
    id: item.id && item.id.length > 0 ? item.id : `${prefix}-${index + 1}`,
  })) as (T & { id: string })[];
}

const DEFAULT_MODULES = [
  { id: 'summary', type: 'summary', title: 'Summary', order: 1, enabled: true },
  {
    id: 'experience',
    type: 'experience',
    title: 'Professional Experience',
    order: 2,
    enabled: true,
  },
  { id: 'leadership', type: 'leadership', title: 'Leadership Experience', order: 3, enabled: true },
  { id: 'project', type: 'project', title: 'Project Experience', order: 4, enabled: true },
  { id: 'research', type: 'research', title: 'Research Experience', order: 5, enabled: true },
  { id: 'education', type: 'education', title: 'Education', order: 6, enabled: true },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills, Certifications & Others',
    order: 7,
    enabled: true,
  },
  { id: 'portfolio', type: 'portfolio', title: 'Portfolio', order: 8, enabled: true },
] as const;

const EMPTY_RESUME_DATA = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedinUrl: '',
    personalSiteUrl: '',
  },
  experiences: [],
  education: [],
  skills: [],
  leadershipExperiences: [],
  projectExperiences: [],
  researchExperiences: [],
  summary: { content: '', included: true },
  portfolio: [],
  modules: DEFAULT_MODULES,
  spacing: 25,
  styles: { fitMode: 'normal', spacing: { horizontal: 30, vertical: 30 } },
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file in form-data (key: file)' }, { status: 400 });
    }
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const pdfBuffer = Buffer.from(arrayBuffer);

    const text = await pdfToText(pdfBuffer);
    console.log('🚀 ~ POST ~ text:', text);

    // If no extractable text, return empty structure for frontend to handle
    if (!text || text.trim().length === 0) {
      return NextResponse.json({ resumeData: EMPTY_RESUME_DATA, meta: { reason: 'empty_pdf' } });
    }

    const systemPrompt = `You are a resume parser. Convert the provided raw resume text into a concise, structured JSON matching the schema. 
Return professional bullet points and fill in as many fields as possible. Generate stable unique ids for list items (prefixes: exp-, edu-, skill-, lead-, proj-, res-, port-). Use MM/YYYY or YYYY for dates. Use 'Present' for ongoing roles. Set included=true by default.`;

    let parsed: z.infer<typeof ResumeSchema> | null = null;
    try {
      const jsonInstruction = `Respond with ONLY valid minified JSON, no markdown, no backticks. Use this structure; when unsure, use empty strings or empty arrays. Do not omit keys.\n\n${JSON.stringify(
        EMPTY_RESUME_DATA,
      )}`;

      const { text: aiText } = await generateText({
        model: openai('o4-mini'),
        system: systemPrompt,
        prompt: `Resume text:\n\n${text}\n\n${jsonInstruction}`,
      });

      // Extract JSON even if wrapped in code fences
      const fenced = aiText.match(/```json\s*([\s\S]*?)```/i);
      let jsonStr = fenced ? fenced[1] : aiText;
      const firstBrace = jsonStr.indexOf('{');
      const lastBrace = jsonStr.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        jsonStr = jsonStr.slice(firstBrace, lastBrace + 1);
      }
      const raw = JSON.parse(jsonStr);
      parsed = ResumeSchema.parse(raw);
    } catch (err) {
      console.error('AI parsing failed, returning empty defaults.', err);
      return NextResponse.json({
        resumeData: EMPTY_RESUME_DATA,
        meta: { reason: 'ai_parse_failed' },
      });
    }

    const withIds = {
      ...parsed,
      experiences: ensureIds(parsed.experiences, 'exp'),
      education: ensureIds(parsed.education, 'edu'),
      skills: ensureIds(parsed.skills, 'skill'),
      leadershipExperiences: ensureIds(parsed.leadershipExperiences, 'lead'),
      projectExperiences: ensureIds(parsed.projectExperiences, 'proj'),
      researchExperiences: ensureIds(parsed.researchExperiences, 'res'),
      portfolio: ensureIds(parsed.portfolio, 'port'),
      modules: parsed.modules && parsed.modules.length > 0 ? parsed.modules : DEFAULT_MODULES,
      spacing: typeof parsed.spacing === 'number' ? parsed.spacing : 25,
      styles: parsed.styles ?? { fitMode: 'normal', spacing: { horizontal: 30, vertical: 30 } },
    };

    return NextResponse.json({ resumeData: withIds });
  } catch (error) {
    console.error('Error in resume upload:', error);
    return NextResponse.json({ error: 'Failed to process resume' }, { status: 500 });
  }
}
