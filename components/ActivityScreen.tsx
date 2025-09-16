import React, { useMemo, useState } from 'react';
import { CATEGORY_DETAILS } from '../constants';
import { calculateGoalProgressForWeek, getWeekNumber } from '../utils';
import { Activity, CategoryType, Goal, User } from '../types';
import { CheckIcon, ChevronLeftIcon, PlusIcon, TrashIcon } from './Icons';

interface ActivityScreenProps {
  user: User;
  categoryType: CategoryType;
  goal: Goal;
  onUpdateUser: (user: User) => void;
  onBack: () => void;
}

export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  user,
  categoryType,
  goal,
  onUpdateUser,
  onBack,
}) => {
  const [activityName, setActivityName] = useState('');
  const [error, setError] = useState('');

  const category = user.categories[categoryType];
  const syncedGoal = useMemo(() => category.goals.find((item) => item.id === goal.id) ?? goal, [category.goals, goal.id, goal]);
  const currentWeek = getWeekNumber(user.startDate, user.totalWeeks);
  const weeks = useMemo(() => Array.from({ length: user.totalWeeks }, (_, index) => index), [user.totalWeeks]);

  if (!syncedGoal) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 p-10 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Målet kunde inte hittas. Det kan ha raderats. Gå tillbaka och välj ett annat mål.
          </p>
          <button
            onClick={onBack}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <ChevronLeftIcon className="w-4 h-4" /> Tillbaka
          </button>
        </div>
      </div>
    );
  }

  const handleAddActivity = (event: React.FormEvent) => {
    event.preventDefault();
    if (!activityName.trim()) {
      setError('Namnge aktiviteten, t.ex. "Tre gympass".');
      return;
    }

    const newActivity: Activity = {
      id: Date.now().toString(),
      name: activityName.trim(),
      completed: Array.from({ length: user.totalWeeks }, () => false),
    };

    const updatedGoals = category.goals.map((goalItem) =>
      goalItem.id === syncedGoal.id ? { ...goalItem, activities: [...goalItem.activities, newActivity] } : goalItem,
    );

    onUpdateUser({
      ...user,
      categories: {
        ...user.categories,
        [categoryType]: {
          ...category,
          goals: updatedGoals,
        },
      },
    });

    setActivityName('');
    setError('');
  };

  const updateActivity = (activityId: string, updater: (activity: Activity) => Activity) => {
    const updatedGoals = category.goals.map((goalItem) => {
      if (goalItem.id !== syncedGoal.id) {
        return goalItem;
      }
      return {
        ...goalItem,
        activities: goalItem.activities.map((activity) =>
          activity.id === activityId ? updater(activity) : activity,
        ),
      };
    });

    onUpdateUser({
      ...user,
      categories: {
        ...user.categories,
        [categoryType]: {
          ...category,
          goals: updatedGoals,
        },
      },
    });
  };

  const handleToggleWeek = (activityId: string, weekIndex: number) => {
    updateActivity(activityId, (activity) => {
      const completed = [...activity.completed];
      if (completed.length <= weekIndex) {
        const extension = Array.from({ length: weekIndex - completed.length + 1 }, () => false);
        completed.push(...extension);
      }
      completed[weekIndex] = !completed[weekIndex];
      return { ...activity, completed };
    });
  };

  const handleDeleteActivity = (activityId: string) => {
    if (!window.confirm('Vill du ta bort aktiviteten?')) {
      return;
    }

    const updatedGoals = category.goals.map((goalItem) => {
      if (goalItem.id !== syncedGoal.id) {
        return goalItem;
      }
      return {
        ...goalItem,
        activities: goalItem.activities.filter((activity) => activity.id !== activityId),
      };
    });

    onUpdateUser({
      ...user,
      categories: {
        ...user.categories,
        [categoryType]: {
          ...category,
          goals: updatedGoals,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 dark:border-slate-700 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
            >
              <ChevronLeftIcon className="w-4 h-4" /> Tillbaka
            </button>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{CATEGORY_DETAILS[categoryType].name}</p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{syncedGoal.name}</h1>
              <p className="text-xs text-slate-500">{syncedGoal.activities.length} aktiviteter · Vecka {currentWeek + 1}</p>
            </div>
          </div>
          <div className="text-sm text-slate-500">
            <p>{user.totalWeeks} veckor totalt</p>
          </div>
        </header>

        <form onSubmit={handleAddActivity} className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6 space-y-4">
          <div>
            <label htmlFor="activity-name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              Lägg till en aktivitet
            </label>
            <input
              id="activity-name"
              type="text"
              value={activityName}
              onChange={(event) => setActivityName(event.target.value)}
              placeholder="Ex. Ring pappa på torsdag"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-slate-500">Aktiviteter är konkreta handlingar du ska genomföra varje vecka.</p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="w-5 h-5" /> Lägg till aktivitet
          </button>
        </form>

        <section className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6 overflow-x-auto">
          {syncedGoal.activities.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-600 dark:text-slate-300">
              Du har inga aktiviteter ännu. Lägg till en ovan för att börja spåra.
            </div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-3 py-2">Aktivitet</th>
                  {weeks.map((week) => (
                    <th key={week} className={`px-3 py-2 text-center ${week === currentWeek ? 'text-blue-600' : ''}`}>
                      Vecka {week + 1}
                    </th>
                  ))}
                  <th className="px-3 py-2 text-center">Ta bort</th>
                </tr>
              </thead>
              <tbody>
                {syncedGoal.activities.map((activity) => (
                  <tr key={activity.id} className="border-t border-slate-200/70 dark:border-slate-800/70">
                    <td className="px-3 py-3 font-medium text-slate-800 dark:text-slate-100">{activity.name}</td>
                    {weeks.map((week) => (
                      <td key={week} className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleWeek(activity.id, week)}
                          className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border transition ${
                            activity.completed[week]
                              ? 'border-emerald-400 bg-emerald-100 text-emerald-700 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-200'
                              : 'border-slate-300 dark:border-slate-700 text-slate-400 hover:border-blue-400 hover:text-blue-500'
                          } ${week === currentWeek ? 'ring-2 ring-blue-200 dark:ring-blue-500/40' : ''}`}
                        >
                          {activity.completed[week] ? <CheckIcon className="w-4 h-4" /> : week + 1}
                        </button>
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="inline-flex items-center justify-center rounded-lg border border-slate-300/60 dark:border-slate-700 px-3 py-1 text-xs text-slate-500 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Veckoresultat</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {weeks.map((week) => {
              const progress = calculateGoalProgressForWeek(syncedGoal, week);
              return (
                <div
                  key={week}
                  className={`rounded-2xl border px-4 py-4 text-sm transition ${
                    week === currentWeek
                      ? 'border-blue-300/70 bg-blue-50/70 text-blue-700 dark:border-blue-600/60 dark:bg-blue-600/10 dark:text-blue-100'
                      : 'border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <p className="font-semibold">Vecka {week + 1}</p>
                  <p className="text-xs opacity-80">{progress === null ? 'Ingen data' : `${progress}% klart`}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
