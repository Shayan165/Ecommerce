import { createContext, useContext, useState } from "react";

let AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [conData, setConData] = useState({
    isLoggedIn:false,
    currentUserName:null,
    currentUserId:null,
    currentUserRole:null
  });


  return (
    <AuthContext.Provider value={{ conData,setConData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
