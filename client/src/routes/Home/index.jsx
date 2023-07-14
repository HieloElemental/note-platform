import RequireAuth from "./../../auth/RequireAuth";
import Navbar from "./../../components/Navbar";

import "./index.css";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <p>
          This is the homepage{" "}
          <RequireAuth allowedRoles={["admin"]}>admin user</RequireAuth>
        </p>
      </main>
    </>
  );
};

export default Home;
