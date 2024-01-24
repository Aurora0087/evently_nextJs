import * as z from "zod"

export const formSchema = z.object({
    title: z.string().min(3, 'Title must be at last 3 charecters long'),
    description: z.string().min(5,'Description must be at last 5 charecters long').max(2000,"Description must be under 2000 charecters long"),
    location: z.string().max(200, 'Location must be under 200 charecters long'),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    categoryId: z.string(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),
})