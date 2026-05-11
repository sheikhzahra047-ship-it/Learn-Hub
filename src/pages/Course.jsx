import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import { courses } from "../lib/data.js";
import { Play, CheckCircle2, Circle, ChevronLeft, ChevronRight, Clock } from "lucide-react";

export default function Course() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = useMemo(() => courses.find((c) => c.id === courseId), [courseId]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [completed, setCompleted] = useState({});

  if (!course) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h1 className="text-xl font-semibold text-slate-800">Course not found</h1>
          <Link to="/courses" className="mt-4 inline-block text-brand-600 hover:underline">
            Back to courses
          </Link>
        </div>
      </AppLayout>
    );
  }

  const lesson = course.lessons[activeIdx];
  const isLessonComplete = !!completed[lesson.id];
  const completedCount = course.lessons.filter((l) => completed[l.id]).length;
  const localProgress = Math.round((completedCount / course.lessons.length) * 100);

  const goPrev = () => setActiveIdx((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIdx((i) => Math.min(course.lessons.length - 1, i + 1));

  return (
    <AppLayout>
      <nav className="text-sm text-slate-500 mb-4">
        <Link to="/courses" className="hover:text-slate-800">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-800">{course.title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${course.thumbnail} shadow-soft`}>
            <div className="absolute inset-0 grid place-items-center">
              <button className="grid h-20 w-20 place-items-center rounded-full bg-white/20 backdrop-blur transition hover:bg-white/30">
                <Play className="h-8 w-8 fill-white text-white ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/50 to-transparent text-white">
              <p className="text-xs opacity-80">Lesson {activeIdx + 1} of {course.lessons.length}</p>
              <h3 className="mt-1 text-lg font-semibold">{lesson.title}</h3>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{course.title}</h1>
                <p className="mt-1 text-sm text-slate-500">
                  By <span className="font-medium text-slate-700">{course.instructor}</span> · {course.category}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-700 px-3 py-1 text-xs font-medium">
                <Clock className="h-3.5 w-3.5" /> {lesson.duration}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600">{course.description}</p>

            <div className="mt-6">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-slate-500">Your progress</span>
                <span className="font-medium text-slate-700">{localProgress}%</span>
              </div>
              <ProgressBar value={localProgress} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={goPrev}
                disabled={activeIdx === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                onClick={() => setCompleted((p) => ({ ...p, [lesson.id]: !p[lesson.id] }))}
                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isLessonComplete
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isLessonComplete ? "Completed" : "Mark complete"}
              </button>
              {activeIdx === course.lessons.length - 1 ? (
                <button
                  onClick={() => navigate("/courses")}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Finish <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={goNext}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft h-fit">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Course content</h2>
          <ul className="mt-4 space-y-1">
            {course.lessons.map((l, idx) => {
              const done = !!completed[l.id];
              const active = idx === activeIdx;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                      active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                    <span className="flex-1 line-clamp-1">{l.title}</span>
                    <span className="text-xs text-slate-500">{l.duration}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </AppLayout>
  );
}
