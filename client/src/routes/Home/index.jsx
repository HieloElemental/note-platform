import RequireAuth from "./../../auth/RequireAuth";
import Navbar from "./../../components/Navbar";
import Main from "../../components/Main";
import Sidebar from "./../../components/Sidebar";

import "./index.css";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Main>
        <Sidebar />
      </Main>
    </>
  );
};

export default Home;
