import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import useStaff from "../../hooks/useStaff";
import usePosition from "./../../hooks/usePosition";

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

const Staff = () => {
  const user = useUser();
  const [isCreating, setIsCreating] = useState(null);

  const setIsCreatingToNull = () => {
    setIsCreating(null);
  };

  const addPositionFields = [
    {
      type: "text",
      name: "position_name",
      label: "Nombre del Cargo",
      required: true,
    },
    {
      type: "list",
      name: "position_fields",
      label: "campos requeridos para este cargo",
      fields: [
        {
          type: "select",
          name: "field_type",
          label: "Seleccionar tipo",
          options: [{ value: "text", label: "texto" }],
        },
        {
          type: "text",
          name: "field_name",
          label: "Nombre del campo",
          required: true,
        },
        {
          type: "checkbox",
          name: "field_required",
          label: "¿El campo es requerido?",
        },
      ],
    },
    {
      type: "checkbox",
      name: "is_admin",
      label: "¿Es administrador?",
    },
  ];

  const addStaffFields = [
    { type: "text", name: "username", label: "Usuario", required: true },
    { type: "password", name: "password", label: "Contraseña", required: true },
  ];

  return (
    <>
      <ErrorAlert type='ErrorAlert' />
      {isCreating && (
        <FullScreenCard closeAction={() => setIsCreatingToNull()}>
          <GeneralForm
            fields={isCreating == "staff" ? addStaffFields : addPositionFields}
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
            <StaffCard />
            <PositionsCard />
          </Flex>
        </Card>
      </Main>
    </>
  );
};

const PositionsCard = () => {
  const PositionHook = usePosition();
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
          {PositionHook?.positions &&
            PositionHook?.positions.map(({ id, positionName }) => (
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

const StaffCard = () => {
  const StaffHook = useStaff();
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
          {StaffHook?.staffs &&
            StaffHook?.staffs.map(
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

export default Staff;
