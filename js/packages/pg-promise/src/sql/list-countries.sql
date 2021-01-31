SELECT
  id
  ,country_name
  ,country_code
--  ,inserted_at
FROM
  countries
AS
  c
ORDER BY
  country_name
  ,country_code
LIMIT
  $1
OFFSET
  $2
;
