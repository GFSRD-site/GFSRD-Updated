import { joinUsOptions } from "@/components/JoinUsSection";

export interface AcademyArticleData {
  id: string;
  title: string;
  shortTitle: string;
  content: string;
  mission?: string;
  vision?: string;
  plan?: string;
  objectives?: string;
  conclusion?: string;
  logo: string;
  head?: {
    name?: string;
    role?: string;
    image?: string;
    bio?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
  };
  team?: Array<{
    name: string;
    role: string;
    country?: string;
    bio?: string;
    image?: string;
    linkedin?: string;
  }>;
}

// Map of each academy ID to its tailored AI-generated academic banner image
export const ACADEMY_BANNER_MAP: Record<string, string> = {
  "sustainable-agriculture": "/academy-banners/sustainable-agriculture.jpg",
  "bamboo-ntfp": "/academy-banners/bamboo-ntfp.jpg",
  "education-skills": "/academy-banners/education-skills.jpg",
  "environment-climate": "/academy-banners/environment-climate.jpg",
  "gender-equality": "/academy-banners/gender-equality.jpg",
  "ict-infrastructure": "/academy-banners/ict-infrastructure.jpg",
  "inclusive-development": "/academy-banners/inclusive-development.jpg",
  "indigenous-people": "/academy-banners/indigenous-people.jpg",
  "local-government": "/academy-banners/local-government.jpg",
  "public-health": "/academy-banners/public-health.jpg",
  "rural-entrepreneurship": "/academy-banners/rural-entrepreneurship.jpg",
  "rural-urban-linkages": "/academy-banners/rural-urban-linkages.jpg",
  "science-technology": "/academy-banners/science-technology.jpg",
  "social-enterprises": "/academy-banners/social-enterprises.jpg",
  "youth-development": "/academy-banners/youth-development.jpg",
};

// Fallback banner
export const DEFAULT_ACADEMY_BANNER = "/academy-banners/sustainable-agriculture.jpg";

export function getAcademyBanner(academyId: string): string {
  return ACADEMY_BANNER_MAP[academyId] || DEFAULT_ACADEMY_BANNER;
}

export { joinUsOptions };


