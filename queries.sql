CREATE TABLE students (
  id int PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  family_type VARCHAR(100) NOT NULL
);

SELECT id, name, email FROM students WHERE family_type = 'Blaze';

SELECT id, name, email FROM students WHERE family_type = 'Wave';

SELECT id, name, email FROM students WHERE family_type = 'Leaf';

SELECT id, name, email FROM students WHERE family_type = 'Shock';

-- Queries for the Blaze family
INSERT INTO students (id, name, email, family_type) VALUES (214567, 'Alice Chen', 'alice.chen@student.ateneo.edu', 'Blaze');
INSERT INTO students (id, name, email, family_type) VALUES (228901, 'Bob Davis', 'bob.davis@student.ateneo.edu', 'Blaze');
INSERT INTO students (id, name, email, family_type) VALUES (235432, 'Carol Evans', 'carol.evans@student.ateneo.edu', 'Blaze');
INSERT INTO students (id, name, email, family_type) VALUES (241234, 'David Garcia', 'david.garcia@student.ateneo.edu', 'Blaze');
INSERT INTO students (id, name, email, family_type) VALUES (250987, 'Emily Harris', 'emily.harris@student.ateneo.edu', 'Blaze');
INSERT INTO students (id, name, email, family_type) VALUES (218765, 'Frank Jones', 'frank.jones@student.ateneo.edu', 'Blaze');
INSERT INTO students (id, name, email, family_type) VALUES (223456, 'Grace King', 'grace.king@student.ateneo.edu', 'Blaze');

-- Queries for the Wave family
INSERT INTO students (id, name, email, family_type) VALUES (239876, 'Henry Lee', 'henry.lee@student.ateneo.edu', 'Wave');
INSERT INTO students (id, name, email, family_type) VALUES (245678, 'Irene Miller', 'irene.miller@student.ateneo.edu', 'Wave');
INSERT INTO students (id, name, email, family_type) VALUES (251098, 'Jack Nelson', 'jack.nelson@student.ateneo.edu', 'Wave');
INSERT INTO students (id, name, email, family_type) VALUES (216543, 'Karen O''Connell', 'karen.oconnell@student.ateneo.edu', 'Wave');
INSERT INTO students (id, name, email, family_type) VALUES (227890, 'Leo Perez', 'leo.perez@student.ateneo.edu', 'Wave');
INSERT INTO students (id, name, email, family_type) VALUES (231234, 'Maria Quinn', 'maria.quinn@student.ateneo.edu', 'Wave');
INSERT INTO students (id, name, email, family_type) VALUES (248765, 'Nathan Ross', 'nathan.ross@student.ateneo.edu', 'Wave');

-- Queries for the Leaf family
INSERT INTO students (id, name, email, family_type) VALUES (253456, 'Olivia Scott', 'olivia.scott@student.ateneo.edu', 'Leaf');
INSERT INTO students (id, name, email, family_type) VALUES (219087, 'Peter Taylor', 'peter.taylor@student.ateneo.edu', 'Leaf');
INSERT INTO students (id, name, email, family_type) VALUES (225678, 'Quincy Uy', 'quincy.uy@student.ateneo.edu', 'Leaf');
INSERT INTO students (id, name, email, family_type) VALUES (230123, 'Rachel Vazquez', 'rachel.vazquez@student.ateneo.edu', 'Leaf');
INSERT INTO students (id, name, email, family_type) VALUES (246789, 'Sam Wong', 'sam.wong@student.ateneo.edu', 'Leaf');
INSERT INTO students (id, name, email, family_type) VALUES (254321, 'Tina Young', 'tina.young@student.ateneo.edu', 'Leaf');
INSERT INTO students (id, name, email, family_type) VALUES (212345, 'Ursula Zhao', 'ursula.zhao@student.ateneo.edu', 'Leaf');

-- Queries for the Shock family
INSERT INTO students (id, name, email, family_type) VALUES (224567, 'Victor Adams', 'victor.adams@student.ateneo.edu', 'Shock');
INSERT INTO students (id, name, email, family_type) VALUES (237890, 'Wendy Brown', 'wendy.brown@student.ateneo.edu', 'Shock');
INSERT INTO students (id, name, email, family_type) VALUES (249012, 'Xavier Cooper', 'xavier.cooper@student.ateneo.edu', 'Shock');
INSERT INTO students (id, name, email, family_type) VALUES (258765, 'Yvonne Green', 'yvonne.green@student.ateneo.edu', 'Shock');
INSERT INTO students (id, name, email, family_type) VALUES (211234, 'Zachary Hall', 'zachary.hall@student.ateneo.edu', 'Shock');
INSERT INTO students (id, name, email, family_type) VALUES (222345, 'Brenda Rivera', 'brenda.rivera@student.ateneo.edu', 'Shock');
INSERT INTO students (id, name, email, family_type) VALUES (233456, 'Daniel Lopez', 'daniel.lopez@student.ateneo.edu', 'Shock');
