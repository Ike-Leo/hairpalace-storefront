'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { generateSessionId } from '@/lib/utils';

interface SessionContextType {
  sessionId: string;
  initialized: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'hair_palace_session_id';

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [sessionId, setSessionId] = useState<string>('');
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Load or create session ID on mount
    const storedSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateSessionId();
      localStorage.setItem(SESSION_STORAGE_KEY, newSessionId);
      setSessionId(newSessionId);
    }

    setInitialized(true);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionId, initialized }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
