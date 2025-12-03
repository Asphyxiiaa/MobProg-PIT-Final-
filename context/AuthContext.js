import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'Worker' or 'Employer'
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Splash Screen State

  // ✅ STATE MANAGEMENT: The 'Database' of jobs lives here
  const [jobs, setJobs] = useState([
    { id: '1', title: 'Leaky Faucet Repair', category: 'Plumbing', pay: '₱500', postedBy: 'Employer A', location: 'Zone 1', time: '5 mins ago' },
    { id: '2', title: 'Tutor in Algebra', category: 'Tutoring', pay: '₱350/hr', postedBy: 'Employer B', location: 'Zone 3', time: '1 hr ago' },
    { id: '3', title: 'Garden Weeding', category: 'Gardening', pay: '₱300', postedBy: 'Employer C', location: 'Zone 4', time: '2 hrs ago' },
  ]);

  // Simulate App Loading (Splash Screen)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  const login = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setIsVerified(true); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setIsVerified(false);
  };

  // ✅ FUNCTION: This is what PostJobScreen will call
  const addJob = (newJob) => {
    // We use the spread operator (...) to add the new job to the TOP of the list
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  const contextValue = {
    isLoggedIn,
    isLoading,
    userRole,
    isVerified,
    login,
    logout,
    jobs,   // Expose the list
    addJob, // Expose the function
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
