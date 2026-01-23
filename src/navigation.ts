import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'fr', 'ht'] as const;

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same path, use
  // the star `*` to catch all of them.
  '/': '/',
  '/generate-images': '/generate-images'
};

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, pathnames});