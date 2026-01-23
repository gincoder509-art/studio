import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/app/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
      <div className="aspect-video relative">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          data-ai-hint={project.imageHint}
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow" />
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={project.link} target="_blank" rel="noopener noreferrer">
            View Site <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
