import { Activity, CategoryType, User, Goal } from './types';

export const getWeekNumber = (startDateString: string, totalWeeks: number): number => {
  const startDate = new Date(startDateString);
  const today = new Date();

  // Set time to midnight to compare dates only
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (today < startDate) {
    return 0;
  }

  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7);

  return Math.min(weekNumber, totalWeeks - 1); // 0-indexed week
};

export const calculateWeeklyProgress = (user: User, categoryType: CategoryType, week: number): number | null => {
  const category = user.categories[categoryType];
  const allActivities = category.goals.flatMap(goal => goal.activities);
  if (allActivities.length === 0) return null;

  const totalActivities = allActivities.length;
  const completedActivities = allActivities.filter(activity => activity.completed[week]).length;
  
  return Math.round((completedActivities / totalActivities) * 100);
};

export const calculateGoalProgressForWeek = (goal: Goal, week: number): number | null => {
    if (goal.activities.length === 0) return null;

    const completedActivities = goal.activities.filter(activity => activity.completed[week]).length;
    return Math.round((completedActivities / goal.activities.length) * 100);
};


export const calculateOverallWeeklyProgress = (user: User, week: number): number | null => {
  const allActivities = (Object.values(user.categories)).flatMap(cat => cat.goals.flatMap(goal => goal.activities));
  if (allActivities.length === 0) return null;

  const completedActivities = allActivities.filter(activity => activity.completed[week]).length;
  return Math.round((completedActivities / allActivities.length) * 100);
};

export interface ActivityInfo {
    activity: Activity;
    goalName: string;
    goalId: string;
    categoryType: CategoryType;
}

export const getIncompleteActivitiesForWeek = (user: User, week: number): ActivityInfo[] => {
    const incomplete: ActivityInfo[] = [];

    (Object.keys(user.categories) as CategoryType[]).forEach(categoryType => {
        const category = user.categories[categoryType];
        category.goals.forEach(goal => {
            goal.activities.forEach(activity => {
                if (!activity.completed[week]) {
                    incomplete.push({
                        activity,
                        goalName: goal.name,
                        goalId: goal.id,
                        categoryType,
                    });
                }
            });
        });
    });

    return incomplete;
};

export const getAllActivitiesForWeek = (user: User, week: number): ActivityInfo[] => {
    const allActivities: ActivityInfo[] = [];

    (Object.keys(user.categories) as CategoryType[]).forEach(categoryType => {
        const category = user.categories[categoryType];
        category.goals.forEach(goal => {
            goal.activities.forEach(activity => {
                allActivities.push({
                    activity,
                    goalName: goal.name,
                    goalId: goal.id,
                    categoryType,
                });
            });
        });
    });

    return allActivities;
};