export function welcomeMessage() {
  return 'OD Labs Payload Generator'
}

export function successMessage(projectName: string) {
  return `
Project created successfully!

Next steps:

cd ${projectName}
pnpm dev
`
}
