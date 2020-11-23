CREATE TABLE "user" (
  id serial PRIMARY KEY, 
  username varchar(120),
  password varchar(1000),
  access_level_id INT REFERENCES "access_level",
  first_name varchar(120),
  last_name varchar(120),
  subcontractor_job_title_id INT REFERENCES "job_title",
  subcontractor_osha_level_id INT REFERENCES "osha_level",
  subcontractor_certifications text,
  job_status boolean,
  vendor_company text
);

CREATE TABLE "access_level" (
  id serial PRIMARY KEY,
  name varchar(120),
  level int
);

CREATE TABLE "job_title" (
  id serial PRIMARY KEY,
  title varchar(120)
);

CREATE TABLE "osha_level" (
  id serial PRIMARY KEY,
  level int
);

CREATE TABLE "job_person" (
  id serial PRIMARY KEY,
  job_id INT REFERENCES "job",
  person_id INT REFERENCES "user"
);

CREATE TABLE "job_location" (
  id serial PRIMARY KEY,
  job_id INT REFERENCES "job",
  location_id INT REFERENCES "location"
);

CREATE TABLE "job" (
  id serial PRIMARY KEY,
  job_creater_id INT REFERENCES "user"
);

CREATE TABLE "phone" (
  id serial PRIMARY KEY,
  phone_number int,
  user_id INT REFERENCES "user"
);

CREATE TABLE "email" (
  id serial PRIMARY KEY,
  email_address varchar,
  user_id INT REFERENCES "user"
);

CREATE TABLE "location" (
  id serial PRIMARY KEY,
  address varchar,
  user_id INT REFERENCES "user",
  job_id INT REFERENCES "job"
);  

INSERT INTO "access_level" (level) VALUES
( 1 ),
( 2 ),
( 3 ),
( 4 );

INSERT INTO "job_title" (title) VALUES
( 'helper' ),
( 'welder' ),
( 'fitter' );
