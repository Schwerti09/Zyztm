-- Tool Usage Tracking Table
-- Tracks daily usage of tools per user for enforcing limits

CREATE TABLE IF NOT EXISTS tool_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  tool_name TEXT NOT NULL,
  usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
  usage_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, tool_name, usage_date)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_date ON tool_usage(user_id, usage_date);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_date ON tool_usage(tool_name, usage_date);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_tool_usage_updated_at
  BEFORE UPDATE ON tool_usage
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment tool usage
CREATE OR REPLACE FUNCTION increment_tool_usage(
  p_user_id UUID,
  p_tool_name TEXT
) RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  INSERT INTO tool_usage (user_id, tool_name, usage_count)
  VALUES (p_user_id, p_tool_name, 1)
  ON CONFLICT (user_id, tool_name, usage_date)
  DO UPDATE SET
    usage_count = tool_usage.usage_count + 1,
    updated_at = NOW()
  RETURNING usage_count;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get daily usage count
CREATE OR REPLACE FUNCTION get_tool_usage(
  p_user_id UUID,
  p_tool_name TEXT
) RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(
    (SELECT usage_count FROM tool_usage 
     WHERE user_id = p_user_id 
     AND tool_name = p_tool_name 
     AND usage_date = CURRENT_DATE),
    0
  );
END;
$$ LANGUAGE plpgsql;
