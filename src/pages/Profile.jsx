import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { courses, user } from "../lib/data.js";
import { Mail, Calendar, Award, BookOpen, Clock, LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const overall = Math.round(courses.reduce((s, c) => s + c.progress, 0) / courses.length);

  return (
    <AppLayout>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 text-3xl font-bold text-white shadow-soft">
            {user.initials}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
              <Mail className="h-4 w-4" /> {user.email}
            </p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500 sm:ml-4">
              <Calendar className="h-4 w-4" /> Joined March 2025
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Courses", value: user.joinedCourses, icon: BookOpen },
          { label: "Lessons Completed", value: user.completedLessons, icon: Award },
          { label: "Hours Learned", value: user.hoursLearned, icon: Clock },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Overall progress</h2>
          <span className="text-sm font-medium text-brand-600">{overall}%</span>
        </div>
        <ProgressBar value={overall} className="mt-3 h-3" />

        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Course progress</h3>
          {courses.map((c) => (
            <div key={c.id}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium text-slate-700">{c.title}</span>
                <span className="text-slate-500">{c.progress}%</span>
              </div>
              <ProgressBar value={c.progress} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
