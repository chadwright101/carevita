import { z } from "zod";

export const homeAboutSchema = z.object({
  content: z.string().min(1),
  image1: z.string().min(1),
  image2: z.string().min(1),
});

export const homeContactSchema = z.object({
  general: z.string().email(),
  accounts: z.string().email(),
});

export const homeServicesSchema = z
  .array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1).max(500),
      image: z.string().min(1),
    }),
  )
  .min(3)
  .max(5);
