create TABLE "user"(
    id SERIAL PRIMARY KEY,
    faculty VARCHAR(255),
    "group" VARCHAR(255),
    speciality VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INTEGER,
    gender VARCHAR(255),
    role VARCHAR(255),
    department VARCHAR(255),
    specialization VARCHAR(255),
    grade VARCHAR(255),
    administratorLevel INTEGER
);

create TABLE lesson(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    course VARCHAR(255),
    date VARCHAR(255),
    type VARCHAR(255),
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES "user" (id)
);