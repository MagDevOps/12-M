import React, { useMemo, useState } from 'react';
import { CATEGORY_DETAILS } from '../constants';
import { calculateGoalProgressForWeek, getWeekNumber } from '../utils';
import { CategoryType, Goal, User } from '../types';
import { ChevronLeftIcon, PlusIcon, TrashIcon } from './Icons';

interface GoalScreenProps {
  user: User;
  categoryType: CategoryType;
  onUpdateUser: (user: User) => void;
  onSelectGoal: (goal: Goal) => void;
  onBack: () => void;
}

export const GoalScreen: React.FC<GoalScreenProps> = ({
  user,
  categoryType,
  onUpdateUser,
  onSelectGoal,
  onBack,
}) => {
  const [goalName, setGoalName] = useState('');
  const [error, setError] = useState('');

  const categoryDetails = CATEGORY_DETAILS[categoryType];
  const goals = user.categories[categoryType].goals;
  const currentWeek = getWeekNumber(user.startDate, user.totalWeeks);

  const sortedGoals = useMemo(() => {
    return [...goals].sort((a, b) => a.name.localeCompare(b.name, 'sv'));
  }, [goals]);

  const handleAddGoal = (event: React.FormEvent) => {
    event.preventDefault();
    if (!goalName.trim()) {
      setError('Sätt ett tydligt namn på målet.');
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      name: goalName.trim(),
      activities: [],
    };

    const updatedUser: User = {
      ...user,
      categories: {
        ...user.categories,
        [categoryType]: {
          ...user.categories[categoryType],
          goals: [...goals, newGoal],
        },
      },
    };

    onUpdateUser(updatedUser);
    setGoalName('');
    setError('');
  };

  const handleDeleteGoal = (goalId: string) => {
    if (!window.confirm('Är du säker på att du vill radera målet och dess aktiviteter?')) {
      return;
    }

    const updatedGoals = goals.filter((goal) => goal.id !== goalId);
    const updatedUser: User = {
      ...user,
      categories: {
        ...user.categories,
        [categoryType]: {
          ...user.categories[categoryType],
          goals: updatedGoals,
        },
      },
    };

    onUpdateUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <header className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300/70 dark:border-slate-700 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60"
          >
            <ChevronLeftIcon className="w-4 h-4" /> Tillbaka
          </button>
          <div>
            <p className={`text-xs uppercase tracking-wide ${categoryDetails.textColor} ${categoryDetails.darkTextColor}`}>
              {categoryDetails.name}
            </p>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mål</h1>
          </div>
        </header>

        <form onSubmit={handleAddGoal} className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6 space-y-4">
          <div>
            <label htmlFor="goal-name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              Skapa ett nytt mål
            </label>
            <input
              id="goal-name"
              type="text"
              value={goalName}
              onChange={(event) => setGoalName(event.target.value)}
              placeholder="Ex. Ha familjemiddag varje söndag"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-slate-500">Var konkret och mätbar.</p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="w-5 h-5" /> Lägg till mål
          </button>
        </form>

        <section className="space-y-4">
          {sortedGoals.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/40 dark:bg-slate-950/40 p-10 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Du har inga mål ännu. Skapa ditt första för att börja planera dina aktiviteter.
              </p>
            </div>
          ) : (
            sortedGoals.map((goal) => {
              const weeklyProgress = calculateGoalProgressForWeek(goal, currentWeek);
              return (
                <article
                  key={goal.id}
                  className="rounded-3xl border border-white/40 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur p-6 flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{goal.name}</h2>
                      <p className="text-xs text-slate-500">{goal.activities.length} aktiviteter kopplade</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectGoal(goal)}
                        className="rounded-xl bg-blue-600/90 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        Hantera aktiviteter
                      </button>
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        className="rounded-xl border border-slate-300/60 dark:border-slate-700 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/50"
                        type="button"
                        title="Radera mål"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Veckans progression</p>
                    <div className="mt-2 h-2 rounded-full bg-slate-200/70 dark:bg-slate-800/80 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${weeklyProgress ?? 0}%` }}
                      />
                    </div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      {weeklyProgress === null
                        ? 'Inga aktiviteter registrerade ännu.'
                        : `${weeklyProgress}% av veckans aktiviteter klara.`}
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
};
