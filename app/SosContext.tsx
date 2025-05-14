import React, { createContext, useState, useContext } from "react";

// Define the structure of an alert.
export interface SosAlert {
  id: string;
  textMessage: string;
  contactNumbers: string[];
  locationEnabled: boolean;
}

// Context type
interface SosContextType {
  alerts: SosAlert[];
  addAlert: (alert: SosAlert) => void;
}

// Create the context
const SosContext = createContext<SosContextType | undefined>(undefined);

// Provider component
export const SosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<SosAlert[]>([]);

  const addAlert = (alert: SosAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, alert]);
  };

  return (
    <SosContext.Provider value={{ alerts, addAlert }}>
      {children}
    </SosContext.Provider>
  );
};

// Custom hook for using SosContext
export const useSosContext = () => {
  const context = useContext(SosContext);
  if (!context) {
    throw new Error("useSosContext must be used within a SosProvider");
  }
  return context;
};

export default SosProvider;