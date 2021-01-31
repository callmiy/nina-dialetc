SELECT
  p2.id
  ,p2.country_id
  ,p2.post_code
  ,p2.city
  ,p2.state
FROM
  UNNEST($1::uuid[]) AS cid
INNER JOIN LATERAL
  (
    SELECT
      id
      ,country_id
      ,post_code
      ,city
      ,state
    FROM
      post_codes AS p
    WHERE
      (country_id = cid)
    ORDER BY
      p.city ASC,
      p.id DESC
    LIMIT
      10
    OFFSET
      0
  ) AS p2
ON
  p2.country_id = cid
;
