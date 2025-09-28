import mongoose, { Document, Schema, Model } from "mongoose";

export interface ReportDocument extends Document {
    title: string;
    description: string;
    slug: string; //URL-friendly version of the title
    createdAt: Date;
    updatedAt: Date;
}

const ReportSchema = new Schema<ReportDocument>(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        slug: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true, // auto adds createdAt and updatedAt
    }
);

export const Report: Model<ReportDocument> = mongoose.models.Report || mongoose.model<ReportDocument>('Report', ReportSchema);