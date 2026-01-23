'use server';

/**
 * @fileOverview A flow to generate relevant images for portfolio projects based on their descriptions and logos.
 *
 * - generateProjectImages - A function that generates images for a given project description.
 * - GenerateProjectImagesInput - The input type for the generateProjectImages function.
 * - GenerateProjectImagesOutput - The return type for the generateProjectImages function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectImagesInputSchema = z.object({
  projectDescription: z.string().describe('The description of the project.'),
  projectLogoDataUri: z
    .string()
    .describe(
      "A data URI containing the project's logo image, that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type GenerateProjectImagesInput = z.infer<typeof GenerateProjectImagesInputSchema>;

const GenerateProjectImagesOutputSchema = z.object({
  generatedImageDataUris: z
    .array(z.string())
    .describe('An array of data URIs containing the generated images.'),
});

export type GenerateProjectImagesOutput = z.infer<typeof GenerateProjectImagesOutputSchema>;

export async function generateProjectImages(
  input: GenerateProjectImagesInput
): Promise<GenerateProjectImagesOutput> {
  return generateProjectImagesFlow(input);
}

const generateProjectImagesPrompt = ai.definePrompt({
  name: 'generateProjectImagesPrompt',
  input: {schema: GenerateProjectImagesInputSchema},
  output: {schema: GenerateProjectImagesOutputSchema},
  prompt: `You are an expert in generating images for portfolio projects.

  Based on the project description and logo, generate 3 relevant images to showcase the project.
  Return the images as data URIs in the output field generatedImageDataUris.

  Project Description: {{{projectDescription}}}
  Project Logo: {{media url=projectLogoDataUri}}

  Ensure that the images are visually appealing and accurately represent the project.`,
});

const generateProjectImagesFlow = ai.defineFlow(
  {
    name: 'generateProjectImagesFlow',
    inputSchema: GenerateProjectImagesInputSchema,
    outputSchema: GenerateProjectImagesOutputSchema,
  },
  async input => {
    const numberOfImagesToGenerate = 3;
    const generatedImageDataUris: string[] = [];

    for (let i = 0; i < numberOfImagesToGenerate; i++) {
      const {media} = await ai.generate({
        prompt: [
          {text: `Generate an image that represents: ${input.projectDescription}`},
          {media: {url: input.projectLogoDataUri}},
        ],
        model: 'googleai/gemini-2.5-flash-image-preview',
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      if (media?.url) {
        generatedImageDataUris.push(media.url);
      }
    }

    return {generatedImageDataUris};
  }
);
