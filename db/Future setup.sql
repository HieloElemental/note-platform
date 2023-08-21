DROP SCHEMA IF EXISTS note_platform_db;

CREATE SCHEMA note_platform_db;

use note_platform_db;

CREATE TABLE
    validities (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        /* General */
        validity_name VARCHAR(6) NOT NULL,
        validity_type VARCHAR(20) NOT NULL,
        fraction INT UNSIGNED NOT NULL,
        validity_start DATE,
        validity_end DATE,
        /* Evaluative System */
        sytem_name VARCHAR(50) NOT NULL,
        scale TINYINT NOT NULL,
        minimum_aprove TINYINT NOT NULL,
        has_1290_decret BOOLEAN NOT NULL,
        minimum_lost_ammount TINYINT NOT NULL,
        area_or_subject BOOLEAN NOT NULL,
        remedial_clases_by_skills BOOLEAN NOT NULL,
        remedial_note_limited BOOLEAN NOT NULL,
        force_definitive_remedials BOOLEAN NOT NULL,
        calculate_areas_with_subjects_lost BOOLEAN NOT NULL,
        promedy_achivements_on_report BOOLEAN NOT NULL,
        /* Options */
        validity_use VARCHAR(20) NOT NULL,
        enable_achivements BOOLEAN NOT NULL,
        achivement_and_skills_by_group BOOLEAN NOT NULL,
        enable_monitoring BOOLEAN NOT NULL,
        weight_subjects BOOLEAN NOT NULL,
        weight_evaluations BOOLEAN NOT NULL,
        semestral_evaluation BOOLEAN NOT NULL,
        semestral_evaluation_value TINYINT,
        rich_text BOOLEAN NOT NULL,
        field_journal_by_grades BOOLEAN NOT NULL,
        /* Keys */
        methodology VARCHAR(500),
        study_plan VARCHAR(500),
        PRIMARY KEY (id)
    );

CREATE TABLE
    evaluation_system (
        id INT UNSIGNED NOT NULL,
        validity_id INT UNSIGNED NOT NULL,
        cualitative VARCHAR(10) NOT NULL,
        exaluation_name VARCHAR(50) NOT NULL,
        cuantitative FLOAT NOT NULL,
        minimum FLOAT NOT NULL,
        maximum FLOAT NOT NULL,
        evaluation_percentage FLOAT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (validity_id) REFERENCES validities (id)
    );

CREATE TABLE
    evaluation_types (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        evaluation_name VARCHAR(20) NOT NULL,
        evaluation_weight TINYINT NOT NULL,
        has_period_evaluation BOOLEAN NOT NULL,
        period_evaluation_weight TINYINT,
        ev_order TINYINT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    periods (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        period_number INT UNSIGNED NOT NULL,
        period_name VARCHAR(20),
        has_semester_evaluation BOOLEAN NOT NULL,
        period_start DATE,
        period_end DATE,
        period_end_note_entry DATE,
        is_final BOOLEAN NOT NULL,
        is_closed BOOLEAN NOT NULL,
        validity_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (validity_id) REFERENCES validities (id)
    );

CREATE TABLE
    modalities (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        modality_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    marital_statuses (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        marital_status_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    dropout_reasons (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        reason_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    kinships (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        kinship_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    exceptional_abilities (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        ability_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    disabilities (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        disability_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    armed_conflict_situations (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        situation_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    inscription_stages (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        stage_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    occupations (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        occupation_name VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    professions (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        profession_name VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    qualifications (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        qualification_name VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    eps (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        eps_name VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    religions (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        religion_name VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    educational_backgrouns (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        background_name VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    identification_types (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        type_name VARCHAR(200) NOT NULL,
        short_name VARCHAR(550),
        PRIMARY KEY (id)
    );

CREATE TABLE
    countries (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        country_name VARCHAR(200) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    departments (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        department_name VARCHAR(200) NOT NULL,
        country_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (country_id) REFERENCES countries (id)
    );

CREATE TABLE
    towns (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        town_name VARCHAR(200) NOT NULL,
        department_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (department_id) REFERENCES departments (id)
    );

CREATE TABLE
    neighborhoods (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        neighborhood_name VARCHAR(200) NOT NULL,
        town_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (town_id) REFERENCES towns (id)
    );

CREATE TABLE
    native_reservations (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        reservation_name VARCHAR(200) NOT NULL,
        department_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (department_id) REFERENCES departments (id)
    );

CREATE TABLE
    ethnicities (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        ethnicity_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    contact_data (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        phone VARCHAR(20),
        telephone VARCHAR(20),
        email VARCHAR(50),
        home_adress VARCHAR(200),
        PRIMARY KEY (id)
    );

CREATE TABLE
    enrollment_numbers (
        id INT UNSIGNED AUTO_INCREMENT NOT NULL,
        /* General */
        creation_date DATE NOT NULL,
        enrollment_number VARCHAR(20) NOT NULL,
        is_active BOOLEAN NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        second_name VARCHAR(100),
        first_lastname VARCHAR(100) NOT NULL,
        second_lastname VARCHAR(100),
        /* Identification/Document */
        identification_type_id INT UNSIGNED NOT NULL,
        identification_number VARCHAR(20) NOT NULL,
        identification_issuance_place VARCHAR(50),
        /* Birth */
        birth_date DATE NOT NULL,
        birth_country_id INT UNSIGNED,
        birth_department INT UNSIGNED,
        birth_municipality_id INT UNSIGNED,
        /* Others */
        sex VARCHAR(10) NOT NULL,
        marital_status_id INT UNSIGNED,
        blood_type VARCHAR(5),
        /* Status */
        ethnicity_id INT UNSIGNED,
        is_protected BOOLEAN NOT NULL,
        resettlement_department VARCHAR(50),
        religion_id INT UNSIGNED,
        exceptional_ability_id INT UNSIGNED,
        armed_conflict_situation_id INT UNSIGNED,
        displacement_department_id INT UNSIGNED,
        displacement_town_id INT UNSIGNED,
        is_home_head BOOLEAN NOT NULL,
        /* Health */
        sisben VARCHAR(10),
        sisben_points VARCHAR(10),
        eps VARCHAR(50),
        suffered_dieases VARCHAR(255),
        disability_id INT UNSIGNED,
        disability_type VARCHAR(255),
        /* Keys */
        PRIMARY KEY (id),
        FOREIGN KEY (identification_type_id) REFERENCES identification_types (id),
        FOREIGN KEY (marital_status_id) REFERENCES marital_statuses (id) ON DELETE SET NULL,
        FOREIGN KEY (ethnicity_id) REFERENCES ethnicities (id) ON DELETE SET NULL,
        FOREIGN KEY (religion_id) REFERENCES religions (id) ON DELETE SET NULL,
        FOREIGN KEY (exceptional_ability_id) REFERENCES exceptional_abilities (id) ON DELETE SET NULL,
        FOREIGN KEY (armed_conflict_situation_id) REFERENCES armed_conflict_situations (id) ON DELETE SET NULL,
        FOREIGN KEY (displacement_department_id) REFERENCES departments (id) ON DELETE SET NULL,
        FOREIGN KEY (displacement_town_id) REFERENCES towns (id) ON DELETE SET NULL,
        FOREIGN KEY (disability_id) REFERENCES disabilities (id) ON DELETE SET NULL
    );

CREATE TABLE
    enrollments (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        validity_id INT UNSIGNED NOT NULL,
        /* Enrollment */
        is_new BOOLEAN NOT NULL,
        is_repeating BOOLEAN NOT NULL,
        grade_sheet_number VARCHAR(20),
        enrollment_number_id INT UNSIGNED NOT NULL,
        contact_data_id INT UNSIGNED NOT NULL,
        /* Keys */
        PRIMARY KEY (id),
        FOREIGN KEY (enrollment_number_id) REFERENCES enrollment_numbers (id),
        FOREIGN KEY (validity_id) REFERENCES validities (id),
        FOREIGN KEY (contact_data_id) REFERENCES contact_data (id)
    );

CREATE TABLE
    attendants (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        enrollment_id INT UNSIGNED NOT NULL,
        firstname VARCHAR(100) NOT NULL,
        lastnames VARCHAR(200) NOT NULL,
        date_of_birth DATE NOT NULL,
        contact_data_id INT UNSIGNED,
        PRIMARY KEY (id),
        FOREIGN KEY (enrollment_id) REFERENCES enrollments (id),
        FOREIGN KEY (contact_data_id) REFERENCES contact_data (id) ON DELETE SET NULL
    );

CREATE TABLE
    positions (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        position_name VARCHAR(50) NOT NULL,
        required_data_format TEXT,
        is_admin BOOLEAN NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    staff (
        /* General */
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(100) NOT NULL,
        second_name VARCHAR(100),
        first_lastname VARCHAR(100) NOT NULL,
        second_lastname VARCHAR(100),
        /* Document */
        identification_type_id INT UNSIGNED NOT NULL,
        identification_number VARCHAR(20) NOT NULL,
        identification_issuance_place VARCHAR(50),
        /* Birth */
        birth_date DATE,
        birth_municipality VARCHAR(50),
        /* Others */
        sex VARCHAR(10),
        position_id INT UNSIGNED NOT NULL,
        required_data TEXT,
        /* Status */
        marital_status_id INT UNSIGNED,
        number_of_children INT UNSIGNED,
        /* Keys */
        PRIMARY KEY (id),
        FOREIGN KEY (identification_type_id) REFERENCES identification_types (id),
        FOREIGN KEY (position_id) REFERENCES positions (id),
        FOREIGN KEY (marital_status_id) REFERENCES marital_statuses (id)
    );

CREATE TABLE
    valid_staff (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        validity_id INT UNSIGNED NOT NULL,
        staff_id INT UNSIGNED NOT NULL,
        contact_data_id INT UNSIGNED,
        PRIMARY KEY (id),
        FOREIGN KEY (validity_id) REFERENCES validities (id),
        FOREIGN KEY (staff_id) REFERENCES staff (id),
        FOREIGN KEY (contact_data_id) REFERENCES contact_data (id)
    );

CREATE TABLE
    users (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        staff_id INT UNSIGNED,
        enrollment_id INT UNSIGNED,
        username VARCHAR(50) NOT NULL,
        user_password VARCHAR(500) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    teaching_resources (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    teaching_spaces (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (id)
    );

CREATE TABLE
    teaching_reservations (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        reservation_start DATETIME NOT NULL,
        reservation_end DATETIME NOT NULL,
        reservated_resource_id INT UNSIGNED,
        reservated_space_id INT UNSIGNED,
        staff_reservator_id INT UNSIGNED,
        PRIMARY KEY (id),
        FOREIGN KEY (reservated_resource_id) REFERENCES teaching_resources (id),
        FOREIGN KEY (reservated_space_id) REFERENCES teaching_spaces (id),
        FOREIGN KEY (staff_reservator_id) REFERENCES valid_staff (id)
    );

CREATE TABLE
    jouney_sessions (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        session_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    levels (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        level_name VARCHAR(50) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    grades (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        grade_name VARCHAR(50) NOT NULL,
        next_grade_id INT UNSIGNED,
        level_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (level_id) REFERENCES levels (id)
    );

CREATE TABLE
    classgroups (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        validity_id INT UNSIGNED NOT NULL,
        jouney_session_id INT UNSIGNED NOT NULL,
        grade_id INT UNSIGNED NOT NULL,
        group_letter VARCHAR(3) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (validity_id) REFERENCES validities (id),
        FOREIGN KEY (jouney_session_id) REFERENCES jouney_sessions (id),
        FOREIGN KEY (grade_id) REFERENCES grades (id)
    );

CREATE TABLE
    classgroup_partitions (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        partition_number INT UNSIGNED NOT NULL,
        partition_name VARCHAR(20) NOT NULL,
        classgroup_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (classgroup_id) REFERENCES classgroups (id)
    );

CREATE TABLE
    areas (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        area_name VARCHAR(200) NOT NULL,
        short_name VARCHAR(100),
        area_order INT UNSIGNED NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    subjects (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        area_id INT UNSIGNED NOT NULL,
        subject_name VARCHAR(200) NOT NULL,
        short_name VARCHAR(100),
        subject_order INT UNSIGNED NOT NULL,
        is_reinforceable BOOLEAN NOT NULL,
        is_cualitative BOOLEAN NOT NULL,
        is_active BOOLEAN NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (area_id) REFERENCES areas (id)
    );

CREATE TABLE
    asignations (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        staff_id INT UNSIGNED NOT NULL,
        subject_id INT UNSIGNED NOT NULL,
        partition_id INT UNSIGNED NOT NULL,
        modality_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (staff_id) REFERENCES valid_staff (id),
        FOREIGN KEY (subject_id) REFERENCES subjects (id),
        FOREIGN KEY (partition_id) REFERENCES classgroup_partitions (id),
        FOREIGN KEY (modality_id) REFERENCES modalities (id)
    );

CREATE TABLE
    class_journal (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        asignation_id INT UNSIGNED NOT NULL,
        class_number INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (asignation_id) REFERENCES asignations (id)
    );

CREATE TABLE
    skills (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        period_id INT UNSIGNED NOT NULL,
        grade_id INT UNSIGNED NOT NULL,
        subject_id INT UNSIGNED NOT NULL,
        skill_name VARCHAR(50) NOT NULL,
        methodology VARCHAR(255) NOT NULL,
        resources VARCHAR(255) NOT NULL,
        bibliography VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (period_id) REFERENCES periods (id),
        FOREIGN KEY (grade_id) REFERENCES grades (id),
        FOREIGN KEY (subject_id) REFERENCES subjects (id)
    );

CREATE TABLE
    achievements (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        achievement_name VARCHAR(50) NOT NULL,
        skill_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (skill_id) REFERENCES skills (id)
    );

CREATE TABLE
    cells (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        achievement_id INT UNSIGNED NOT NULL,
        partition_id INT UNSIGNED NOT NULL,
        cell_description INT UNSIGNED NOT NULL,
        evaluation_system_id INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (achievement_id) REFERENCES achievements (id),
        FOREIGN KEY (evaluation_system_id) REFERENCES evaluation_system (id)
    );

CREATE TABLE
    notes (
        id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        cell_id INT UNSIGNED NOT NULL,
        note_value INT UNSIGNED NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (cell_id) REFERENCES cells (id)
    );

/* Global Data */
INSERT INTO
    identification_types (type_name, short_name)
VALUES
    ("Cédula de Ciudadanía", "C.C."),
    ("Tarjeta de Identidad", "T.I."),
    ("Registro Civil", "R.C.");

/* Insert data */
INSERT INTO
    positions (position_name, is_admin)
VALUES
    ("Administrador General", true);

INSERT INTO
    staff (
        first_name,
        first_lastname,
        identification_type_id,
        identification_number,
        position_id
    )
VALUES
    ("Administrador", "Principal", 1, "123456789", 1);

INSERT INTO
    users (staff_id, username, user_password)
VALUES
    (
        1,
        "123456789",
        "$2a$10$z7gkZVODMy9dk28RwM0mBOPqXC.KcK6OB6xfk8gZyRyOGevi9yfaK"
    );