import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Home from "./routes/Home";
import Login from "./routes/Login";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/protected"
          element={
            <RequireAuth allowedRoles={["teacher", "admin"]} unauth>
              <h1>This Page is protected</h1>
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
