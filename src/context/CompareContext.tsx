import React, { createContext, useContext, useState } from 'react';
import { ToolItem } from '../types';

interface CompareContextType {
  compareList: ToolItem[];
  addToCompare: (tool: ToolItem) => boolean;
  removeFromCompare: (toolId: string) => void;
  clearCompare: () => void;
  isInCompare: (toolId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareList, setCompareList] = useState<ToolItem[]>([]);

  const addToCompare = (tool: ToolItem): boolean => {
    if (compareList.some((t) => t.id === tool.id)) {
      return false;
    }
    if (compareList.length >= 4) {
      alert('You can compare up to 4 tools at a time.');
      return false;
    }
    setCompareList((prev) => [...prev, tool]);
    return true;
  };

  const removeFromCompare = (toolId: string) => {
    setCompareList((prev) => prev.filter((t) => t.id !== toolId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (toolId: string) => {
    return compareList.some((t) => t.id === toolId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return ctx;
};
