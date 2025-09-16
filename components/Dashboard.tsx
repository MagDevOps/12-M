import React, { useEffect, useMemo } from 'react';
import { Achievement } from '../achievements';
import { CATEGORY_DETAILS } from '../constants';
import { motivationalQuotes } from '../quotes';
import { ActivityInfo, calculateOverallWeeklyProgress, calculateWeeklyProgress, getIncompleteActivitiesForWeek, getWeekNumber } from '../utils';
import { CategoryType, User } from '../types';
import { ACHIEVEMENT_DETAILS } from '../achievements';
import {
  CalendarIcon,
  ClipboardIcon,
  LogoutIcon,
  PlusIcon,
  TargetIcon,
  TrophyIcon,
  CheckIcon,
} from './Icons';

interface DashboardProps {
  user: User;
  onSelectCategory: (category: CategoryType) => void;
  onSelectActivity: (category: CategoryType, goalId: string) => void;
  onLogout: () => void;
  onGoToReview: () => void;
  newlyUnlocked: Achievement[];
  onClearNewlyUnlocked: () => void;
}

const getQuoteForWeek = (week: number) => motivationalQuotes[week % motivationalQuotes.length];

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onSelectCategory,
  onSelectActivity,
  onLogout,
  onGoToReview,
  newlyUnlocked,
  onClearNewlyUnlocked,
}) => {
  const currentWeek = getWeekNumber(user.startDate, user.totalWeeks);
  const overallProgress = calculateOverallWeeklyProgress(user, currentWeek);

  const incompleteActivities = useMemo(() => {
    if (overallProgress === null) {
      return [] as ActivityInfo[];
    }
    return getIncompleteActivitiesForWeek(user, currentWeek);
  }, [user, currentWeek, overallProgress]);

  const unlockedAchievements = useMemo(
    () => user.achievements.map((id) => ACHIEVEMENT_DETAILS[id]).filter(Boolean),
    [user.achievements],
  );

  useEffect(() => {
    if (newlyUnlocked.length === 0) {
      return;
    }
    const timeout = window.setTimeout(() => onClearNewlyUnlocked(), 5000);
    return () => window.clearTimeout(timeout);
  }, [newlyUnlocked, onClearNewlyUnlocked]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-10 space-y-10">
        <header className="flex flex-col gap-4 rounded-3xl bg-white/80 dark:bg-slate-950/70 backdrop-blur border border-white/40 dark:border-slate-800 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-500">Välkommen tillbaka</p>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{user.name}</h1>
            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" /> Vecka {currentWeek + 1} av {user.totalWeeks}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onGoToReview}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ClipboardIcon className="w-5 h-5" /> Veckoöversyn
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300/60 dark:border-slate-700 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <LogoutIcon className="w-5 h-5" /> Logga ut
            </button>
          </div>
        </header>

        {newlyUnlocked.length > 0 && (
          <div className="animate-fadeIn rounded-3xl border border-amber-200 bg-amber-50/90 dark:border-amber-500/60 dark:bg-amber-500/10 p-6 text-amber-800 dark:text-amber-200 shadow">
            <div className="flex items-center gap-3 mb-3">
              <TrophyIcon className="w-7 h-7" />
              <div>
                <h2 className="text-lg font-semibold">Nya utmärkelser låsta!</h2>
                <p className="text-sm text-amber-700/80 dark:text-amber-200/80">
                  Fira dina framsteg – fortsätt i samma takt.
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-3">
              {newlyUnlocked.map((achievement) => (
                <li key={achievement.id} className="flex items-center gap-2 rounded-2xl bg-white/70 dark:bg-slate-900/60 px-4 py-2 text-sm">
                  <achievement.icon className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">{achievement.name}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-200/80">{achievement.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <section className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Totalt veckoupplägg</p>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {overallProgress === null ? 'Inga aktiviteter än' : `${overallProgress}% avklarat denna vecka`}
                  </h2>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>Startade {new Date(user.startDate).toLocaleDateString()}</p>
                  <p className="italic">“{getQuoteForWeek(currentWeek)}”</p>
                </div>
              </div>
              <div className="mt-4 h-3 rounded-full bg-slate-200/60 dark:bg-slate-800/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all"
                  style={{ width: `${overallProgress ?? 0}%` }}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(user.categories) as CategoryType[]).map((category) => {
                const details = CATEGORY_DETAILS[category];
                const progress = calculateWeeklyProgress(user, category, currentWeek);
                const goalsCount = user.categories[category].goals.length;
                return (
                  <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`group relative overflow-hidden rounded-3xl border px-5 py-6 text-left shadow-sm transition ${details.color} ${details.darkColor} ${details.borderColor} ${details.darkBorderColor} hover:shadow-lg ${details.hoverColor} ${details.darkHoverColor}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className={`text-xs uppercase tracking-wide ${details.textColor} ${details.darkTextColor}`}>
                          {details.name}
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{progress ?? 0}%</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                          {goalsCount} mål
                        </p>
                      </div>
                      <div className="rounded-full bg-white/70 dark:bg-slate-900/70 p-3 shadow-inner">
                        <details.icon className={`w-6 h-6 ${details.textColor} ${details.darkTextColor}`} />
                      </div>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/40 dark:bg-slate-900/50 overflow-hidden">
                      <div
                        className={`h-full ${details.progressBg} ${details.darkProgressBg}`}
                        style={{ width: `${progress ?? 0}%` }}
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <TargetIcon className="w-4 h-4" /> Se mål
                      </span>
                      <span className="opacity-0 transition group-hover:opacity-100 flex items-center gap-1">
                        <PlusIcon className="w-4 h-4" /> Lägg till mål
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Veckans fokus</h3>
              {incompleteActivities.length === 0 ? (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                  Alla aktiviteter är avklarade för denna vecka. Grymt jobbat!
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {incompleteActivities.slice(0, 6).map(({ activity, goalName, goalId, categoryType }) => (
                    <li key={activity.id} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 px-4 py-3 text-sm">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{activity.name}</p>
                      <p className="text-xs text-slate-500">{goalName}</p>
                      <button
                        onClick={() => onSelectActivity(categoryType, goalId)}
                        className="mt-2 inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <CheckIcon className="w-4 h-4" /> Markera klar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Utmärkelser</h3>
              <ul className="space-y-3">
                {Object.values(ACHIEVEMENT_DETAILS).map((achievement) => {
                  const unlocked = unlockedAchievements.some((item) => item.id === achievement.id);
                  return (
                    <li
                      key={achievement.id}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                        unlocked
                          ? 'border-emerald-300/70 bg-emerald-50/70 text-emerald-700 dark:border-emerald-600/50 dark:bg-emerald-600/10 dark:text-emerald-200'
                          : 'border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/50 text-slate-500'
                      }`}
                    >
                      <achievement.icon className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">{achievement.name}</p>
                        <p className="text-xs opacity-80">{achievement.description}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};
