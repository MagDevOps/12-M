import React from 'react';
import { User, AchievementId } from './types';
import { calculateOverallWeeklyProgress } from './utils';
import { TrophyIcon, StarIcon, StreakIcon, GoalIcon, ReviewIcon } from './components/Icons';

export interface Achievement {
    id: AchievementId;
    name: string;
    description: string;
    icon: React.FC<{ className?: string }>;
}

export const ACHIEVEMENT_DETAILS: { [key in AchievementId]: Achievement } = {
    [AchievementId.PLAN_CREATED]: {
        id: AchievementId.PLAN_CREATED,
        name: "Planerare",
        description: "Du har skapat din första 12-veckorsplan!",
        icon: StarIcon,
    },
    [AchievementId.TEN_GOALS]: {
        id: AchievementId.TEN_GOALS,
        name: "Ambitiös",
        description: "Du har skapat 10 mål.",
        icon: GoalIcon,
    },
    [AchievementId.PERFECT_WEEK]: {
        id: AchievementId.PERFECT_WEEK,
        name: "Perfektionist",
        description: "Du uppnådde 100% en vecka.",
        icon: TrophyIcon,
    },
    [AchievementId.STREAK_4_WEEKS]: {
        id: AchievementId.STREAK_4_WEEKS,
        name: "Momentum",
        description: "Du har klarat över 80% i fyra veckor i rad.",
        icon: StreakIcon,
    },
    [AchievementId.FIRST_REVIEW]: {
        id: AchievementId.FIRST_REVIEW,
        name: "Reflekterande",
        description: "Du har slutfört din första veckoöversyn.",
        icon: ReviewIcon,
    }
};

export const checkForNewAchievements = (user: User): { updatedUser: User, newAchievements: Achievement[] } => {
    const newAchievements: Achievement[] = [];
    const unlocked = new Set(user.achievements);

    // 1. Plan Created
    if (!unlocked.has(AchievementId.PLAN_CREATED)) {
        unlocked.add(AchievementId.PLAN_CREATED);
        newAchievements.push(ACHIEVEMENT_DETAILS[AchievementId.PLAN_CREATED]);
    }

    // 2. Ten Goals Created
    const totalGoals = Object.values(user.categories).reduce((sum, cat) => sum + cat.goals.length, 0);
    if (totalGoals >= 10 && !unlocked.has(AchievementId.TEN_GOALS)) {
        unlocked.add(AchievementId.TEN_GOALS);
        newAchievements.push(ACHIEVEMENT_DETAILS[AchievementId.TEN_GOALS]);
    }

    // 3. Perfect Week
    const hasPerfectWeek = Array.from({ length: user.totalWeeks }).some((_, weekIndex) => calculateOverallWeeklyProgress(user, weekIndex) === 100);
    if (hasPerfectWeek && !unlocked.has(AchievementId.PERFECT_WEEK)) {
        unlocked.add(AchievementId.PERFECT_WEEK);
        newAchievements.push(ACHIEVEMENT_DETAILS[AchievementId.PERFECT_WEEK]);
    }

    // 4. Four Week Streak
    if (!unlocked.has(AchievementId.STREAK_4_WEEKS)) {
        let consecutiveWeeks = 0;
        for (let i = 0; i < user.totalWeeks; i++) {
            const progress = calculateOverallWeeklyProgress(user, i);
            if (progress !== null && progress >= 80) {
                consecutiveWeeks++;
                if (consecutiveWeeks >= 4) {
                    unlocked.add(AchievementId.STREAK_4_WEEKS);
                    newAchievements.push(ACHIEVEMENT_DETAILS[AchievementId.STREAK_4_WEEKS]);
                    break;
                }
            } else {
                consecutiveWeeks = 0;
            }
        }
    }
    
    // 5. First Review
    if (user.weeklyReviews && user.weeklyReviews.length > 0 && !unlocked.has(AchievementId.FIRST_REVIEW)) {
        const hasContent = user.weeklyReviews.some(r => r.wentWell.trim() || r.couldBeImproved.trim());
        if(hasContent) {
            unlocked.add(AchievementId.FIRST_REVIEW);
            newAchievements.push(ACHIEVEMENT_DETAILS[AchievementId.FIRST_REVIEW]);
        }
    }

    const updatedUser = { ...user, achievements: Array.from(unlocked) };
    return { updatedUser, newAchievements };
};