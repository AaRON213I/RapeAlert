import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context interface
interface AuthContextProps {
  user: {
    phoneNumber: string;
    address: string;
    fullName: string;
    email: string;
    image: string;
  };
  setUser: (user: { fullName: string; email: string; image: string; phoneNumber: string; address: string }) => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Hook to use AuthContext
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    image: "",
    phoneNumber: "",
    address: ""
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
