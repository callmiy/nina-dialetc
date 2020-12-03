/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS post_codes (
  id uuid NOT NULL
  ,country_id uuid NOT NULL REFERENCES countries (id) ON DELETE CASCADE
  ,post_code character varying(20) NOT NULL
  ,city character varying(255) NOT NULL
  ,state character varying(255) NOT NULL
  ,inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
  ,CONSTRAINT post_codes_pkey PRIMARY KEY (id)
  ,CONSTRAINT post_codes_post_code_city_state_index UNIQUE (post_code, city, state)
);

CREATE TRIGGER post_codes_update_updated_at_timestamp
  BEFORE UPDATE
  ON post_codes
  FOR EACH ROW
  WHEN (
   NEW.updated_at = OLD.updated_at
  )
  EXECUTE PROCEDURE update_updated_at_timestamp();
