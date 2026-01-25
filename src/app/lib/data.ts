import { PlaceHolderImages } from "@/lib/placeholder-images";

export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  link: string;
};

export const getProjectImage = (id: string) => {
    const placeholder = PlaceHolderImages.find(p => p.id === id);
    return placeholder || { imageUrl: 'https://placehold.co/600x400', imageHint: 'placeholder' };
}

export const projectIds = [
  'restaurant',
  'boutique',
  'barber',
  'clinique',
  'ecole',
  'formation',
  'eglise',
  'onglerie',
  'particulier',
];

export const projectLinks: Record<string, string> = {
  restaurant: 'https://gincoder509-art.github.io/restaurant-vitrine/',
  boutique: 'https://gincoder509-art.github.io/boutique-vitrine/',
  barber: 'https://gincoder509-art.github.io/barber-vitrine/',
  clinique: 'https://gincoder509-art.github.io/clinique-vitrine/',
  ecole: 'https://gincoder509-art.github.io/ecole-vitrine/',
  formation: 'https://gincoder509-art.github.io/formation-vitrine/',
  eglise: 'https://gincoder509-art.github.io/eglise-vitrine/',
  onglerie: 'https://gincoder509-art.github.io/onglerie-vitrine/',
  particulier: 'https://gincoder509-art.github.io/particulier-vitrine/',
};
