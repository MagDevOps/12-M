import React from 'react';
import { CategoryType } from './types';
import { FamilyIcon, HealthIcon, CareerIcon, DevelopmentIcon } from './components/Icons';

interface CategoryDetails {
  name: string;
  color: string;
  darkColor: string;
  hoverColor: string;
  darkHoverColor: string;
  borderColor: string;
  darkBorderColor: string;
  textColor: string;
  darkTextColor: string;
  icon: React.FC<{ className?: string }>;
  progressBg: string;
  darkProgressBg: string;
}

export const CATEGORY_DETAILS: { [key in CategoryType]: CategoryDetails } = {
  [CategoryType.Family]: { 
    name: 'Familj', 
    color: 'bg-red-100', 
    darkColor: 'dark:bg-red-900/30',
    hoverColor: 'hover:bg-red-200',
    darkHoverColor: 'dark:hover:bg-red-900/50',
    borderColor: 'border-red-300',
    darkBorderColor: 'dark:border-red-700',
    textColor: 'text-red-800',
    darkTextColor: 'dark:text-red-300',
    icon: FamilyIcon,
    progressBg: 'bg-red-400',
    darkProgressBg: 'dark:bg-red-600',
  },
  [CategoryType.Health]: { 
    name: 'Hälsa', 
    color: 'bg-green-100', 
    darkColor: 'dark:bg-green-900/30',
    hoverColor: 'hover:bg-green-200',
    darkHoverColor: 'dark:hover:bg-green-900/50',
    borderColor: 'border-green-300',
    darkBorderColor: 'dark:border-green-700',
    textColor: 'text-green-800',
    darkTextColor: 'dark:text-green-300',
    icon: HealthIcon,
    progressBg: 'bg-green-400',
    darkProgressBg: 'dark:bg-green-600',
  },
  [CategoryType.Career]: { 
    name: 'Karriär', 
    color: 'bg-orange-100', 
    darkColor: 'dark:bg-orange-900/30',
    hoverColor: 'hover:bg-orange-200',
    darkHoverColor: 'dark:hover:bg-orange-900/50',
    borderColor: 'border-orange-300',
    darkBorderColor: 'dark:border-orange-700',
    textColor: 'text-orange-800',
    darkTextColor: 'dark:text-orange-300',
    icon: CareerIcon,
    progressBg: 'bg-orange-400',
    darkProgressBg: 'dark:bg-orange-600',
  },
  [CategoryType.Development]: { 
    name: 'Utveckling', 
    color: 'bg-blue-100', 
    darkColor: 'dark:bg-blue-900/30',
    hoverColor: 'hover:bg-blue-200',
    darkHoverColor: 'dark:hover:bg-blue-900/50',
    borderColor: 'border-blue-300',
    darkBorderColor: 'dark:border-blue-700',
    textColor: 'text-blue-800',
    darkTextColor: 'dark:text-blue-300',
    icon: DevelopmentIcon,
    progressBg: 'bg-blue-400',
    darkProgressBg: 'dark:bg-blue-600',
  },
};