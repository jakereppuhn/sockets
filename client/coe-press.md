# Coe Press ERP

## Initial Steps

[] Get all code to GitHub
[] Build CI/CD pipeline
[] Build proper folder structure for coesco

## Tech Stack

### Frontend

Web - React
Mobile - React Native
Desktop?

### Backend

OpenEdge ABL

### Infrastructure

AWS - This will allow us to scale as needed while only being charged for what we use. Over 250 services provided with uptime guarantee of 99.99% per region.

- EC2
- RDS (Relational Database Service)
- S3

### Other

Circle CI (CI/CD pipeline): Development -> Build -> Testing -> Deployment
Snyk (Look for package vulnerabilities)
Sonar (Look for faults & improper use of syntax in code)

Docker (containerization)

## Environments

- Development
- Production

Production should have blue - green deployment

## Folder Structure (Backend System)

/erp-backend/
│
├── /src/
│ ├── /auth/
│ ├── /inventory/
│ ├── /orders/
│ ├── /finance/
│ ├── /production/
│ ├── /sales/
│ ├── /marketing/
│ ├── /quality/
│ ├── /engineering/
│ ├── /service/
│ ├── /it/
│ └── /reports/
│ ├── /production-reports/
│ ├── /sales-reports/
│ ├── /marketing-reports/
│ ├── /quality-reports/
│ ├── /engineering-reports/
│ └── /service-reports/
│
├── /ui/
│ ├── /gui/
│ └── /chui/
│
├── /config/
├── /db/
├── /logs/
├── /scripts/
├── /tests/
└── README.md

## Non Negotiables

- 90% code coverage
- ZERO abbreviations
- Document everything
- Pull requests require 2 approvals
- If JavaScript is required, use TypeScript

## Technology Philosophies

- Yes before no
- Simplicity is genius
- Every second counts
- Master your craft
- Obsess with finding a better way
- Automate all the things
- We'll figure it out

## Questions for the Developer

What code are you changing?
What does the code that's already there do?
What changes did you make? Why?

## Ideas

[] Internal LLM (Large Language Model)
