import { Prompt } from '@modelcontextprotocol/sdk/types.js';

export const explainApodPrompt: Prompt = {
  name: 'explain-apod',
  description: 'Generate an educational explanation of an Astronomy Picture of the Day',
  arguments: [
    {
      name: 'date',
      description: 'Date of the APOD (YYYY-MM-DD format, optional - defaults to today)',
      required: false,
    },
    {
      name: 'audience',
      description: 'Target audience level: child, student, or expert',
      required: false,
    },
  ],
};

export async function getExplainApodPrompt(args: Record<string, unknown>): Promise<{
  description?: string;
  messages: Array<{ role: 'user' | 'assistant'; content: { type: 'text'; text: string } }>;
}> {
  const date = (args.date as string) || new Date().toISOString().split('T')[0];
  const audience = (args.audience as string) || 'student';
  
  const audienceContextMap = {
    child: 'Explain in simple terms suitable for a young child (ages 6-10)',
    student: 'Explain for a high school or college student learning astronomy',
    expert: 'Provide a detailed technical explanation for astronomy enthusiasts',
  };
  const audienceContext = audienceContextMap[audience as keyof typeof audienceContextMap] || audienceContextMap.student;

  return {
    description: `Educational explanation of APOD for ${date}`,
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `Please fetch the NASA Astronomy Picture of the Day for ${date} and provide an educational explanation. ${audienceContext}. Include:
1. What the image shows
2. Why it's scientifically interesting
3. Key astronomical concepts involved
4. Fun facts or additional context
5. How this relates to our understanding of the universe

Use the nasa_apod tool to get the image data first, then provide your explanation.`,
        },
      },
    ],
  };
}