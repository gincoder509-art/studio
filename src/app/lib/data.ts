import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
};

const getProjectImage = (id: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === id);
    return placeholder || { imageUrl: 'https://placehold.co/600x400', imageHint: 'placeholder' };
}

export const projects: Project[] = [
  {
    id: 'restaurant',
    title: 'Restaurant Showcase',
    description: 'A modern and elegant website for a gourmet restaurant, featuring menus, reservations, and a gallery.',
    imageUrl: getProjectImage('restaurant').imageUrl,
    imageHint: getProjectImage('restaurant').imageHint,
    link: 'https://gincoder509-art.github.io/restaurant-vitrine/',
  },
  {
    id: 'boutique',
    title: 'Boutique Vitrine',
    description: 'A chic online storefront for a fashion boutique, highlighting the latest collections and brand story.',
    imageUrl: getProjectImage('boutique').imageUrl,
    imageHint: getProjectImage('boutique').imageHint,
    link: 'https://gincoder509-art.github.io/boutique-vitrine/',
  },
  {
    id: 'barber',
    title: 'Barber Shop',
    description: 'A stylish and user-friendly website for a modern barbershop, with service lists and appointment booking.',
    imageUrl: getProjectImage('barber').imageUrl,
    imageHint: getProjectImage('barber').imageHint,
    link: 'https://gincoder509-art.github.io/barber-vitrine/',
  },
  {
    id: 'clinique',
    title: 'Dental Clinic',
    description: 'A professional and trustworthy website for a dental clinic, providing information on services and staff.',
    imageUrl: getProjectImage('clinique').imageUrl,
    imageHint: getProjectImage('clinique').imageHint,
    link: 'https://gincoder509-art.github.io/clinique-vitrine/',
  },
  {
    id: 'ecole',
    title: 'Driving School',
    description: 'An informative site for a driving school, detailing courses, pricing, and registration information.',
    imageUrl: getProjectImage('ecole').imageUrl,
    imageHint: getProjectImage('ecole').imageHint,
    link: 'https://gincoder509-art.github.io/ecole-vitrine/',
  },
  {
    id: 'formation',
    title: 'Online Training',
    description: 'A platform for online courses, offering a seamless learning experience for students.',
    imageUrl: getProjectImage('formation').imageUrl,
    imageHint: getProjectImage('formation').imageHint,
    link: 'https://gincoder509-art.github.io/formation-vitrine/',
  },
  {
    id: 'eglise',
    title: 'Church Community',
    description: 'A welcoming website for a church, sharing event schedules, sermons, and community news.',
    imageUrl: getProjectImage('eglise').imageUrl,
    imageHint: getProjectImage('eglise').imageHint,
    link: 'https://gincoder509-art.github.io/eglise-vitrine/',
  },
  {
    id: 'onglerie',
    title: 'Nail Salon',
    description: 'An elegant website for a nail salon, showcasing services, a portfolio of nail art, and booking options.',
    imageUrl: getProjectImage('onglerie').imageUrl,
    imageHint: getProjectImage('onglerie').imageHint,
    link: 'https://gincoder509-art.github.io/onglerie-vitrine/',
  },
  {
    id: 'particulier',
    title: 'Personal Portfolio',
    description: 'A clean and personal portfolio website to showcase individual skills and projects effectively.',
    imageUrl: getProjectImage('particulier').imageUrl,
    imageHint: getProjectImage('particulier').imageHint,
    link: 'https://gincoder509-art.github.io/particulier-vitrine/',
  },
];
