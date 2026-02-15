import { siteConfig } from '@/config/site';
import type { Person, Organization, WebSite, BreadcrumbList, Service } from 'schema-dts';

type JsonLdProps = {
  schema: object;
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      key={`json-ld-${Math.random()}`}
    />
  );
}

export const organizationSchema: Organization = {
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/apple-touch-icon.png`,
  sameAs: [
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+509-33-37-7934',
    contactType: 'Customer Service',
    email: siteConfig.email,
  }
};

export const websiteSchema: WebSite = {
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string',
    },
};

export const personSchema: Person = {
    '@type': 'Person',
    name: siteConfig.author,
    url: siteConfig.url,
    sameAs: [
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
    ],
    jobTitle: 'Freelance Web & AI Developer',
    worksFor: {
        '@type': 'Organization',
        name: siteConfig.name,
    },
     email: siteConfig.email,
    telephone: '+509-33-37-7934',
    address: {
        '@type': 'PostalAddress',
        addressCountry: 'HT',
        addressLocality: 'Haiti'
    }
};

export function generateBreadcrumbs(items: { name: string; item: string }[]): BreadcrumbList {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.item,
        })),
    };
}

export type { Service };
