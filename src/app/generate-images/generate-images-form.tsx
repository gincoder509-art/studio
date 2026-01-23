'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleImageGeneration, type State } from '@/app/lib/actions';
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Loader2, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  projectDescription: z.string().min(10, 'Description must be at least 10 characters.'),
  projectLogo: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Logo image is required.')
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, 'Max file size is 5MB.')
    .refine(
      (files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      'Only .jpg, .png, and .webp formats are supported.'
    ),
});

type FormValues = z.infer<typeof FormSchema>;

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Generate Images
    </Button>
  );
}

export function GenerateImagesForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(handleImageGeneration, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectDescription: '',
      projectLogo: undefined,
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const onSubmit = async (data: FormValues) => {
    const logoFile = data.projectLogo[0];
    const logoDataUri = await fileToDataUri(logoFile);

    const formData = new FormData();
    formData.append('projectDescription', data.projectDescription);
    formData.append('projectLogoDataUri', logoDataUri);

    dispatch(formData);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
    form.register('projectLogo').onChange(event);
  };

  useEffect(() => {
    if (state.errors?._form) {
      toast({
        variant: 'destructive',
        title: 'Error Generating Images',
        description: state.errors._form.join(', '),
      });
    } else if (state.message && state.generatedImageDataUris) {
        toast({
            title: 'Success!',
            description: state.message,
        });
        form.reset();
        formRef.current?.reset();
        setLogoPreview(null);
    }
  }, [state, toast, form]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI Image Generator</CardTitle>
            <CardDescription>Describe your project and upload a logo to generate relevant images.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea
                id="projectDescription"
                placeholder="e.g., A modern website for a gourmet restaurant..."
                {...form.register('projectDescription')}
                className={form.formState.errors.projectDescription ? 'border-destructive' : ''}
                rows={4}
              />
              {form.formState.errors.projectDescription && (
                <p className="text-sm text-destructive">{form.formState.errors.projectDescription.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectLogo">Project Logo</Label>
              <Input
                id="projectLogo"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleLogoChange}
                className={form.formState.errors.projectLogo ? 'border-destructive' : ''}
              />
               {logoPreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Logo Preview:</p>
                  <Image src={logoPreview} alt="Logo preview" width={100} height={100} className="rounded-md border object-contain bg-muted p-2"/>
                </div>
               )}
              {form.formState.errors.projectLogo && (
                <p className="text-sm text-destructive">{form.formState.errors.projectLogo.message as string}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>
      
      {state.generatedImageDataUris && state.generatedImageDataUris.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <PartyPopper className="text-primary h-6 w-6"/>
              Generated Images
            </CardTitle>
            <CardDescription>Here are the images generated by the AI based on your input.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {state.generatedImageDataUris.map((uri, index) => (
                <div key={index} className="aspect-video relative overflow-hidden rounded-lg border">
                  <Image src={uri} alt={`Generated image ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
