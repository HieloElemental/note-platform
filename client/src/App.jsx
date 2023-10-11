import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { UserProvider } from "./context/UserProvider";
import { ErrorProvider } from "./context/ErrorProvider";
import RequireAuth from "./auth/RequireAuth";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Staff from "./routes/Staff";
import Logout from "./components/Logout";

const App = () => {
  return (
    <ErrorProvider>
      <UserProvider>
        <AuthProvider>
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth redirect>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route
              path='/staff'
              element={
                <RequireAuth redirect>
                  <Staff />
                </RequireAuth>
              }
            />
            <Route
              path='/protected'
              element={
                <RequireAuth allowedRoles={["teacher", "admin"]} redirect>
                  <h1>This Page is protected</h1>
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </UserProvider>
    </ErrorProvider>
  );
};

export default App;
