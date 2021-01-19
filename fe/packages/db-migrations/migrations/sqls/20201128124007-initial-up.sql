CREATE EXTENSION IF NOT EXISTS CITEXT;

CREATE OR REPLACE FUNCTION commons_set_updated_at_timestamp_func()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql'
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
-- CREATE `tags` table
--
CREATE TABLE IF NOT EXISTS
  tags (
    id UUID
      NOT NULL
    ,owner_id UUID
      NOT NULL
      REFERENCES owners (owner_id)
      ON DELETE CASCADE
    ,name CITEXT
      NOT NULL
    ,CONSTRAINT tags_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT tags_owner_id_name_index
      UNIQUE (
        owner_id
        ,name
      )
  )
;

--
-- CREATE `comments` table
--
CREATE TABLE IF NOT EXISTS
  comments (
    id UUID
      NOT NULL
    ,owner_id UUID
      NOT NULL
      REFERENCES owners (owner_id)
      ON DELETE CASCADE
    ,text CITEXT
      NOT NULL
    ,CONSTRAINT comments_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT comments_owner_id_name_index
      UNIQUE (
        owner_id
        ,text
      )
  )
;

--
-- CREATE `unit_of_measures` table
--
CREATE TABLE IF NOT EXISTS
  unit_of_measures (
    id UUID
      NOT NULL
    ,owner_id UUID
      NOT NULL
      REFERENCES owners (owner_id)
      ON DELETE CASCADE
    ,short_name CITEXT
      NOT NULL
    ,long_name CHARACTER VARYING(255)
    ,CONSTRAINT unit_of_measures_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT unit_of_measures_owner_id_short_name_index
      UNIQUE (
        owner_id
        ,short_name
      )
  )
;

--
-- CREATE unit_of_measures_tags_xref: cross between `unit_of_measures`
-- and `tags` tables
--
CREATE TABLE IF NOT EXISTS
  unit_of_measures_tags_xref (
    unit_of_measure_id UUID
      NOT NULL
      REFERENCES unit_of_measures (id)
      ON DELETE CASCADE
    ,tag_id UUID
      NOT NULL
      REFERENCES tags (id)
      ON DELETE CASCADE
    ,CONSTRAINT unit_of_measures_tags_xref_pkey
      PRIMARY KEY (
        unit_of_measure_id
        ,tag_id
      )
  )
;

--
-- CREATE unit_of_measures_comments_xref: cross between `unit_of_measures`
-- and `comments` tables
--
CREATE TABLE IF NOT EXISTS
  unit_of_measures_comments_xref (
    unit_of_measure_id UUID
      NOT NULL
      REFERENCES unit_of_measures (id)
      ON DELETE CASCADE
    ,comment_id UUID
      NOT NULL
      REFERENCES comments (id)
      ON DELETE CASCADE
    ,CONSTRAINT unit_of_measures_comments_xref_pkey
      PRIMARY KEY (
        unit_of_measure_id
        ,comment_id
      )
  )
;

--
-- CREATE `brands` table
--
CREATE TABLE IF NOT EXISTS
  brands (
    id UUID
      NOT NULL
    ,owner_id UUID
      NOT NULL
      REFERENCES owners (owner_id)
      ON DELETE CASCADE
    ,name CITEXT
      NOT NULL
    ,phone CHARACTER VARYING(50)
    ,country_id UUID
      NOT NULL
      REFERENCES countries (id)
      ON DELETE CASCADE
    ,currency_id UUID
      NOT NULL
      REFERENCES currencies (id)
      ON DELETE CASCADE
    ,inserted_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'utc'::text
        ,now()
      )
      NOT NULL
    ,updated_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'utc'::text
        ,now()
      )
      NOT NULL
    ,CONSTRAINT brands_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT brands_owner_id_name
      UNIQUE (
        owner_id
        ,name
      )
  )
;

--
-- CREATE brands_tags_xref: cross between `brands`
-- and `tags` tables
--
CREATE TABLE IF NOT EXISTS
  brands_tags_xref (
    brand_id UUID
      NOT NULL
      REFERENCES brands (id)
      ON DELETE CASCADE
    ,tag_id UUID
      NOT NULL
      REFERENCES tags (id)
      ON DELETE CASCADE
    ,CONSTRAINT brands_tags_xref_pkey
      PRIMARY KEY (
        brand_id
        ,tag_id
      )
  )
;

--
-- CREATE brands_comments_xref: cross between `brands`
-- and `comments` tables
--
CREATE TABLE IF NOT EXISTS
  brands_comments_xref (
    brand_id UUID
      NOT NULL
      REFERENCES brands (id)
      ON DELETE CASCADE
    ,comment_id UUID
      NOT NULL
      REFERENCES comments (id)
      ON DELETE CASCADE
    ,CONSTRAINT brands_comments_xref_pkey
      PRIMARY KEY (
        brand_id
        ,comment_id
      )
  )
;

--
-- TRIGGER SETS VALUE OF `updated_at` COLUMN OF `brands` TABLE
--
CREATE TRIGGER brands_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON brands
  FOR EACH ROW
  WHEN (
    NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

--
-- CREATE `branch_groups` table
--
CREATE TABLE IF NOT EXISTS
  branch_groups (
    id UUID
      NOT NULL
    ,owner_id UUID
      NOT NULL
      REFERENCES owners (owner_id)
      ON DELETE CASCADE
    ,name CITEXT
      NOT NULL
    ,brand_id UUID
      NOT NULL
      REFERENCES brands (id)
      ON DELETE CASCADE
    ,inserted_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'utc'::text
        ,now()
      )
      NOT NULL
    ,updated_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'utc'::text
        ,now()
      )
      NOT NULL
    ,CONSTRAINT branch_groups_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT branch_groups_owner_id_brand_id_name
      UNIQUE (
        owner_id
        ,brand_id
        ,name
      )
  )
;

--
-- CREATE branch_groups_tags_xref: cross between `branch_groups`
-- and `tags` tables
--
CREATE TABLE IF NOT EXISTS
  branch_groups_tags_xref (
    branch_group_id UUID
      NOT NULL
      REFERENCES branch_groups (id)
      ON DELETE CASCADE
    ,tag_id UUID
      NOT NULL
      REFERENCES tags (id)
      ON DELETE CASCADE
    ,CONSTRAINT branch_groups_tags_xref_pkey
      PRIMARY KEY (
        branch_group_id
        ,tag_id
      )
  )
;

--
-- CREATE branch_groups_comments_xref: cross between `branch_groups`
-- and `comments` tables
--
CREATE TABLE IF NOT EXISTS
  branch_groups_comments_xref (
    branch_group_id UUID
      NOT NULL
      REFERENCES branch_groups (id)
      ON DELETE CASCADE
    ,comment_id UUID
      NOT NULL
      REFERENCES comments (id)
      ON DELETE CASCADE
    ,CONSTRAINT branch_groups_comments_xref_pkey
      PRIMARY KEY (
        branch_group_id
        ,comment_id
      )
  )
;

--
-- TRIGGER SETS VALUE OF `updated_at` COLUMN OF `branch_groups` TABLE
--
CREATE TRIGGER branch_groups_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON branch_groups
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

--
-- FUNCTION COMPUTES VALUE OF `name` column of `branches` table
--
CREATE OR REPLACE FUNCTION branches_compute_name_func()
RETURNS TRIGGER AS $$
BEGIN
  if NEW.name IS NULL then
    NEW.name =
      LOWER(
        REPLACE(
          CONCAT(
            (
              SELECT
                name
              FROM
                brands
              JOIN
                branch_groups
              ON
                brands.id = branch_groups.brand_id
              WHERE
                branch_groups.id = NEW.group_id
            )
            ,'_'
            ,NEW.street
            ,'_'
            ,NEW.city
            ,'_'
            ,NEW.post_code
          )
          ,' '
          '_'
        )
      )
    ;
  END if;
  RETURN NEW;
END;
$$ language 'plpgsql'
;

--
-- CREATE `branches` table
--
CREATE TABLE IF NOT EXISTS
  branches (
    id UUID
      NOT NULL
    ,owner_id UUID
      NOT NULL
      REFERENCES owners (owner_id)
      ON DELETE CASCADE
    ,name CITEXT
      NOT NULL
    ,street CHARACTER VARYING(50)
      NOT NULL
    ,city CHARACTER VARYING(20)
      NOT NULL
    ,post_code CHARACTER VARYING(15)
      NOT NULL
    ,group_id UUID
      NOT NULL
      REFERENCES branch_groups (id)
      ON DELETE CASCADE
    ,inserted_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT timezone(
        'utc'::text
        ,now()
      )
      NOT NULL
    ,updated_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT timezone(
        'utc'::text
        ,now()
      )
      NOT NULL
    ,CONSTRAINT branches_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT branches_owner_id_group_id_id_name
      UNIQUE (
        owner_id
        ,group_id
        ,name
      )
  )
;

--
-- CREATE branches_tags_xref: cross between `branches`
-- and `tags` tables
--
CREATE TABLE IF NOT EXISTS
  branches_tags_xref (
    branch_id UUID
      NOT NULL
      REFERENCES branches (id)
      ON DELETE CASCADE
    ,tag_id UUID
      NOT NULL
      REFERENCES tags (id)
      ON DELETE CASCADE
    ,CONSTRAINT branches_tags_xref_pkey
      PRIMARY KEY (
        branch_id
        ,tag_id
      )
  )
;

--
-- CREATE branches_comments_xref: cross between `branches`
-- and `comments` tables
--
CREATE TABLE IF NOT EXISTS
  branches_comments_xref (
    branch_id UUID
      NOT NULL
      REFERENCES branches (id)
      ON DELETE CASCADE
    ,comment_id UUID
      NOT NULL
      REFERENCES comments (id)
      ON DELETE CASCADE
    ,CONSTRAINT branches_comments_xref_pkey
      PRIMARY KEY (
        branch_id
        ,comment_id
      )
  )
;

--
-- TRIGGER COMPUTES VALUE OF `name` column of `branches` table
--
CREATE TRIGGER branches_compute_name_trigger
  BEFORE INSERT OR UPDATE
  ON branches
  FOR EACH ROW
  EXECUTE PROCEDURE branches_compute_name_func()
;

--
-- TRIGGER SETS VALUE OF `updated_at` COLUMN OF `branches` TABLE
--
CREATE TRIGGER branches_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON branches
  FOR EACH ROW
  WHEN (
    NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

--
-- FUNCTION COMPUTES VALUE OF `current_price` for `article_infos` table
--
CREATE OR REPLACE FUNCTION article_infos_compute_current_price_func()
RETURNS TRIGGER AS $$
BEGIN
  if NEW.discount IS NULL then
    NEW.current_price = NEW.unit_price;
  else
    NEW.current_price = NEW.unit_price * NEW.discount;
  END if;
  RETURN NEW;
END;
$$ language 'plpgsql'
;

--
-- CREATE `article_infos` table
--
CREATE TABLE IF NOT EXISTS
  article_infos (
    id UUID
      NOT NULL
    ,unit_price NUMERIC(9,2)
      NOT NULL
    ,discount NUMERIC(5,4)
    ,current_price NUMERIC(9,2)
      NOT NULL
    ,branch_group_id UUID
      NOT NULL
      REFERENCES branch_groups (id)
      ON DELETE CASCADE
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
    ,CONSTRAINT article_infos_pkey
      PRIMARY KEY (id)
  )
;

--
-- CREATE article_infos_comments_xref: cross between `article_infos`
-- and `comments` tables
--
CREATE TABLE IF NOT EXISTS
  article_infos_comments_xref (
    article_info_id UUID
      NOT NULL
      REFERENCES article_infos (id)
      ON DELETE CASCADE
    ,comment_id UUID
      NOT NULL
      REFERENCES comments (id)
      ON DELETE CASCADE
    ,CONSTRAINT article_infos_comments_xref_pkey
      PRIMARY KEY (
        article_info_id
        ,comment_id
      )
  )
;

--
-- CREATE article_infos_tags_xref: cross between `article_infos` and `tags`
-- table
--
CREATE TABLE IF NOT EXISTS
  article_infos_tags_xref (
    article_info_id  UUID
      NOT NULL
      REFERENCES article_infos (id)
      ON DELETE CASCADE
    ,tag_id UUID
      NOT NULL
      REFERENCES tags (id)
      ON DELETE CASCADE
    ,CONSTRAINT article_infos__tags_xref_pkey
      PRIMARY KEY (
        article_info_id
        ,tag_id
      )
  )
;

--
-- TRIGGER SETS VALUE OF `updated_at` COLUMN OF `article_infos` TABLE
--
CREATE TRIGGER article_infos_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON article_infos
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

--
-- TRIGGER COMPUTES VALUE OF `current_price` for `article_infos` table
--
CREATE TRIGGER article_infos_compute_current_price_trigger
  BEFORE INSERT OR UPDATE
  ON article_infos
  FOR EACH ROW
  EXECUTE PROCEDURE article_infos_compute_current_price_func()
;


--
-- CREATE `articles` table
--
CREATE TABLE IF NOT EXISTS
  articles (
    id UUID
      NOT NULL
    ,owner_id UUID
      NOT NULL
      REFERENCES owners (owner_id)
      ON DELETE CASCADE
    ,name CITEXT
      NOT NULL
    ,article_id UUID
      REFERENCES articles (id)
      ON DELETE SET NULL
    ,inserted_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'utc'::text
        ,now()
      )
      NOT NULL
    ,updated_at TIMESTAMP(0) WITHOUT TIME ZONE
      DEFAULT TIMEZONE(
        'UTC'::TEXT
        ,NOW()
      )
      NOT NULL
    ,CONSTRAINT articles_pkey
      PRIMARY KEY (id)
    ,CONSTRAINT articles_owner_id_name_index
      UNIQUE (
        owner_id
        ,name
      )
  )
;

--
-- CREATE articles_tags_xref: cross between `articles` and `tags` tables
--
CREATE TABLE IF NOT EXISTS
  articles_tags_xref (
    article_id UUID
      NOT NULL
      REFERENCES articles (id)
      ON DELETE CASCADE
    ,tag_id uuid
      NOT NULL
      REFERENCES tags (id)
      ON DELETE CASCADE
    ,CONSTRAINT articles_tags_xref_pkey
      PRIMARY KEY (
        article_id
        ,tag_id
      )
  )
;

--
-- CREATE article_infos_articles_xref: cross between `article_infos` and
-- `articles` table
--
CREATE TABLE IF NOT EXISTS
  article_infos_articles_xref (
    article_info_id  UUID
      NOT NULL
      REFERENCES article_infos (id)
      ON DELETE CASCADE
    ,article_id UUID
      NOT NULL
      REFERENCES articles (id)
      ON DELETE CASCADE
    ,CONSTRAINT article_infos_articles_xref_pkey
      PRIMARY KEY (
        article_info_id
        ,article_id
      )
    ,CONSTRAINT article_infos_articles_xref_article_info_id
      UNIQUE (
        article_info_id
      )
  )
;

--
-- CREATE articles_comments_xref: cross between `articles`
-- and `comments` tables
--
CREATE TABLE IF NOT EXISTS
  articles_comments_xref (
    article_id UUID
      NOT NULL
      REFERENCES articles (id)
      ON DELETE CASCADE
    ,comment_id UUID
      NOT NULL
      REFERENCES comments (id)
      ON DELETE CASCADE
    ,CONSTRAINT articles_comments_xref_pkey
      PRIMARY KEY (
        article_id
        ,comment_id
      )
  )
;

--
-- TRIGGER SETS VALUE OF `updated_at` COLUMN OF `articles` TABLE
--
CREATE TRIGGER articles_set_updated_at_timestamp_trigger
  BEFORE UPDATE
  ON articles
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE commons_set_updated_at_timestamp_func()
;

--
-- INSERT DATA
--

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
