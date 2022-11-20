import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import BaseRoutes from "./routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BaseRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
