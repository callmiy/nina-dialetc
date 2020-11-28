/* eslint-disable @typescript-eslint/no-explicit-any */
import Knex from "knex";
import { Ulid } from "id128";

const countriesTableName = "countries";
const credentialsTableName = 'auths'

export const up = async function (knex: Knex) {
  const sql = `
    CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = timezone('utc'::text, now());
      RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- COUNTRY

    CREATE TABLE ${countriesTableName} (
      id uuid NOT NULL,
      name character varying(25) NOT NULL,
      code character varying(2) NOT NULL,
      curr_name character varying(100) NOT NULL,
      curr_code character varying(3) NOT NULL,
      inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    ALTER TABLE ${countriesTableName}
      ADD CONSTRAINT ${countriesTableName}_pkey PRIMARY KEY (id);

    ALTER TABLE ${countriesTableName}
      ADD CONSTRAINT ${countriesTableName}_code_index UNIQUE (code);

    ALTER TABLE ${countriesTableName}
      ADD CONSTRAINT ${countriesTableName}_code_curr_code_index UNIQUE (code, curr_code);

    CREATE TRIGGER ${countriesTableName}_update_updated_at_timestamp
      BEFORE UPDATE
      ON ${countriesTableName}
      FOR EACH ROW
      WHEN (
       NEW.updated_at = OLD.updated_at
      )
      EXECUTE PROCEDURE update_updated_at_timestamp();


    -- AUTHS

    CREATE TABLE ${credentialsTableName} (
      id uuid NOT NULL,
      email character varying(255) NOT NULL,
      inserted_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
      updated_at timestamp(0) without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    ALTER TABLE ${credentialsTableName}
      ADD CONSTRAINT ${credentialsTableName}_pkey PRIMARY KEY (id);

    ALTER TABLE ${credentialsTableName}
      ADD CONSTRAINT ${credentialsTableName}_email_index UNIQUE (email);

    CREATE TRIGGER ${credentialsTableName}_update_updated_at_timestamp
      BEFORE UPDATE
      ON ${credentialsTableName}
      FOR EACH ROW
      WHEN (
       NEW.updated_at = OLD.updated_at
      )
      EXECUTE PROCEDURE update_updated_at_timestamp();
  `;

  await knex.raw(sql);

  const data = [
    {
      name: "Germany",
      code: "DE",
      curr_name: "Euro",
      curr_code: "EUR",
    },
    {
      name: "France",
      code: "FR",
      curr_name: "Euro",
      curr_code: "EUR",
    },
  ];

  data.forEach((d) => {
    const id = Ulid.generate().toRaw();
    (d as any).id = id;
  });

  try {
    await knex(countriesTableName).insert(data);
  } catch (error) {
    console.error(error);
  }
};

export const down = async function (knex: Knex) {
  const sql = `
    DROP TABLE ${countriesTableName};
    DROP TABLE ${credentialsTableName};
  `;

  await knex.raw(sql);
};
