import React from 'react';

type IconProps = {
  className?: string;
};

const withBaseClass = (className?: string) => `w-6 h-6 ${className ?? ''}`.trim();

export const FamilyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="7" cy="7" r="3" />
    <circle cx="17" cy="7" r="3" />
    <path d="M2 21v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
    <path d="M15 21v-2a4 4 0 0 1 4-4h1a2 2 0 0 1 2 2v4" />
  </svg>
);

export const HealthIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21s-6-4.35-9-8.25C-0.5 8.5 1 4 4.5 3.5c2.25-.32 3.79 1.43 4.5 2.74.71-1.31 2.25-3.06 4.5-2.74C18 4 19.5 8.5 15 12.75 12 16.65 12 21 12 21Z" />
  </svg>
);

export const CareerIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 11h18" />
  </svg>
);

export const DevelopmentIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5V5a1 1 0 0 1 1-1h9l6 6v9.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
    <path d="m14 4 6 6" />
    <path d="M9 13h6" />
    <path d="M9 17h4" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M8 4h8v5a4 4 0 0 1-4 4 4 4 0 0 1-4-4V4Z" />
    <path d="M4 6h2v2a4 4 0 0 1-4-4V4h4" />
    <path d="M20 6h-2v2a4 4 0 0 0 4-4V4h-4" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3 9.09 8.26 3 9.27l4.5 4.38L6.18 21 12 17.77 17.82 21l-1.32-7.35L21 9.27l-6.09-.99L12 3Z" />
  </svg>
);

export const StreakIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
  </svg>
);

export const GoalIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ReviewIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 5V5Z" />
    <path d="M8 9h8" />
    <path d="M8 13h4" />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17 21 12 16 7" />
    <path d="M21 12H9" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 13 4 4L19 7" />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={withBaseClass(className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1" />
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M9 12h6" />
    <path d="M9 16h4" />
  </svg>
);
