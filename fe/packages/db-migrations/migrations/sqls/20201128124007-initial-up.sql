CREATE OR REPLACE FUNCTION commons_set_updated_at_timestamp_func()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql'
;

-- CURRENCY

CREATE TABLE IF NOT EXISTS
  currencies (
    id UUID
      NOT NULL
    ,currency_name CHARACTER VARYING(100)
      NOT NULL
    ,currency_code CHARACTER VARYING(3)
      NOT NULL
    ,inserted_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'UTC'::TEXT
        ,NOW()
      )
      NOT NULL
    ,updated_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'UTC'::TEXT
        ,NOW()
      )
      NOT NULL
    ,CONSTRAINT currencies_pkey
      PRIMARY KEY (id)
  )
;

CREATE TRIGGER currencies_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON currencies
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

-- COUNTRY

CREATE TABLE IF NOT EXISTS
  countries (
    id UUID
      NOT NULL
    ,country_name CHARACTER VARYING(25)
      NOT NULL
    ,country_code CHARACTER VARYING(2)
      NOT NULL
    ,inserted_at timestamp(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'UTC'::TEXT
        ,NOW()
      )
      NOT NULL
    ,updated_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'UTC'::TEXT
        ,NOW()
      )
      NOT NULL
    ,CONSTRAINT countries_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT countries_country_code_index
      UNIQUE (
        country_code
      )
  )
;


CREATE TRIGGER countries_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON countries
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

-- CURRENCY + COUNTRY

CREATE TABLE IF NOT EXISTS
  countries_currencies (
    country_id  UUID
      REFERENCES countries (id)
      ON DELETE CASCADE
      NOT NULL
    ,currency_id UUID
      REFERENCES currencies (id)
      ON DELETE CASCADE
      NOT NULL
    ,CONSTRAINT countries_currencies_pkey
      PRIMARY KEY (
        country_id
        ,currency_id
      )
  )
;

--
-- CREATE `owners` table
--
CREATE TABLE IF NOT EXISTS
  owners (
    owner_id UUID
      NOT NULL
    ,email CHARACTER VARYING(255)
      NOT NULL
          ,inserted_at timestamp(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'UTC'::TEXT
        ,NOW()
      )
      NOT NULL
    ,updated_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'UTC'::TEXT
        ,NOW()
      )
      NOT NULL
    ,CONSTRAINT owners_pkey
      PRIMARY KEY (owner_id)
    ,CONSTRAINT owners_email_index
      UNIQUE (email)
  )
;

--
-- TRIGGER on `owners` table that sets value of the `updated_at` column
--
CREATE TRIGGER owners_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON owners
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

INSERT INTO currencies
  (
    id
    ,currency_name
    ,currency_code
  )
VALUES
  (
    '01761BD1CBE47E7C8B789DD46D2899DD'
    ,'Euro'
    ,'EUR'
  )
;

INSERT INTO countries
  (
    id
    ,country_name
    ,country_code
  )
VALUES
  (
    '017618D2C667578D7BBA81D33F1307B2'
    ,'Germany'
    ,'DE'
  )
  ,(
    '017618D4A8268D3412E026EE965874F2'
    ,'France'
    ,'FR'
  )
;

INSERT INTO countries_currencies
  (
    country_id
    ,currency_id
  )
VALUES
  (
    '017618D2C667578D7BBA81D33F1307B2'
    ,'01761BD1CBE47E7C8B789DD46D2899DD'
  )
  ,(
    '017618D4A8268D3412E026EE965874F2'
    ,'01761BD1CBE47E7C8B789DD46D2899DD'
  )
;
