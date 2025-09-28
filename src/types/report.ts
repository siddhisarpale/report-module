import zod from 'zod';

export const ReportSchema = zod.object({
    title: zod.string().min(3),
    description: zod.string().min(10),
    slug: zod.string().min(3).regex(/^[a-z0-9-]+$/, {
        message: 'Slug must be lowercase, alphanumeric, and use dashes'
    }),
});

export type ReportInput = zod.infer<typeof ReportSchema>