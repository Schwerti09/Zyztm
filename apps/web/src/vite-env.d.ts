/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_YOUTUBE_CHANNEL_ID: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
