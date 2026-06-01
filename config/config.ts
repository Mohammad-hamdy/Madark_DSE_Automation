import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import "module-alias/register";

function loadConfig() {
  const envFile = process.env.ENV ? `.env.${process.env.ENV}` : ".env.testing";
  const envPath = path.resolve(__dirname, `../${envFile}`);
  console.log(`Loading environment variables from: ${envPath}`);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  } else {
    console.error(`.env file not found at: ${envPath}`);
  }
}

function loadTestData(): Record<string, any> {
  const env = process.env.ENV || "testing";
  const testDataPath = path.resolve(__dirname, `../resources/${env}/testData.ts`);
  console.log(`Loading test data from: ${testDataPath}`);
  try {
    return require(testDataPath).default;
  } catch (error: any) {
    console.error(`Failed to load test data: ${error.message}`);
    return {};
  }
}

const getTestData = loadTestData();

const config = {
  apiUrl: process.env.BASE_API || "",
  dseUsername: process.env.DSE_USERNAME || "",
  dsePassword: process.env.DSE_PASSWORD || "",
  environment: process.env.ENV || "testing",
  language: process.env.LANGUAGE || "en",
};

export default {
  loadConfig,
  config,
  getTestData,
};
