import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./auth/RequireAuth";
import Login from "./routes/Login";
import useAuth from "./hooks/useAuth";

const App = () => {
  const auth = useAuth();
  if (localStorage.token) {
    auth.getDataByToken(localStorage.token);
  }
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<h1>HomePage</h1>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/protected"
          element={
            <RequireAuth allowedRoles={["teacher", "admin"]}>
              <h1>This Page is protected</h1>
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
