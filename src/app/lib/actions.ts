'use server';

import { generateProjectImages } from '@/ai/flows/generate-project-images';
import { z } from 'zod';

const ActionSchema = z.object({
  projectDescription: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  projectLogoDataUri: z.string().startsWith('data:image', {
    message: 'Invalid image data URI.',
  }),
});

export type State = {
  errors?: {
    projectDescription?: string[];
    projectLogoDataUri?: string[];
    _form?: string[];
  };
  message?: string | null;
  generatedImageDataUris?: string[];
};

export async function handleImageGeneration(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = ActionSchema.safeParse({
    projectDescription: formData.get('projectDescription'),
    projectLogoDataUri: formData.get('projectLogoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid form data. Please correct the errors and try again.',
    };
  }

  const { projectDescription, projectLogoDataUri } = validatedFields.data;

  try {
    const result = await generateProjectImages({
      projectDescription,
      projectLogoDataUri,
    });
    
    if (result.generatedImageDataUris && result.generatedImageDataUris.length > 0) {
        return {
            message: 'Images generated successfully!',
            generatedImageDataUris: result.generatedImageDataUris,
        };
    } else {
        return {
            errors: { _form: ['AI failed to generate images. Please try again.'] },
            message: 'AI failed to generate images. Please try again.',
        };
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      errors: { _form: [errorMessage] },
      message: 'Image generation failed. Please try again later.',
    };
  }
}
