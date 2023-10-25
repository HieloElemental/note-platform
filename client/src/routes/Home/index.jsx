import useUser from "../../hooks/useUser";

import Navbar from "./../../components/Navbar";
import Main from "../../components/Main";
import Sidebar from "./../../components/Sidebar";
import ErrorAlert from "../../components/ErrorAlert";

import "./index.css";

const Home = () => {
  const user = useUser();

  return (
    <>
      <ErrorAlert type='ErrorAlert' />
      <header>
        <Navbar />
      </header>
      <Sidebar user={user?.userData} title={user?.userData?.roleDisplayname} />
      <Main></Main>
    </>
  );
};

export default Home;
