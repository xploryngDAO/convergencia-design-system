import React, { createContext, useContext, type ReactNode } from 'react';
const ThemeContext = createContext<'light' | 'dark'>('light');
export const useTheme = () => useContext(ThemeContext);
/** Wrap your product once. Portals retain the same theme without mutating document globals. */
export function DesignSystemProvider({
  children,
  theme = 'light',
  className = '',
}: {
  children: ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <ThemeContext.Provider value={theme}>
      <div className={`cv-root ${className}`} data-theme={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
