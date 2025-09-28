import { connectDB } from "@/lib/db";
import { Report } from "@/models/Report";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export default async function ReportPage( {params}: Props) {
    await connectDB();
    
    const { slug } = await params;
    const report = await Report.findOne({slug});

    if(!report) {
        notFound();
    }

    return (
        <div>
            <h1>{report.title}</h1>
            <p>{report.description}</p>
        </div>
    );
}