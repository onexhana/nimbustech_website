/// <reference types="vite/client" />

declare global {
  interface Window {
    SmFormSettings: {
      loadForm: () => void;
    };
  }
}