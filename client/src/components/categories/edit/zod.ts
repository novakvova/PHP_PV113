import { z } from "zod";
import {ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE} from "../../../constants";

export type EditCategorySchemaType = z.infer<typeof EditCategorySchema>;

export const EditCategorySchema = z.object({
    name: z.string().trim().min(3).max(20),
    // description: z.string().trim().min(3).max(50),
    image: z
        .any()
        .refine((files) => files.length === 0 || files[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => files.length === 0 || ACCEPTED_IMAGE_MIME_TYPES.includes(files[0].type),
            "Only .jpg, .jpeg, .png and .webp files are accepted.",
        ),
});