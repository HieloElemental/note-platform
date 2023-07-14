import RequireAuth from "./../../auth/RequireAuth";
import Navbar from "./../../components/Navbar";
import Main from "../../components/Main";

import "./index.css";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Main>
        <p>
          This is the homepage{" "}
          <RequireAuth allowedRoles={["admin"]}>admin user</RequireAuth>
        </p>
      </Main>
    </>
  );
};

export default Home;
