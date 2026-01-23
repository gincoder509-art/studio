'use server';

import { generateProjectImages } from '@/ai/flows/generate-project-images';
import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

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
  const t = await getTranslations('GenerateImagesPage');

  const ActionSchema = z.object({
    projectDescription: z.string().min(10, {
      message: t('validation.descriptionMin'),
    }),
    projectLogoDataUri: z.string().startsWith('data:image', {
      message: t('validation.invalidUri'),
    }),
  });

  const validatedFields = ActionSchema.safeParse({
    projectDescription: formData.get('projectDescription'),
    projectLogoDataUri: formData.get('projectLogoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: t('toasts.errorForm'),
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
            message: t('toasts.successMessage'),
            generatedImageDataUris: result.generatedImageDataUris,
        };
    } else {
        return {
            errors: { _form: [t('toasts.errorApiFail')] },
            message: t('toasts.errorApiFail'),
        };
    }
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : t('toasts.errorUnexpected');
    return {
      errors: { _form: [errorMessage] },
      message: t('toasts.errorApiGeneral'),
    };
  }
}
