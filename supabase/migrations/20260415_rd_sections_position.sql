-- Add ordering support to rd_sections
ALTER TABLE rd_sections ADD COLUMN IF NOT EXISTS position integer NOT NULL DEFAULT 0;

-- Initialize positions in alphabetical order so existing data gets stable ordering
UPDATE rd_sections
SET position = sub.rn
FROM (
  SELECT id, (ROW_NUMBER() OVER (ORDER BY name) - 1) AS rn
  FROM rd_sections
) sub
WHERE rd_sections.id = sub.id;
