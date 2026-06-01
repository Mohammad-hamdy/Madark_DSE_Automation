export const DSEServiceCodes = {
  // Auth
  invalidCredentials: "DSE-AUTH-INVCRED",
  tokenExpired: "DSE-AUTH-TOKENEXP",
  unauthorized: "DSE-AUTH-UNAUTH",

  // Application
  applicationNotFound: "DSE-APP-NF",
  applicationAlreadyExists: "DSE-APP-AE",

  // Risk Engine - Parameters
  stepNotFound: "DSE-RE-STEPNF",
  invalidStepName: "DSE-RE-INVSTEP",

  // Risk Engine - Evaluate
  evaluationFailed: "DSE-RE-EVFAIL",
  missingRequiredParameters: "DSE-RE-MISSPARAMS",
  applicationIdRequired: "DSE-RE-APPIDREQ",

  // General
  internalServerError: "DSE-GE-INSE",
  validationError: "DSE-GE-VALDERR",
} as const;
