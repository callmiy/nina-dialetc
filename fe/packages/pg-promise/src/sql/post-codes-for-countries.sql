SELECT
  id
  ,country_id
  ,post_code
  ,city
  ,state
FROM
  post_codes
AS
  p
WHERE
  p.country_id = ANY ($1::uuid[])
;
