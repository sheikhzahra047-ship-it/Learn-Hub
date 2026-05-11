import { Link } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../components/AppLayout.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { courses } from "../lib/data.js";
import { Search, PlayCircle } from "lucide-react";

export default function Courses() {
  const [query, setQuery] = useState("");
  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800">All Courses</h1>
          <p className="mt-1 text-sm text-slate-500">Browse and continue your enrolled courses.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => (
          <article
            key={course.id}
            className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-soft transition hover:shadow-card hover:-translate-y-0.5"
          >
            <div className={`relative h-40 bg-gradient-to-br ${course.thumbnail}`}>
              <div className="absolute inset-0 grid place-items-center text-white/90">
                <PlayCircle className="h-12 w-12" />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-xs font-medium text-white">
                {course.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-800">{course.title}</h3>
              <p className="mt-1 text-sm text-slate-500 line-clamp-2">{course.description}</p>
              <p className="mt-3 text-xs text-slate-500">
                By <span className="font-medium text-slate-700">{course.instructor}</span> ·{" "}
                {course.lessons.length} lessons
              </p>
              <div className="mt-4">
                <ProgressBar value={course.progress} />
              </div>
              <Link
                to={`/courses/${course.id}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
              >
                {course.progress > 0 ? "Continue" : "Start course"}
              </Link>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-slate-500 py-12">
            No courses match your search.
          </p>
        )}
      </div>
    </AppLayout>
  );
}
