const db = require("../config/db");

const T_USERS = "users";
const T_STAFF = "staff";
const T_IDENTIFICATION_TYPES = "identification_types";
const T_POSITIONS = "positions";
const T_MARITAL_STATUS = "marital_statuses";

const findStaffByUserId = (userId) => {
  try {
    return db(T_USERS)
      .where({ "users.id": userId })
      .select({
        id: `${T_USERS}.id`,
        staffId: `${T_STAFF}.id`,
        staffFirstName: `${T_STAFF}.first_name`,
        staffSecondName: `${T_STAFF}.second_name`,
        staffFirstLastName: `${T_STAFF}.first_last_name`,
        staffSecondLastName: `${T_STAFF}.second_last_name`,
        identificationTypeName: `${T_IDENTIFICATION_TYPES}.type_name`,
        identificationTypeShortName: `${T_IDENTIFICATION_TYPES}.short_name`,
        staffIdentificationNumber: `${T_STAFF}.identification_number`,
        staffIdentificationIssuancePlace: `${T_STAFF}.identification_issuance_place`,
        staffBirthDate: `${T_STAFF}.birth_date`,
        staffBirthMunicipality: `${T_STAFF}.birth_municipality`,
        staffSex: `${T_STAFF}.sex`,
        positionName: `${T_POSITIONS}.position_name`,
        positionAllowedModules: `${T_POSITIONS}.allowed_modules`,
        isAdmin: `${T_POSITIONS}.is_admin`,
        staffRequiredData: `${T_STAFF}.required_data`,
        maritalStatusName: `${T_MARITAL_STATUS}.marital_status_name`,
        staffNumberOfChildren: `${T_STAFF}.number_of_children`,
      })
      .join(T_STAFF, `${T_STAFF}.id`, "=", `${T_USERS}.staff_id`)
      .join(
        T_IDENTIFICATION_TYPES,
        `${T_IDENTIFICATION_TYPES}.id`,
        "=",
        `${T_STAFF}.identification_type_id`
      )
      .join(T_POSITIONS, `${T_POSITIONS}.id`, "=", `${T_STAFF}.position_id`)
      .leftOuterJoin(
        T_MARITAL_STATUS,
        `${T_MARITAL_STATUS}.id`,
        "=",
        `${T_STAFF}.marital_status_id`
      )
      .first();
  } catch (error) {
    throw error;
  }
};

const listStaff = () => {
  try {
    return db(T_STAFF);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findStaffByUserId,
  listStaff,
};
