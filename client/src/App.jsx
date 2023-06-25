import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>HomePage</h1>} />
      <Route path="/login" element={<h1>LoginPage</h1>} />
    </Routes>
  );
};

export default App;
