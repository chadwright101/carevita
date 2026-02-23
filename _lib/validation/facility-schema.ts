import { z } from "zod";

export const facilityGeneralSchema = z.object({
  shortTitle: z.string().min(1),
  title: z.string().min(1),
  extendedTitle: z.string().min(1),
  location: z.string().min(1),
  extendedLocation: z.string().min(1),
  region: z.enum(["WC", "GP", "EC"]),
  email: z.string().email(),
  phone: z.string().min(1),
  homeUrl: z.string().url(),
  slug: z.string().min(1),
  description: z.string().min(1),
  contactImage: z.string().min(1),
  map: z.object({
    lat: z.number(),
    lng: z.number(),
    zoom: z.number(),
  }),
  meta: z.object({
    keywords: z.string(),
    images: z.array(z.string()),
  }),
});

export const whatWeOfferSchema = z.object({
  list: z.array(z.string()),
  image: z.string().min(1),
  pampering: z.array(z.string()).optional(),
  weeklyActivities: z.array(z.string()).optional(),
});

export const aboutSchema = z.object({
  paragraphs: z.array(z.string()),
  image: z.string().min(1),
});

export const teamMemberSchema = z.object({
  position: z.string().min(1),
  url: z.string().min(1),
  teamMember: z.string().min(1),
});

export const facilityImagesSchema = z.object({
  heroSlider: z.array(z.string()),
  gallerySlider: z.array(z.string()),
});

export const facilityVideoSchema = z.object({
  desktopMp4: z.string(),
  mobileMp4: z.string(),
  desktopWebm: z.string(),
  mobileWebm: z.string(),
  poster: z.string(),
});

export const facilitySchema = z.object({
  general: facilityGeneralSchema,
  whatWeOffer: whatWeOfferSchema,
  about: aboutSchema,
  meetTheTeam: z.array(teamMemberSchema).optional(),
  images: facilityImagesSchema,
  video: facilityVideoSchema.optional(),
  order: z.number(),
  isActive: z.boolean(),
  timestamp: z.number(),
});
