import useUser from "../../hooks/useUser";

import StaffProvider from "../../utils/providers/staffProvider";
import ErrorAlert from "../../components/ErrorAlert/index";
import Navbar from "../../components/Navbar/index";
import Main from "../../components/Main/index";
import Sidebar from "../../components/Sidebar/index";
import Card from "../../components/Card/index";
import Flex from "../../components/Flex/index";
import { useEffect, useState } from "react";

import "./index.css";
import Button from "./../../components/Button/index";

const Staff = () => {
  const [staffs, setStaffs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const user = useUser();

  const switchSelectedStaff = (staffId) => {
    if (selectedId === staffId) {
      setSelectedId(null);
    } else {
      setSelectedId(staffId);
    }
  };

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
          <Flex>
            <Card className='StaffCard'>
              <h2>Personal</h2>
              <table>
                <thead>
                  <tr>
                    <td>Nombre</td>
                    <td>Identificación</td>
                  </tr>
                </thead>
                <tbody>
                  {staffs &&
                    staffs?.map(
                      (
                        {
                          staffFirstName,
                          staffSecondName,
                          staffFirstLastName,
                          staffSecondLastName,
                          staffIdentificationNumber,
                          staffId,
                        },
                        i
                      ) => (
                        <>
                          <tr
                            key={i}
                            onClick={() => switchSelectedStaff(staffId)}
                          >
                            <td>
                              {`${staffFirstName || ""} `}
                              {`${staffSecondName || ""} `}
                              {`${staffFirstLastName || ""} `}
                              {`${staffSecondLastName || ""} `}
                            </td>
                            <td>{staffIdentificationNumber || ""}</td>
                          </tr>
                          {selectedId === staffId && (
                            <tr>
                              <td colSpan={10}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <Button>Ver Información</Button>
                                  <Button>Editar</Button>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      )
                    )}
                </tbody>
              </table>
            </Card>
            <Card className=''>
              <h2>Cargos</h2>
            </Card>
          </Flex>
        </Card>
      </Main>
    </>
  );
};

export default Staff;
