import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialAuth = {
  isAuthenticated: false,
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useReducer(reducer, initialAuth);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
