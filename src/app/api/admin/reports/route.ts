import { connectDB } from "@/lib/db";
import { Report } from "@/models/Report";
import { ReportSchema } from "@/types/report";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        await connectDB();

        const body = await req.json();
        const parsed = ReportSchema.safeParse(body);

        if(!parsed.success){
            return NextResponse.json(
                { error: parsed.error },
                { status: 400 }
            );
        }

        const report = await Report.create(parsed.data);
        return NextResponse.json(report, {status: 201});
    } catch(err) {
        console.error("Failed to create report: ",err);
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}


