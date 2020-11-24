CREATE TABLE "access_level" (
  id serial PRIMARY KEY,
  name varchar(120),
  level int
);

CREATE TABLE "user" (
  id serial PRIMARY KEY, 
  username varchar(120),
  password varchar(1000),
  registered_as INT,
  access_level_id INT REFERENCES "access_level",
  first_name varchar(120),
  last_name varchar(120),
  phone varchar(20),
  email varchar(500),
  address varchar(500),
  job_title varchar(120),
  osha_level INT,
  subcontractor_certifications text,
  job_status boolean,
  vendor_company text
);

CREATE TABLE "job" (
  id serial PRIMARY KEY,
  description text,
  job_address varchar(500),
  job_creator_id INT REFERENCES "user"
);

CREATE TABLE "user_job" (
  id serial PRIMARY KEY, 
  user_id INT REFERENCES "user",
  job_id INT REFERENCES "job"  
);

INSERT INTO "access_level" (level, name) VALUES
( 1 , 'UNVERIFIED'),
( 2 , 'SUBCONTRACTOR'),
( 3 , 'VENDOR'),
( 4 , 'ADMIN');
