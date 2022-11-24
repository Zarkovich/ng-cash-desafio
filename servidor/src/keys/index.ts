import dotenv from "dotenv";

dotenv.config();

const key = {
  crypto_key: process.env.CRYPTO_KET,
};

export default key;
