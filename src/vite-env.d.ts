/// <reference types="vite/client" />

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_BACKED: string;
  readonly VITE_AUTH: string;
  readonly VITE_USER: string;
  readonly VITE_GROUP: string;
  readonly VITE_MESSAGE: string;
  readonly VITE_CLOUDINARY: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
