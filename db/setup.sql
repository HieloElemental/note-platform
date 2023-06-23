DROP SCHEMA IF EXISTS note_platform_db;

CREATE SCHEMA note_platform_db;
use note_platform_db;


CREATE TABLE user_types (
  user_type_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_type_name VARCHAR(100) NOT NULL,

  PRIMARY KEY (user_type_id)
);

CREATE TABLE users (
    user_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_username VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    user_user_type_id TINYINT UNSIGNED NOT NULL,

    PRIMARY KEY (user_id),
    FOREIGN KEY (user_user_type_id) REFERENCES user_types(user_type_id)
);

CREATE TABLE admins (
    admin_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    admin_displayname VARCHAR(100) NOT NULL,
    admin_user_id INT UNSIGNED NOT NULL,

    PRIMARY KEY(admin_id),
    FOREIGN KEY (admin_user_id) REFERENCES users(user_id)
);

CREATE TABLE technical_transitions (
    technical_transition_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    technical_transition_name VARCHAR(100) NOT NULL,

    PRIMARY KEY (technical_transition_id)
);

CREATE TABLE periods (
    period_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    period_year TINYINT UNSIGNED NOT NULL,
    period_number TINYINT UNSIGNED NOT NULL,
    period_end BINARY NOT NULL,

    PRIMARY KEY (period_id)
);

CREATE TABLE classgroups (
    classgroup_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    classgroup_grade VARCHAR(3) NOT NULL,
    classgroup_group VARCHAR(3) NOT NULL,
    classgroup_period_id INT UNSIGNED NOT NULL,
    classgroup_technical_transition_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (classgroup_id),
    FOREIGN KEY (classgroup_period_id) REFERENCES periods(period_id),
    FOREIGN KEY (classgroup_technical_transition_id) REFERENCES technical_transitions(technical_transition_id)
);

CREATE TABLE students (
    student_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    student_doc_id INT UNSIGNED NOT NULL,
    student_firstname VARCHAR(100) NOT NULL,
    student_lastnames VARCHAR(200) NOT NULL,
    student_date_of_birth DATE NOT NULL,
    student_classgroup_id INT UNSIGNED,
    student_user_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (student_id),
    FOREIGN KEY (student_classgroup_id) REFERENCES classgroups(classgroup_id),
    FOREIGN KEY (student_user_id) REFERENCES users(user_id)
);

CREATE TABLE attendants (
    attendant_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    attendant_doc_id INT UNSIGNED NOT NULL,
    attendant_firstname VARCHAR(100) NOT NULL,
    attendant_lastnames VARCHAR(200) NOT NULL,
    attendant_date_of_birth DATE NOT NULL,
    attendant_student_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (attendant_id),
    FOREIGN KEY (attendant_student_id) REFERENCES students(student_id)
);

CREATE TABLE areas (
    area_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    area_name VARCHAR(100) NOT NULL,

    PRIMARY KEY (area_id)
);

CREATE TABLE teachers (
    teacher_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    teacher_firstname VARCHAR(100) NOT NULL,
    teacher_lastnames VARCHAR(200) NOT NULL,
    teacher_date_of_birth DATE NOT NULL,
    teacher_classgroup_id INT UNSIGNED,
    teacher_area_id INT UNSIGNED,
    teacher_is_director BINARY NOT NULL,
    teacher_user_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (teacher_id),
    FOREIGN KEY (teacher_classgroup_id) REFERENCES classgroups(classgroup_id),
    FOREIGN KEY (teacher_area_id) REFERENCES areas(area_id),
    FOREIGN KEY (teacher_user_id) REFERENCES users(user_id)
);

CREATE TABLE subjects (
    subject_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    subject_name VARCHAR(100) NOT NULL,
    subject_teacher_id INT UNSIGNED NOT NULL,
    subject_classgroup_id INT UNSIGNED NOT NULL,
    subject_area_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (subject_id),
    FOREIGN KEY (subject_teacher_id) REFERENCES teachers(teacher_id),
    FOREIGN KEY (subject_classgroup_id) REFERENCES classgroups(classgroup_id),
    FOREIGN KEY (subject_area_id) REFERENCES areas(area_id)
);

CREATE TABLE achievements (
    achievement_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    achievement_title VARCHAR(200) NOT NULL,
    achievement_methodology VARCHAR(800) NOT NULL,
    achievement_bibliography VARCHAR(900) NOT NULL,
    achievement_resources VARCHAR(800) NOT NULL,
    achievement_subject_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (achievement_id),
    FOREIGN KEY (achievement_subject_id) REFERENCES subjects(subject_id)
);

CREATE TABLE skills (
    skill_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    skill_title VARCHAR(200) NOT NULL,
    skill_achievement_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (skill_id),
    FOREIGN KEY (skill_id) REFERENCES achievements(achievement_id)
);

CREATE TABLE note_types (
    note_type_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    note_type_type VARCHAR(20) NOT NULL,
    note_type_percentage TINYINT UNSIGNED NOT NULL,

    PRIMARY KEY (note_type_id)
);

CREATE TABLE cells (
    cell_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    cell_evaluation VARCHAR(100) NOT NULL,
    cell_date DATE,
    cell_skill_id INT UNSIGNED NOT NULL,
    cell_note_type_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (cell_id),
    FOREIGN KEY (cell_skill_id) REFERENCES skills(skill_id),
    FOREIGN KEY (cell_note_type_id) REFERENCES note_types(note_type_id)
);

CREATE TABLE notes (
    note_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    note_value TINYINT,
    note_student_id INT UNSIGNED NOT NULL,
    note_cell_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (note_id),
    FOREIGN KEY (note_student_id) REFERENCES students(student_id),
    FOREIGN KEY (note_cell_id) REFERENCES cells(cell_id)
);

INSERT INTO
    user_types (user_type_name) 
VALUES 
    ('admin'), 
    ('teacher'), 
    ('student');

INSERT INTO 
    users (user_username, user_password, user_user_type_id) 
VALUES 
    ('123456789', '123456789', 1);

INSERT INTO 
    admins (admin_displayname, admin_user_id) 
VALUES 
    ('Administrador Principal', 1);

INSERT INTO 
    note_types (note_type_type, note_type_percentage) 
VALUES 
    ('Conceptual', 40), 
    ('Procedimental', 40), 
    ('Actitudinal', 20);