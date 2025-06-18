# Digital Twin IIITH

A modern dashboard for monitoring and simulating digital twin systems.

## Features

- Real-time monitoring of sensor data
- Interactive map view of sensor nodes
- ThingSpeak integration for IoT data
- Simulation capabilities for testing scenarios
- Dark/Light mode with modern UI
- Admin account management

## Development

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Deployment

This project is set up for continuous deployment. Any changes pushed to the main branch will automatically be deployed.

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

```bash
# Manual deployment command
npm run deploy
```

### Live Demo

The live version of the application is available at:
[https://digital-tw-in-iiith-n9hi2gde7-theccbussiness-gmailcoms-projects.vercel.app](https://digital-tw-in-iiith-n9hi2gde7-theccbussiness-gmailcoms-projects.vercel.app)

## Continuous Deployment

This project is configured to automatically deploy when changes are pushed to GitHub. The deployment pipeline:

1. Automatically builds and tests the application when code is pushed
2. Deploys successful builds to production
3. Creates preview deployments for pull requests

See the [GitHub Actions workflow](.github/workflows/ci.yml) for CI configuration.