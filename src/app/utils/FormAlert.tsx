'use client';

import React, { useState, createContext } from 'react';
type ShowAlert = (message: string) => void;

// Context for managing alert state
const AlertContext = createContext<ShowAlert | null>(null);


export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<{ message: string; visible: boolean }>({
      message: '',
      visible: false,
    });
  
    const showAlert: ShowAlert = (message) => {
      setAlert({ message, visible: true });
      setTimeout(() => setAlert({ message: '', visible: false }), 3000); // Auto-hide after 3 seconds
    };
  
    return (
      <AlertContext.Provider value={showAlert}>
        {children}
        {alert.visible && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded shadow-lg z-50">
            {alert.message}
          </div>
        )}
      </AlertContext.Provider>
    );
  };
  