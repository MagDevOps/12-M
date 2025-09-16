export interface Activity {
  id: string;
  name: string;
  completed: boolean[];
}

export interface Goal {
  id: string;
  name: string;
  activities: Activity[];
}

export enum CategoryType {
  Family = 'family',
  Health = 'health',
  Career = 'career',
  Development = 'development',
}

export type Categories = {
  [key in CategoryType]: {
    goals: Goal[];
  }
};

export interface WeeklyReview {
  weekNumber: number;
  wentWell: string;
  couldBeImproved: string;
}

export enum AchievementId {
  PLAN_CREATED = 'PLAN_CREATED',
  TEN_GOALS = 'TEN_GOALS',
  PERFECT_WEEK = 'PERFECT_WEEK',
  STREAK_4_WEEKS = 'STREAK_4_WEEKS',
  FIRST_REVIEW = 'FIRST_REVIEW',
}

export interface User {
  id: string;
  name: string;
  startDate: string; // ISO string for the start of the period
  totalWeeks: number; // User-defined total weeks for the plan
  categories: Categories;
  weeklyReviews: WeeklyReview[];
  achievements: AchievementId[];
}