import { Routes, Route } from "react-router-dom";
import Auth from "./Auth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>} />
      <Route path="/login" element={<h1>LoginPage</h1>} />
      <Route
        path="/auth"
        element={
          <Auth>
            <h1>SignupPage</h1>
          </Auth>
        }
      />
    </Routes>
  );
};

export default App;
