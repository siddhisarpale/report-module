"use client";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    title: "", 
    slug: "", 
    description: "" 
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/admin/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("Report created successfully!");
      setForm({ title: '', slug: '', description: '' }); // Clear form
    } else {
      const data = await res.json();
      setMessage(`Failed: ${data.error?.message || "Unknown error"}`);
    }

}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <h1>Add New Report(Admin)</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        /><br/>
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          required
        /><br/>
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button className="cursor-pointer pl-1.5" type="submit">Add Report</button>
      </form>

    </div>
  );
}
