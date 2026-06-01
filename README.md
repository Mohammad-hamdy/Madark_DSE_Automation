# Madark DSE API Automation

Automated API test suite for the **Madark Decision Support Engine (DSE)** — covering authentication and the risk-engine evaluation pipeline using [Playwright](https://playwright.dev/) and TypeScript.

---

## Table of Contents

- [What Is This Project?](#what-is-this-project)
- [What Is API Automation Testing?](#what-is-api-automation-testing)
- [How The Project Is Structured](#how-the-project-is-structured)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running The Tests](#running-the-tests)
- [Understanding The Tests](#understanding-the-tests)
  - [Auth Tests](#auth-tests)
  - [Risk Engine Tests](#risk-engine-tests)
- [Project Architecture Explained](#project-architecture-explained)
- [Test Tags](#test-tags)
- [Reports](#reports)

---

## What Is This Project?

The **Madark DSE** is a backend system (a set of APIs) that evaluates financial applications through a series of risk-assessment steps — such as AML fraud checks, KYC eligibility, employment/salary verification, and a final SIMAH credit bureau decision.

This project **automatically tests those APIs** to make sure they:

- Accept valid login credentials and return an authentication token.
- Return expected parameters for each risk step.
- Process evaluation requests for each step correctly.

Instead of testing by hand (opening a tool like Postman and clicking "Send" every time), this project does it **automatically** with a single command, and reports pass/fail for every scenario.

---

## What Is API Automation Testing?

An **API** (Application Programming Interface) is how software systems communicate with each other over the internet — similar to a waiter taking your order to the kitchen and bringing back the meal.

**Automation testing** means writing code that acts as the "customer", sends requests to those APIs, and checks that the responses are correct — without a human clicking anything.

Benefits:
- Runs hundreds of checks in seconds.
- Catches regressions (things that used to work but broke after a code change) instantly.
- Can run automatically on every code change through a CI/CD pipeline.

This project uses **Playwright** — a modern testing framework by Microsoft — and **TypeScript** (a strongly-typed version of JavaScript) to write those automated checks.

---

## How The Project Is Structured

```
Madark_DSE_Automation/
│
├── config/
│   └── config.ts               # Loads environment variables (API URL, credentials)
│
├── portals/
│   └── madark-dse-api/
│       ├── model/              # Request builders (Login, Evaluate, Application)
│       ├── resources/schema/   # JSON schemas used to validate API response shapes
│       ├── service/
│       │   └── DSEService.ts   # Main service class – all API calls live here
│       └── utils/
│           ├── constants/      # API endpoint paths, HTTP status codes, step names
│           ├── helper/         # Error handling utilities
│           └── schema/         # Schema validation helper
│
├── resources/
│   └── testing/
│       └── testData.ts         # Test input data (application IDs, etc.)
│
├── tests/
│   └── dse-apis/
│       ├── auth/
│       │   ├── login.spec.ts   # Tests for the Login endpoint
│       │   └── me.spec.ts      # Tests for the Mock Application endpoint
│       └── risk-engine/
│           ├── evaluate.spec.ts        # Tests for all 4 evaluation steps
│           └── get-parameters.spec.ts  # Tests for fetching step parameters
│
├── .env.testing.example        # Template – copy this to create your .env.testing file
├── playwright.config.ts        # Playwright configuration (timeouts, reporters, etc.)
├── package.json                # Project dependencies and run scripts
└── tsconfig.json               # TypeScript compiler configuration
```

> **Key idea:** Tests are in `tests/`, all the code that talks to the API is in `portals/madark-dse-api/service/`, and setup/config lives in `config/`. This separation makes the project easy to maintain.

---

## Prerequisites

Make sure the following are installed on your machine before you begin:

| Tool | Version | How To Check |
|------|---------|--------------|
| [Node.js](https://nodejs.org/) | v18 or newer | `node -v` |
| [npm](https://www.npmjs.com/) | v9 or newer | `npm -v` |
| Git | any | `git --version` |

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mohammad-hamdy/Madark_DSE_Automation.git
cd Madark_DSE_Automation

# 2. Install all dependencies
npm install

# 3. Install Playwright's internal components
npx playwright install
```

---

## Configuration

The project reads its settings from an environment file (`.env.testing`). This file is **not** committed to Git (it contains secrets), but an example template is provided.

**Step 1 — Create your environment file:**

```bash
# On Windows (PowerShell)
Copy-Item .env.testing.example .env.testing

# On macOS / Linux
cp .env.testing.example .env.testing
```

**Step 2 — Fill in your values** by opening `.env.testing` and editing:

```dotenv
BASE_API=https://your-madark-dse-api-url.com   # The URL of the DSE API server
DSE_USERNAME=your_username                       # Your login username
DSE_PASSWORD=your_password                       # Your login password
ENV=testing                                      # Environment name (keep as "testing")
LANGUAGE=en                                      # Language (keep as "en")
```

> **Important:** Never commit `.env.testing` to Git. It is already listed in `.gitignore` for your protection.

---

## Running The Tests

All commands are run from the project root folder (`Madark_DSE_Automation`).

| Command | What It Runs |
|---------|-------------|
| `npm test` | All tests |
| `npm run test:auth` | Auth tests only (Login + Mock Application) |
| `npm run test:params` | Risk Engine – Get Parameters tests only |
| `npm run test:evaluate` | Risk Engine – Evaluate steps tests only |

**Example:**

```bash
npm test
```

You will see live output in the terminal for every test, showing PASS ✓ or FAIL ✗.

---

## Understanding The Tests

### Auth Tests

Located in `tests/dse-apis/auth/`

| File | Purpose |
|------|---------|
| `login.spec.ts` | Sends a login request with valid credentials and checks that a token is returned. Also verifies that invalid credentials do **not** produce a token. |
| `me.spec.ts` | Logs in first, then creates a mock loan/financial application to be used in subsequent risk-engine tests. |

### Risk Engine Tests

Located in `tests/dse-apis/risk-engine/`

The risk engine processes a financial application through **4 sequential evaluation steps**:

| Step | Name | What It Checks |
|------|------|----------------|
| Step 1 | AML Fraud | Anti-Money Laundering / Fraud risk |
| Step 2 | KYC Eligibility | Know-Your-Customer identity checks |
| Step 3 | Sector Salary (Employment) | Employment and salary verification |
| Step 4 | SIMAH Bureau | Saudi credit bureau — final credit decision |

| File | Purpose |
|------|---------|
| `get-parameters.spec.ts` | For each step, calls the parameters endpoint and verifies a valid response is returned. These parameters define what inputs each evaluation step needs. |
| `evaluate.spec.ts` | For each step, submits an evaluation request and verifies the API responds successfully. |

**How a typical test works (step-by-step):**

1. **Login** — the test authenticates with the API and receives a token.
2. **Setup** — any required data (e.g., application IDs) is prepared.
3. **Action** — the test calls the API endpoint under test.
4. **Assertion** — the test checks the response (e.g., `expect(response.token).toBeDefined()`).

---

## Project Architecture Explained

### DSEService (`portals/madark-dse-api/service/DSEService.ts`)

This is the **central service class** — a single place containing every method that makes an API call. Tests import this class and call its methods rather than building raw HTTP requests themselves.

Benefits:
- If the API URL changes, you update it in one place.
- Tests stay clean and readable.

### Request Models (`portals/madark-dse-api/model/`)

These are **builder classes** that construct the JSON body sent with each request. Example:

```typescript
const payload = new LoginRequest()
  .setUsername("user@example.com")
  .setPassword("secret")
  .build();
```

This pattern ensures request objects are always valid and consistent.

### Constants (`portals/madark-dse-api/utils/constants/`)

Hard-coded values (like API paths and HTTP status codes) are placed in constants so they are never duplicated across the codebase:

- `api-end-point/` — all API URL path builders.
- `status-code/` — standard HTTP status codes (200, 401, etc.) and DSE service codes.
- `steps/` — the four risk-engine step identifiers (`aml-fraud`, `kyc-eligibility`, etc.).

### Configuration (`config/config.ts`)

Reads the `.env.testing` file at startup and exposes settings (API URL, credentials, environment name) to the rest of the project through a single `config` object.

---

## Test Tags

Every test is tagged so you can filter runs. Available tags:

| Tag | Description |
|-----|-------------|
| `@dse` | All tests in this project |
| `@auth` | Authentication tests |
| `@login` | Login-specific tests |
| `@me` | Mock application tests |
| `@riskEngine` | Risk engine tests |
| `@parameters` | Get-parameters tests |
| `@evaluate` | Evaluate-step tests |
| `@amlFraud` | Step 1 — AML Fraud |
| `@kycEligibility` | Step 2 — KYC Eligibility |
| `@sectorSalary` | Step 3 — Sector Salary |
| `@simahBureau` | Step 4 — SIMAH Bureau |
| `@negative` | Negative / failure scenario tests |

Run a specific tag:

```bash
npx playwright test --grep @login
```

---

## Reports

After each run, two reports are generated:

| Report | Location | Description |
|--------|----------|-------------|
| Terminal list | Console output | Live pass/fail output while tests run |
| JUnit XML | `test-results/junit-results.xml` | Machine-readable format for CI systems (Jenkins, GitHub Actions, etc.) |

To generate an HTML report instead:

```bash
npx playwright show-report
```
