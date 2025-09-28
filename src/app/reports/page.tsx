'use client'
import Link from "next/link";
import { useEffect, useState } from "react"

export default function ReportsPage() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch("/api/reports")
        .then((res) => res.json())
        .then((data) => setReports(data));
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <h1>All Reports</h1>
            <ul>
                {reports.map((r:any) => (
                    <li className="text-xl" key={r._id}>
                        <Link href={`/report/${r.slug}`}>
                            {r.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}