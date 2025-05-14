import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of an alert
export interface Alert {
  category: string;
  eventName: string;
  phoneNumber: string;
  contactCategory: string;
  emergencyMode: string;
  location: string;
}

// Define the shape of the context value
interface AlertsContextType {
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
}

// Create the context
const AlertsContext = createContext<AlertsContextType>({
  alerts: [],
  addAlert: () => {},
});

// Define the props for the AlertsProvider
interface AlertsProviderProps {
  children: ReactNode;
}

// Provider component
const AlertsProvider: React.FC<AlertsProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Add an alert
  const addAlert = (alert: Alert) => {
    setAlerts((prevAlerts) => {
      console.log("Alert added:", alert); // Log to verify alert
      return [...prevAlerts, alert];
    });
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
export const useAlerts = () => useContext(AlertsContext);