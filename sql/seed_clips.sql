-- Seed sample clips for development/staging so the gallery, TikTok wall,
-- and product hover-video previews show data without a running cron job.
-- Run once against your Postgres/Neon database (safe to re-run due to ON CONFLICT).

INSERT INTO clips (id, title, thumbnail, url, views, product_tag, source, tiktok_id, likes)
VALUES
  -- Gallery / YouTube clips
  (gen_random_uuid(), 'Nexus Fortnite Highlight #1',
   'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   12400, NULL, 'youtube', NULL, 0),

  (gen_random_uuid(), 'Bestes Spiel der Season – Nexus',
   'https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg',
   'https://www.youtube.com/watch?v=9bZkp7q19f0',
   8900, NULL, 'youtube', NULL, 0),

  (gen_random_uuid(), 'Nexus Kick Stream Clip',
   'https://i.ytimg.com/vi/kffacxfA7G4/mqdefault.jpg',
   'https://kick.com/nexus/clips/sample1',
   3200, NULL, 'kick', NULL, 0),

  -- Product hover-video clips (product_tag matches PRODUCTS[].tag)
  (gen_random_uuid(), 'Voice Synth Demo',
   'https://i.ytimg.com/vi/YR5ApYxkU-U/mqdefault.jpg',
   'https://www.youtube.com/watch?v=YR5ApYxkU-U',
   4500, 'voice', 'youtube', NULL, 0),

  (gen_random_uuid(), 'Nexus Bro in Aktion',
   'https://i.ytimg.com/vi/2vjPBrBU-TM/mqdefault.jpg',
   'https://www.youtube.com/watch?v=2vjPBrBU-TM',
   3100, 'ai', 'youtube', NULL, 0),

  (gen_random_uuid(), 'Legacy Card Pack Opening',
   'https://i.ytimg.com/vi/e-ORhEE9VVg/mqdefault.jpg',
   'https://www.youtube.com/watch?v=e-ORhEE9VVg',
   2800, 'cards', 'youtube', NULL, 0),

  (gen_random_uuid(), 'Soundboard Pack Preview',
   'https://i.ytimg.com/vi/CevxZvSJLk8/mqdefault.jpg',
   'https://www.youtube.com/watch?v=CevxZvSJLk8',
   1900, 'soundboard', 'youtube', NULL, 0),

  (gen_random_uuid(), 'Nexus Box Unboxing',
   'https://i.ytimg.com/vi/JGwWNGJdvx8/mqdefault.jpg',
   'https://www.youtube.com/watch?v=JGwWNGJdvx8',
   5600, 'box', 'youtube', NULL, 0),

  (gen_random_uuid(), 'Gaming Bundle Showcase',
   'https://i.ytimg.com/vi/kXYiU_JCYtU/mqdefault.jpg',
   'https://www.youtube.com/watch?v=kXYiU_JCYtU',
   7200, 'stream', 'youtube', NULL, 0),

  -- TikTok clips (source = 'tiktok')
  (gen_random_uuid(), 'Nexus TikTok – Fortnite Win',
   'https://www.tiktok.com/api/img/?itemId=7123456789012345678&location=0',
   'https://www.tiktok.com/@nexus/video/7123456789012345678',
   15000, NULL, 'tiktok', '7123456789012345678', 42),

  (gen_random_uuid(), 'Nexus TikTok – Epic Clutch',
   'https://www.tiktok.com/api/img/?itemId=7234567890123456789&location=0',
   'https://www.tiktok.com/@nexus/video/7234567890123456789',
   9800, NULL, 'tiktok', '7234567890123456789', 31),

  (gen_random_uuid(), 'Nexus TikTok – Stream Moment',
   'https://www.tiktok.com/api/img/?itemId=7345678901234567890&location=0',
   'https://www.tiktok.com/@nexus/video/7345678901234567890',
   6200, NULL, 'tiktok', '7345678901234567890', 18),

  (gen_random_uuid(), 'Nexus TikTok – Clip',
   'https://www.tiktok.com/api/img/?itemId=7605933988426943746&location=0',
   'https://www.tiktok.com/@nexus/video/7605933988426943746',
   0, NULL, 'tiktok', '7605933988426943746', 0)
ON CONFLICT (url) DO NOTHING;
