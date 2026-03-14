# Contributing to OD Labs Payload Template CLI

Thank you for helping improve our internal bootstrapping tools!

## 🛠️ Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/odlabs-payloadcms-whitelabel.git
   cd odlabs-payloadcms-whitelabel
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run in development mode**:
   ```bash
   pnpm dev
   ```

4. **Build the project**:
   ```bash
   pnpm build
   ```

## 🧩 Templates

The CLI currently pulls from the `whitelabel` branch of `ZNAXNOR/OD-LABS-Payload`. If you want to update the template itself, you should make changes to that repository.

## 🚀 Releasing

To release a new version of the CLI:

1. Update the version in `package.json`.
2. Commit and push your changes.
3. Run `npm publish` (ensure you have the necessary permissions).

## 🛡️ Coding Standards

- Use TypeScript for all new features.
- Follow the existing project structure.
- Run `pnpm build` before submitting any changes to ensure everything compiles correctly.
