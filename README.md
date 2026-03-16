# OD Labs Payload CMS Template CLI

![Admin Dashboard Preview](https://github.com/ZNAXNOR/odlabs-payloadcms-whitelabel/blob/main/media/admin-dash.png)

![npm](https://img.shields.io/npm/v/create-odlabs-payload)

An internal tool for **OD Labs** to quickly bootstrap new Payload CMS projects pre-configured with our premium white-label branding, customized UI, and optimized developer experience.

## Quick Start

The easiest way to start a new project is using `npx` (which runs the CLI without installing it permanently):

```bash
npx create-odlabs-payload

  # Or use the npm init shorthand:

npm init odlabs-payload
```

### Global Installation (Optional)

If you prefer to install it globally:

```bash
pnpm add -g create-odlabs-payload

  # or

npm install -g create-odlabs-payload

  # Then run:

create-odlabs-payload
```

## Setup Process

1. **Project Name**: Enter the name of your new directory.
2. **Database URI**: Provide your PostgreSQL connection string.
3. **Wait**: The CLI will download the latest `whitelabel` template, configure your environment, and install dependencies.

## Project Structure

The generated project follows the standard Payload CMS structure but with our custom refinements in:

- `src/graphics/`: Custom Logo and Icon components.
- `src/components/BeforeDashboard/`: Personalized dashboard with glassmorphism.

## Features

- **OD Labs Branding**: Pre-configured logo, icons, and theme colors.
- **Glassmorphism UI**: A modern, premium admin dashboard experience.
- **Optimized Layout**: Refined sidebar and dashboard visuals for better usability.
- **Seed Data**: Built-in "OD Labs" seed data to get started immediately.
- **Streamlined Setup**: Automatic environment variable configuration and dependency installation.

## License

This project is licensed under the [MIT License](LICENSE).

---

&copy; 2026 OD Labs. Internal use only.
