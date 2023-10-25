import useUser from "../../hooks/useUser";

import StaffProvider from "../../utils/providers/staffProvider";
import ErrorAlert from "../../components/ErrorAlert/index";
import Navbar from "../../components/Navbar/index";
import Main from "../../components/Main/index";
import Sidebar from "../../components/Sidebar/index";
import Card from "../../components/Card/index";
import { useEffect, useState } from "react";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const user = useUser();

  const setStaffsData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setStaffs(await StaffProvider.getStaffs(accessToken));
  };

  useEffect(() => {
    setStaffsData();
  }, []);

  return (
    <>
      <ErrorAlert type='ErrorAlert' />
      <header>
        <Navbar />
      </header>
      <Sidebar user={user?.userData} title={user?.userData?.roleDisplayName} />
      <Main>
        <Card className='Manage'>
          <h1>Manejar Personal</h1>
          <br />
          <Card>
            <h2>Cargos</h2>
          </Card>
          <Card>
            <h2>Personal</h2>
            {staffs && (
              <ul>
                {staffs?.map((staff, i) => (
                  <li key={i}>{staff.firstName}</li>
                ))}
              </ul>
            )}
          </Card>
        </Card>
      </Main>
    </>
  );
};

export default Staff;
