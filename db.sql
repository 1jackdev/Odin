\echo 'Delete and recreate cool_with_whatever db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS cool_with_whatever;
CREATE DATABASE cool_with_whatever;
\connect cool_with_whatever

\i db-schema.sql

\echo 'Delete and recreate cool_with_whatever_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE IF EXISTS cool_with_whatever_test;
CREATE DATABASE cool_with_whatever_test;
\connect cool_with_whatever_test

\i db-schema.sql