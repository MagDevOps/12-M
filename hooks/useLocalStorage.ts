import { useState, useEffect } from 'react';

function readValue<T>(key: string, initialValue: T): T {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  } catch (error) {
    console.warn(`useLocalStorage: Failed to read key "${key}"`, error);
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => readValue<T>(key, initialValue));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: Failed to write key "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
