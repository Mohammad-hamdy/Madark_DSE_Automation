const testData = {
  user: {
    username: "admin@example.com",
    password: "Admin@123!",
  },
  application: {
    madarkApplicationId: "08a05640-dcc4-4b9d-a318-4d90c95ae4fd",
    applicationId: "08a05640-dcc4-4b9d-a318-4d90c95ae4fd",
  },
  evaluate: {
    amlFraud: {
      fullName: "Khalid Al-Saud",
      idNumber: "1893550247",
      idType: "Saudi",
      dateOfBirth: "1995-06-15",
      idExpiryDate: "2099-12-31",
      gender: "Male",
      nationality: "Saudi",
      requestedFinanceAmount: 10000,
      selectedTenureMonths: 12,
      deviceFingerprint: "fp-postman-479",
      focalResponse: {
        severity: "Low",
        scenarioFlags: [],
        ipVpnRisk: "Low",
      },
      focalApiAvailable: true,
      focalResponseValid: true,
    },
    kycEligibility: {},
    salary: {},
    simah: {},
  },
};

export default testData;
