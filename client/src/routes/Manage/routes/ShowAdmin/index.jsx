import { useParams } from "react-router-dom";

import ErrorAlert from "./../../../../components/ErrorAlert";
import Navbar from "./../../../../components/Navbar";
import Main from "./../../../../components/Main";
import Sidebar from "./../../../../components/Sidebar";
import Card from "./../../../../components/Card";

import fakeUsersProvider from "../../../../utils/fakeUsersProvider";

const ShowAdmin = () => {
  const { id } = useParams();

  const adminUser = fakeUsersProvider.getAdminById(id);
  console.log(adminUser);

  return (
    <>
      <ErrorAlert />
      <header>
        <Navbar />
      </header>
      <Main>
        <Sidebar title={adminUser?.roleDisplayname} user={adminUser} />
        <Card className="Manage Admin">
          <h1>{adminUser?.roleDisplayname}</h1>
          <form action="">
            <input type="text" name="" id="" />
          </form>
        </Card>
      </Main>
    </>
  );
};

export default ShowAdmin;
