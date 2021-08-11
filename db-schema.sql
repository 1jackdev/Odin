CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
  );

CREATE TABLE selections (
  id SERIAL PRIMARY KEY,
  yelp_id TEXT NOT NULL,
  name TEXT NOT NULL,
  categories TEXT [],
  category_aliases TEXT [],
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE
  );