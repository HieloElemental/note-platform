import React, { useCallback, useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import useError from "../../hooks/useError";

import StaffProvider from "../../utils/providers/staffProvider";
import PositionProvider from "../../utils/providers/positionProvider";
import ErrorAlert from "../../components/ErrorAlert/index";
import Navbar from "../../components/Navbar/index";
import Main from "../../components/Main/index";
import Sidebar from "../../components/Sidebar/index";
import Card from "../../components/Card/index";
import Flex from "../../components/Flex/index";
import Button from "./../../components/Button/index";
import FullScreenCard from "./../../components/FullScreenCard/index";
import GeneralForm from "./../../components/GeneralForm/index";

import "./index.css";
import { PropTypes } from "prop-types";

const Staff = () => {
  const user = useUser();
  const usedError = useError();
  const [isCreating, setIsCreating] = useState(null);

  const setIsCreatingToNull = () => {
    setIsCreating(null);
  };

  const addStaffFields = [
    { type: "text", name: "username", label: "Usuario", required: true },
    { type: "password", name: "password", label: "Contraseña", required: true },
  ];

  const [positions, setPositions] = useState([]);
  const [staffs, setStaffs] = useState([]);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const positionsData = await PositionProvider.getPositions({
        token: accessToken,
      });
      const staffsData = await StaffProvider.getStaffs({ token: accessToken });

      setPositions(positionsData);
      setStaffs(staffsData);
    } catch (err) {
      usedError.showError(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedError]);
  return (
    <>
      <ErrorAlert type='ErrorAlert' />
      {isCreating && (
        <FullScreenCard closeAction={() => setIsCreatingToNull()}>
          <GeneralForm
            fields={addStaffFields}
            onSubmit={() => {}}
            btn={{ type: "add" }}
          >
            <h2>{`Añadir ${isCreating == "staff" ? "Personal" : "Cargo"}`}</h2>
          </GeneralForm>
        </FullScreenCard>
      )}
      <header>
        <Navbar />
      </header>
      <Sidebar user={user?.userData} title={user?.userData?.roleDisplayName} />
      <Main>
        <Card className='Manage'>
          <h1 style={{ marginTop: "10px" }}>Manejar Personal</h1>
          <br />
          <Flex style={{ justifyContent: "space-around" }}>
            <Button onClick={() => setIsCreating("staff")}>
              Añadir Personal
            </Button>
            <Button onClick={() => setIsCreating("position")}>
              Añadir Cargo
            </Button>
          </Flex>
          <br />
          <Flex>
            <StaffCard staffs={staffs} />
            <PositionsCard positions={positions} />
          </Flex>
        </Card>
      </Main>
    </>
  );
};

const PositionsCard = ({ positions }) => {
  const [selectedPositionId, setSelectedPositionId] = useState(null);

  const switchSelectedPosition = (positionId) => {
    if (selectedPositionId == positionId) {
      setSelectedPositionId(null);
    } else {
      setSelectedPositionId(positionId);
    }
  };

  return (
    <Card className='StaffPositionsCard'>
      <h2>Cargos</h2>
      <table>
        <thead>
          <tr>
            <td>Nombre del cargo</td>
          </tr>
        </thead>
        <tbody>
          {positions &&
            positions?.map(({ id, positionName }) => (
              <React.Fragment key={id}>
                <tr onClick={() => switchSelectedPosition(id)}>
                  <td>{positionName}</td>
                </tr>
                {selectedPositionId === id && (
                  <tr>
                    <td colSpan={10}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Button>Ver</Button>
                        <Button>Editar</Button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </Card>
  );
};
PositionsCard.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.any),
};

const StaffCard = ({ staffs }) => {
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const switchSelectedStaff = (staffId) => {
    if (selectedStaffId === staffId) {
      setSelectedStaffId(null);
    } else {
      setSelectedStaffId(staffId);
    }
  };

  return (
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
              ({
                staffFirstName,
                staffSecondName,
                staffFirstLastName,
                staffSecondLastName,
                staffIdentificationNumber,
                staffId,
              }) => (
                <React.Fragment key={staffId * 2 - 1}>
                  <tr onClick={() => switchSelectedStaff(staffId)}>
                    <td>
                      {`${staffFirstName || ""} `}
                      {`${staffSecondName || ""} `}
                      {`${staffFirstLastName || ""} `}
                      {`${staffSecondLastName || ""} `}
                    </td>
                    <td>{staffIdentificationNumber || ""}</td>
                  </tr>
                  {selectedStaffId === staffId && (
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
                </React.Fragment>
              )
            )}
        </tbody>
      </table>
    </Card>
  );
};
StaffCard.propTypes = {
  staffs: PropTypes.arrayOf(PropTypes.any),
};

export default Staff;
