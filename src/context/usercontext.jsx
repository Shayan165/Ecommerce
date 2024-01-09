import { createContext, useContext, useState } from "react";

let AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [conData, setConData] = useState({
    isLoggedIn:false,
    currentUserName:null,
    currentUserId:null,
    currentUserRole:null
  });
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [products, setProducts] = useState([]);

  return (
    <AuthContext.Provider value={{ conData,setConData,brands, setBrands ,categories, setCategories,products, setProducts}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
