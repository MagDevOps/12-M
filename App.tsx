import React, { useState, useCallback } from 'react';
import { User, CategoryType, Goal, Categories } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserLoginScreen } from './components/UserLoginScreen';
import { Dashboard } from './components/Dashboard';
import { GoalScreen } from './components/GoalScreen';
import { ActivityScreen } from './components/ActivityScreen';
import { WeeklyReviewScreen } from './components/WeeklyReviewScreen';
import { checkForNewAchievements, Achievement } from './achievements';

const createNewUser = (name: string, startDate: Date, totalWeeks: number): User => {
  const initialCategories: Categories = {
    [CategoryType.Family]: { goals: [] },
    [CategoryType.Health]: { goals: [] },
    [CategoryType.Career]: { goals: [] },
    [CategoryType.Development]: { goals: [] },
  };

  return {
    id: Date.now().toString(),
    name,
    startDate: startDate.toISOString(),
    totalWeeks,
    categories: initialCategories,
    weeklyReviews: [],
    achievements: [],
  };
};

function App() {
  const [users, setUsers] = useLocalStorage<User[]>('12m-users', []);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement[]>([]);

  const handleAddUser = useCallback((name: string, startDate: Date, totalWeeks: number) => {
    let newUser = createNewUser(name, startDate, totalWeeks);
    const result = checkForNewAchievements(newUser);
    newUser = result.updatedUser;
    if (result.newAchievements.length > 0) {
        setTimeout(() => setNewlyUnlocked(result.newAchievements), 500);
    }
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    setCurrentUser(newUser);
  }, [setUsers]);

  const handleSelectUser = useCallback((user: User) => {
    setCurrentUser(user);
  }, []);

  const handleDeleteUser = useCallback((userId: string) => {
    if (window.confirm("Är du säker på att du vill radera denna användare och all data?")) {
        setUsers(prevUsers => prevUsers.filter((user) => user.id !== userId));
        if (currentUser?.id === userId) {
            setCurrentUser(null);
            setSelectedCategory(null);
            setSelectedGoal(null);
        }
    }
  }, [currentUser, setUsers]);
  
  const handleUpdateUser = useCallback((updatedUser: User) => {
      const result = checkForNewAchievements(updatedUser);
      const userWithAchievements = result.updatedUser;
      if (result.newAchievements.length > 0) {
        setNewlyUnlocked(result.newAchievements);
      }

      setUsers(prevUsers => prevUsers.map(u => u.id === userWithAchievements.id ? userWithAchievements : u));
      setCurrentUser(userWithAchievements);

      if (selectedGoal) {
          const categoryGoals = userWithAchievements.categories[selectedCategory!].goals;
          const refreshedGoal = categoryGoals.find(g => g.id === selectedGoal.id);
          if (refreshedGoal) {
              setSelectedGoal(refreshedGoal);
          } else {
              setSelectedGoal(null);
          }
      }
  }, [selectedGoal, selectedCategory, setUsers]);

  const handleSelectActivity = useCallback((categoryType: CategoryType, goalId: string) => {
    setSelectedCategory(categoryType);

    if (!currentUser) {
      setSelectedGoal(null);
      return;
    }

    const goalForActivity = currentUser.categories[categoryType]?.goals.find(goalItem => goalItem.id === goalId) ?? null;
    setSelectedGoal(goalForActivity);
  }, [currentUser]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setSelectedCategory(null);
    setSelectedGoal(null);
    setIsReviewing(false);
  }, []);

  const handleBack = useCallback(() => {
    if (selectedGoal) {
      setSelectedGoal(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  }, [selectedGoal, selectedCategory]);

  if (!currentUser) {
    return (
      <UserLoginScreen
        users={users}
        onAddUser={handleAddUser}
        onSelectUser={handleSelectUser}
        onDeleteUser={handleDeleteUser}
      />
    );
  }

  if (isReviewing) {
    return (
      <WeeklyReviewScreen
        user={currentUser}
        onUpdateUser={handleUpdateUser}
        onBack={() => setIsReviewing(false)}
      />
    );
  }

  if (!selectedCategory) {
    return (
      <Dashboard 
        user={currentUser} 
        onSelectCategory={setSelectedCategory}
        onSelectActivity={handleSelectActivity}
        onLogout={handleLogout}
        onGoToReview={() => setIsReviewing(true)}
        newlyUnlocked={newlyUnlocked}
        onClearNewlyUnlocked={() => setNewlyUnlocked([])}
      />
    );
  }

  if (!selectedGoal) {
    return (
      <GoalScreen
        user={currentUser}
        categoryType={selectedCategory}
        onUpdateUser={handleUpdateUser}
        onSelectGoal={setSelectedGoal}
        onBack={handleBack}
      />
    );
  }

  return (
    <ActivityScreen
        user={currentUser}
        categoryType={selectedCategory}
        goal={selectedGoal}
        onUpdateUser={handleUpdateUser}
        onBack={handleBack}
    />
  );
}

export default App;
