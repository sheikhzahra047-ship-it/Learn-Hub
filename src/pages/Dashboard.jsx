import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { courses, user } from "../lib/data.js";
import { BookOpen, Clock, Trophy, ArrowRight, PlayCircle } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { label: "Enrolled Courses", value: user.joinedCourses, icon: BookOpen },
    { label: "Lessons Completed", value: user.completedLessons, icon: Trophy },
    { label: "Hours Learned", value: user.hoursLearned, icon: Clock },
  ];

  return (
    <AppLayout>
      <section className="rounded-2xl bg-gradient-to-r from-brand-500 to-cyan-500 p-6 sm:p-8 text-white shadow-soft">
        <p className="text-sm opacity-80">Welcome back,</p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold">{user.name} 👋</h1>
        <p className="mt-2 max-w-xl text-sm sm:text-base text-white/90">
          Ready to keep learning? You're making great progress this week.
        </p>
      </section>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
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

      <div className="mt-8 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Continue learning</h2>
          <p className="text-sm text-slate-500">Pick up where you left off.</p>
        </div>
        <Link to="/courses" className="text-sm font-medium text-brand-600 hover:underline inline-flex items-center gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <article
            key={course.id}
            className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-soft transition hover:shadow-card hover:-translate-y-0.5"
          >
            <div className={`relative h-36 bg-gradient-to-br ${course.thumbnail}`}>
              <div className="absolute inset-0 grid place-items-center text-white/90">
                <PlayCircle className="h-10 w-10" />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-white/20 backdrop-blur px-2.5 py-1 text-xs font-medium text-white">
                {course.category}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-slate-800">{course.title}</h3>
              <p className="mt-1 text-sm text-slate-500 line-clamp-2">{course.description}</p>

              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium text-slate-700">{course.progress}%</span>
                </div>
                <ProgressBar value={course.progress} />
              </div>

              <Link
                to={`/courses/${course.id}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
              >
                Continue
              </Link>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
