CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- COUNTRY

CREATE TABLE countries (
  id uuid NOT NULL,
  name character varying(25) NOT NULL,
  code character varying(2) NOT NULL,
  curr_name character varying(100) NOT NULL,
  curr_code character varying(3) NOT NULL,
  inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE countries
  ADD CONSTRAINT countries_pkey PRIMARY KEY (id);

ALTER TABLE countries
  ADD CONSTRAINT countries_code_index UNIQUE (code);

ALTER TABLE countries
  ADD CONSTRAINT countries_code_curr_code_index UNIQUE (code, curr_code);

CREATE TRIGGER countries_update_updated_at_timestamp
  BEFORE UPDATE
  ON countries
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE update_updated_at_timestamp();


-- AUTHS

CREATE TABLE auths (
  id uuid NOT NULL,
  email character varying(255) NOT NULL,
  inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE auths
  ADD CONSTRAINT auths_pkey PRIMARY KEY (id);

ALTER TABLE auths
  ADD CONSTRAINT auths_email_index UNIQUE (email);

CREATE TRIGGER auths_update_updated_at_timestamp
  BEFORE UPDATE
  ON auths
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE update_updated_at_timestamp();

INSERT INTO countries
  (
    id,
    name,
    code,
    curr_name,
    curr_code
  )
VALUES
  (
    '017618D2C667578D7BBA81D33F1307B2',
    'Germany',
    'DE',
    'Euro',
    'EUR'
  ),
  (
    '017618D4A8268D3412E026EE965874F2',
    'France',
    'FR',
    'Euro',
    'EUR'
  )
;
