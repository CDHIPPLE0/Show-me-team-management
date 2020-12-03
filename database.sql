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
  osha_level varchar(10),
  subcontractor_certifications text,
  job_status boolean,
  vendor_company text,
  is_selected boolean
);

CREATE TABLE "job" (
  id serial PRIMARY KEY,
  description text,
  job_address varchar(500),
  job_creator_id INT REFERENCES "user" ON DELETE CASCADE,
  start_date varchar(100),
  helpers_needed int,
  welders_needed int,
  fitters_needed int,
  date_created date not null default CURRENT_DATE,
  is_active boolean
);

CREATE TABLE "user_job" (
  id serial PRIMARY KEY,
  job_id INT REFERENCES "job"  ON DELETE CASCADE,
  user_id INT REFERENCES "user"  ON DELETE CASCADE
);


INSERT INTO "access_level" (level, name) VALUES
( 1 , 'UNVERIFIED'),
( 2 , 'SUBCONTRACTOR'),
( 3 , 'VENDOR'),
( 4 , 'ADMIN');

