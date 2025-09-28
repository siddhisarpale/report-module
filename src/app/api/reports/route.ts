import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { Report } from "@/models/Report";
import { ReportSchema } from "@/types/report";

export async function GET() {
    try{
        await connectDB();

        const reports = await Report.find().sort({ createdAt : -1});
        return NextResponse.json(reports);
    } catch (err) {
        return NextResponse.json(
            {error: "Failed to fetch reports"},
            { status: 500}
        );
    }
}

// POST a new report
export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const parsed = ReportSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error },
                { status: 400 }
            );
        }

        const report = await Report.create(parsed.data);
        return NextResponse.json(
            { message: "Report created successfully!", report}, 
            { status: 201 }
        );
    } catch (err) {
        console.error("Failed to create report: ", err);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}