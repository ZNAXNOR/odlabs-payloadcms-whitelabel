import fs from 'fs-extra'
import path from 'path'
import { generateSecret } from './generate-secret.js'

export async function setupEnv({
  projectDir,
  databaseUrl,
}: {
  projectDir: string
  databaseUrl: string
}): Promise<void> {
  const envExamplePath = path.join(projectDir, '.env.example')
  const envPath = path.join(projectDir, '.env')

  if (!(await fs.pathExists(envExamplePath))) {
    throw new Error('Template is missing .env.example')
  }

  const secret = generateSecret()

  let envContent = await fs.readFile(envExamplePath, 'utf8')

  envContent = replaceEnvValue(envContent, 'DATABASE_URL', databaseUrl)
  envContent = replaceEnvValue(envContent, 'PAYLOAD_SECRET', secret)

  await fs.writeFile(envPath, envContent)
}

function replaceEnvValue(
  envContent: string,
  key: string,
  value: string,
): string {
  const pattern = new RegExp(`^${key}=.*$`, 'm')

  if (pattern.test(envContent)) {
    return envContent.replace(pattern, `${key}=${value}`)
  }

  const trimmed = envContent.trimEnd()

  return `${trimmed}\n${key}=${value}\n`
}
