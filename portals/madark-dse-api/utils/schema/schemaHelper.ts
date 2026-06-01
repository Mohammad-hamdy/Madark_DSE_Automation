import { expect } from "@playwright/test";
import Ajv from "ajv";
import path from "path";
import fs from "fs";

export async function validateJsonSchema(fileName: string, body: object) {
  const jsonName = `${fileName}_Schema.json`;
  const schemaPath = path.resolve(
    __dirname,
    `../../resources/schema/${jsonName}`
  );

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found: ${schemaPath}`);
  }

  const existingSchema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));

  const ajv = new Ajv({ allErrors: false });
  const validate = ajv.compile(existingSchema);
  const validRes = validate(body);

  if (!validRes) {
    console.log(
      "SCHEMA ERRORS:",
      JSON.stringify(validate.errors),
      "\nRESPONSE BODY:",
      JSON.stringify(body)
    );
  }

  expect(validRes).toBe(true);
}
