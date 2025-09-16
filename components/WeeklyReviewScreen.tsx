import React, { useEffect, useMemo, useState } from 'react';
import { CATEGORY_DETAILS } from '../constants';
import { calculateOverallWeeklyProgress, calculateWeeklyProgress, getIncompleteActivitiesForWeek, getWeekNumber } from '../utils';
import { CategoryType, User } from '../types';
import { CheckIcon, ChevronLeftIcon, ClipboardIcon } from './Icons';

interface WeeklyReviewScreenProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

export const WeeklyReviewScreen: React.FC<WeeklyReviewScreenProps> = ({ user, onUpdateUser, onBack }) => {
  const currentWeek = getWeekNumber(user.startDate, user.totalWeeks);
  const [selectedWeek, setSelectedWeek] = useState(() => currentWeek);
  const [wentWell, setWentWell] = useState('');
  const [couldBeImproved, setCouldBeImproved] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const overallProgress = calculateOverallWeeklyProgress(user, selectedWeek);
  const incompleteActivities = useMemo(
    () => getIncompleteActivitiesForWeek(user, selectedWeek),
    [user, selectedWeek],
  );

  useEffect(() => {
    const existingReview = user.weeklyReviews.find((review) => review.weekNumber === selectedWeek);
    setWentWell(existingReview?.wentWell ?? '');
    setCouldBeImproved(existingReview?.couldBeImproved ?? '');
  }, [selectedWeek, user.weeklyReviews]);

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedWentWell = wentWell.trim();
    const trimmedCouldBeImproved = couldBeImproved.trim();

    const filteredReviews = user.weeklyReviews.filter((review) => review.weekNumber !== selectedWeek);
    const updatedReviews = [
      ...filteredReviews,
      {
        weekNumber: selectedWeek,
        wentWell: trimmedWentWell,
        couldBeImproved: trimmedCouldBeImproved,
      },
    ];

    onUpdateUser({
      ...user,
      weeklyReviews: updatedReviews,
    });

    setStatusMessage('Veckoöversyn sparad!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 dark:border-slate-700 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
            >
              <ChevronLeftIcon className="w-4 h-4" /> Tillbaka
            </button>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Veckoöversyn</p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reflektera och planera</h1>
            </div>
          </div>
          <div className="rounded-2xl border border-blue-200/60 dark:border-blue-700/60 bg-blue-50/70 dark:bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-200 flex items-center gap-2">
            <ClipboardIcon className="w-5 h-5" /> Vecka {selectedWeek + 1} av {user.totalWeeks}
          </div>
        </header>

        <div className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6">
          <label htmlFor="week" className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Välj vecka att reflektera över
          </label>
          <select
            id="week"
            value={selectedWeek}
            onChange={(event) => setSelectedWeek(Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: user.totalWeeks }, (_, index) => (
              <option key={index} value={index}>
                Vecka {index + 1}
              </option>
            ))}
          </select>
        </div>

        <section className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
          <form onSubmit={handleSave} className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6 space-y-5">
            <div>
              <label htmlFor="went-well" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                Vad gick bra?
              </label>
              <textarea
                id="went-well"
                value={wentWell}
                onChange={(event) => setWentWell(event.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Fira dina segrar, stora som små."
              />
            </div>
            <div>
              <label htmlFor="could-be-improved" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                Vad kan förbättras?
              </label>
              <textarea
                id="could-be-improved"
                value={couldBeImproved}
                onChange={(event) => setCouldBeImproved(event.target.value)}
                rows={5}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Identifiera hinder och hur du tar dig förbi dem."
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <CheckIcon className="w-5 h-5" /> Spara reflektion
              </button>
              {statusMessage && <span className="text-sm text-emerald-600 dark:text-emerald-300">{statusMessage}</span>}
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Veckans läge</h2>
              <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
                {overallProgress === null ? 'Inga aktiviteter registrerade' : `${overallProgress}% avklarat`}
              </p>
              <div className="mt-3 h-2 rounded-full bg-slate-200/70 dark:bg-slate-800/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${overallProgress ?? 0}%` }}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6 space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Kategoriöversikt</h2>
              {(Object.keys(user.categories) as CategoryType[]).map((category) => {
                const details = CATEGORY_DETAILS[category];
                const progress = calculateWeeklyProgress(user, category, selectedWeek);
                return (
                  <div key={category} className="flex items-center justify-between rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/50 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <details.icon className={`w-5 h-5 ${details.textColor} ${details.darkTextColor}`} />
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{details.name}</p>
                        <p className="text-xs text-slate-500">{progress === null ? 'Inga aktiviteter' : `${progress}%`}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{progress ?? 0}%</span>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ej klara aktiviteter</h2>
              {incompleteActivities.length === 0 ? (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Allt är avklarat för denna vecka.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {incompleteActivities.map(({ activity, goalName }) => (
                    <li key={activity.id} className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-900/50 px-3 py-2">
                      <p className="font-semibold">{activity.name}</p>
                      <p className="text-xs text-slate-500">{goalName}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};
