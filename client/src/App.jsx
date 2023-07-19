import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { UserProvider } from "./context/UserProvider";
import RequireAuth from "./auth/RequireAuth";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Logout from "./components/Logout";

const App = () => {
  return (
    <UserProvider>
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
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/protected"
            element={
              <RequireAuth allowedRoles={["teacher", "admin"]} redirect>
                <h1>This Page is protected</h1>
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;
