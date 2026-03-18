import { z } from "zod";

export const facilityGeneralSchema = z.object({
  facilityName: z.string().min(1),
  facilityExtendedName: z.string().optional(),
  cityTown: z.string().min(1),
  extendedLocation: z.string().min(1),
  province: z.enum(["WC", "GP", "EC", "KZN", "LP", "MP", "NW", "FS", "NC"]),
  facilityEmail: z.string().email(),
  facilityPhone: z.string().min(1),
  slug: z.string().min(1),
});

export const facilityLocationSchema = z.object({
  description: z.string().min(1),
  locationImage: z.string().min(1),
  map: z.object({
    lat: z.number(),
    lng: z.number(),
    zoom: z.number(),
  }),
});

export const facilityMetaSchema = z.object({
  keywords: z.string(),
  images: z.array(z.string()),
});

export const facilityOurHomesPageSchema = z.object({
  description: z.string(),
});

export const whatWeOfferSchema = z.object({
  offerings: z.string(),
  image: z.string().min(1),
  pampering: z.array(z.string()).optional(),
  weeklyActivities: z.array(z.string()).optional(),
});

export const aboutSchema = z.object({
  content: z.string(),
  image: z.string().min(1),
});

export const teamMemberSchema = z.object({
  position: z.string().min(1),
  url: z.string().min(1),
  teamMember: z.string().min(1),
});

export const facilityMediaSchema = z.object({
  heroSlider: z.array(z.string()),
  gallerySlider: z.array(z.string()),
  heroDisplayMode: z.enum(["slider", "video"]).optional(),
  video: z
    .object({
      desktopMp4: z.string(),
      mobileMp4: z.string(),
      desktopWebm: z.string(),
      mobileWebm: z.string(),
      poster: z.string(),
    })
    .optional(),
});

export const facilitySchema = z.object({
  general: facilityGeneralSchema,
  location: facilityLocationSchema,
  meta: facilityMetaSchema,
  ourHomesPage: facilityOurHomesPageSchema,
  whatWeOffer: whatWeOfferSchema,
  about: aboutSchema,
  meetTheTeam: z.array(teamMemberSchema).optional(),
  media: facilityMediaSchema,
  order: z.number(),
  isActive: z.boolean(),
  timestamp: z.number(),
});
