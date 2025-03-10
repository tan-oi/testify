import {z} from "zod"

export const basicDetailsSchema = z.object({
    name: z.string().min(3),
    headerTitle: z
      .string()
      .min(5, {
        message: "we recommend having atleast 5 words as the title",
      })
      .max(50, {
        message:
          "To not overwhelm the user, we recommend not having a very long header",
      }),
    headerDescription: z
      .string()
      .min(5, {
        message: "we recommend having atleast 5 words in description",
      })
      .max(100, {
        message: "keep it short and classy",
      }),
    askConsent: z.boolean().default(true),
    allowVideo: z.boolean().default(false),
    allowStarRatings: z.boolean().default(true),
  });



  
 export const thankYouSchema = z.object({
    thankYouHeader: z
      .string()
      .min(5, {
        message: "Cmon, you gotta be a bit grateful",
      })
      .max(50, {
        message:
          "okay, that's enough, you don't have to put in the whole block of butter",
      }),
    thankYouMessage: z.string().min(5).max(50),
    allowShare: z.boolean().default(true),
  });


  export const fullSchema = z.object({
    name: z.string().min(1, "Space name is required"),
    headerTitle: z.string().min(1, "Header title is required"),
    headerDescription: z.string().min(1, "Header description is required"),
    askConsent: z.boolean().default(false),
    allowVideo: z.boolean().default(false),
    allowStarRatings: z.boolean().default(true),
    thankYouHeader: z.string().min(1, "Thank you header is required"),
    thankYouMessage: z.string().min(1, "Thank you message is required"),
    allowShare: z.boolean().default(false),
    textLength: z.number().int().positive("Text length must be positive"),
    videoLength: z.number().int().nullable(),
  });
  