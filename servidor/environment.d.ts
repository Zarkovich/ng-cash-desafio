declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CRYPTO_KET: string;
    }
  }
}

export {};
