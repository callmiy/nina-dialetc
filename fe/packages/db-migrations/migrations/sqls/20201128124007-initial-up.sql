CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- CURRENCY

CREATE TABLE currencies (
  id uuid NOT NULL
  ,currency_name character varying(100) NOT NULL
  ,currency_code character varying(3) NOT NULL
  ,inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,CONSTRAINT currencies_pkey PRIMARY KEY (id)
);

-- COUNTRY

CREATE TABLE countries (
  id uuid NOT NULL
  ,country_name character varying(25) NOT NULL
  ,country_code character varying(2) NOT NULL
  ,inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,CONSTRAINT countries_pkey PRIMARY KEY (id)
  ,CONSTRAINT countries_country_code_index UNIQUE (country_code)
);


CREATE TRIGGER countries_update_updated_at_timestamp
  BEFORE UPDATE
  ON countries
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE update_updated_at_timestamp();

-- CURRENCY + COUNTRY

CREATE TABLE countries_currencies (
  country_id  uuid REFERENCES countries (id) ON DELETE CASCADE
  ,currency_id uuid REFERENCES currencies (id) ON DELETE CASCADE
  ,CONSTRAINT countries_currencies_pkey PRIMARY KEY (country_id, currency_id)
);

-- AUTHS

CREATE TABLE auths (
  id uuid NOT NULL
  ,email character varying(255) NOT NULL
  ,inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,CONSTRAINT auths_pkey PRIMARY KEY (id)
  ,CONSTRAINT auths_email_index UNIQUE (email)
);

CREATE TRIGGER auths_update_updated_at_timestamp
  BEFORE UPDATE
  ON auths
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE update_updated_at_timestamp();

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
--  ,(
--    '017618D4A8268D3412E026EE965874F2'
--    ,'France'
--    ,'FR'
--  )
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
--  ,(
--    '017618D4A8268D3412E026EE965874F2'
--    ,'01761BD1CBE47E7C8B789DD46D2899DD'
--  )
;
