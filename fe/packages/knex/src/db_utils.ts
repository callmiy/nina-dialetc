import Knex from "knex";

export function makeTimestampsColumns(
  knex: Knex,
  table: Knex.CreateTableBuilder,
  tableName: string
) {
  table.timestamp("inserted_at", { useTz: false, precision: 1 });
  table.timestamp("updated_at", { useTz: false, precision: 1 });

  return [
    knex.raw(
      `
    ALTER TABLE ${tableName}
    ALTER COLUMN inserted_at TYPE timestamp(0);
    `.trim()
    ),
    knex.raw(
      `
    ALTER TABLE ${tableName}
    ALTER COLUMN updated_at TYPE timestamp(0);
    `.trim()
    ),
    knex.raw(
      `
    ALTER TABLE ${tableName}
    ALTER COLUMN inserted_at SET NOT NULL ,
    ALTER COLUMN updated_at SET NOT NULL,
    ALTER COLUMN inserted_at SET DEFAULT timezone('utc', now()),
    ALTER COLUMN updated_at SET DEFAULT timezone('utc', now());
    `.trim()
    ),
  ];
}

export type MAKE_TIMESTAMPS_COLUMNS = ReturnType<
  typeof makeTimestampsColumns
>;
