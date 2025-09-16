import React, { useMemo, useState } from 'react';
import { User } from '../types';
import { motivationalQuotes } from '../quotes';
import { CalendarIcon, PlusIcon, TrashIcon } from './Icons';

interface UserLoginScreenProps {
  users: User[];
  onAddUser: (name: string, startDate: Date, totalWeeks: number) => void;
  onSelectUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

export const UserLoginScreen: React.FC<UserLoginScreenProps> = ({
  users,
  onAddUser,
  onSelectUser,
  onDeleteUser,
}) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [totalWeeks, setTotalWeeks] = useState(12);
  const [error, setError] = useState('');

  const inspirationalQuote = useMemo(() => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  }, []);

  const resetForm = () => {
    setName('');
    setStartDate(new Date().toISOString().split('T')[0]);
    setTotalWeeks(12);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('Ange ett namn för att skapa en plan.');
      return;
    }

    if (!startDate) {
      setError('Välj ett startdatum.');
      return;
    }

    if (!Number.isFinite(totalWeeks) || totalWeeks < 4 || totalWeeks > 52) {
      setError('Antalet veckor bör vara mellan 4 och 52.');
      return;
    }

    onAddUser(name.trim(), new Date(startDate), totalWeeks);
    setError('');
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="bg-white/80 dark:bg-slate-950/70 backdrop-blur rounded-3xl shadow-xl border border-white/40 dark:border-slate-800 p-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">12+M</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Bygg en 12-veckorsplan, håll koll på dina aktiviteter och följ upp varje vecka.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2" htmlFor="name">
                Ditt namn
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex. Alex"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2" htmlFor="start-date">
                  Startdatum
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 pl-10 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2" htmlFor="total-weeks">
                  Antal veckor
                </label>
                <input
                  id="total-weeks"
                  type="number"
                  min={4}
                  max={52}
                  value={totalWeeks}
                  onChange={(event) => setTotalWeeks(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-slate-500">Standard är 12 veckor, men du kan justera efter din plan.</p>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon className="w-5 h-5" />
              Skapa plan
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="h-full bg-white/80 dark:bg-slate-950/70 backdrop-blur rounded-3xl shadow-xl border border-white/40 dark:border-slate-800 p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Välj tidigare plan</h2>
            {users.length === 0 ? (
              <p className="text-sm text-slate-500">
                När du skapar en plan visas den här. Du kan skapa flera och växla mellan dem.
              </p>
            ) : (
              <ul className="space-y-4">
                {users.map((user) => (
                  <li key={user.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
                      <p className="text-xs text-slate-500">
                        Start: {new Date(user.startDate).toLocaleDateString()} · {user.totalWeeks} veckor
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectUser(user)}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        Öppna
                      </button>
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        className="rounded-lg p-2 text-slate-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
                        title="Radera användare"
                        type="button"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white/70 dark:bg-slate-950/60 backdrop-blur rounded-3xl shadow border border-white/30 dark:border-slate-800 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Dagens inspiration</h2>
            <p className="mt-3 text-base text-slate-700 dark:text-slate-200 leading-relaxed">“{inspirationalQuote}”</p>
          </div>
        </div>
      </div>
    </div>
  );
};
