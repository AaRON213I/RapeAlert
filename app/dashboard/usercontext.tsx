import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// Define the UserProfile interface
interface UserProfile {
  image: string;
  fullName: string;
  email: string;
  phone?: string;
}

// Default user profile
const defaultUser: UserProfile = {
  image: "https://via.placeholder.com/150",
  fullName: "John Doe",
  email: "test@example.com",
  phone: "+123 456 7890",
};

// Create context
const userContext = createContext<{
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}>({
  user: defaultUser,
  setUser: () => {},
});

// UserProvider component
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userProfile", JSON.stringify(user));
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook
const useUser = () => useContext(userContext);

export { UserProvider, useUser };
