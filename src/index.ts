import * as p from '@clack/prompts'
import { execa } from 'execa'
import fs from 'fs-extra'
import path from 'node:path'

import { downloadTemplate } from './lib/download-template.js'
import { setupEnv } from './lib/manage-env-files.js'
import { error, info } from './utils/log.js'
import { successMessage, welcomeMessage } from './utils/messages.js'

const TEMPLATE_REPO = 'github:ZNAXNOR/OD-LABS-Payload'
const TEMPLATE_BRANCH = 'whitelabel'

function normalizeProjectName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\\/:*?"<>|]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^\.+|\.+$/g, '')
    .replace(/^-+|-+$/g, '')
}

async function promptProjectName(): Promise<string | null> {
  const response = await p.text({
    message: 'Project name?',
    placeholder: 'my-payload-site',
    validate(value) {
      if (!value || value.trim() === '') {
        return 'Please enter a project name.'
      }

      if (normalizeProjectName(value).length === 0) {
        return 'Please enter a valid project name.'
      }
    },
  })

  if (p.isCancel(response)) {
    return null
  }

  return normalizeProjectName(response)
}

async function promptDatabaseUrl(): Promise<string | null> {
  const response = await p.text({
    message: 'Database URI?',
    placeholder: 'postgres://user:password@localhost:5432/payload',
    validate(value) {
      if (!value || value.trim() === '') {
        return 'Please enter a database URI.'
      }
    },
  })

  if (p.isCancel(response)) {
    return null
  }

  return response.trim()
}

async function installDependencies(projectDir: string): Promise<void> {
  const spinner = p.spinner()

  spinner.start('Installing dependencies with pnpm...')

  try {
    await execa('pnpm', ['install'], {
      cwd: projectDir,
      stdio: 'inherit',
    })

    spinner.stop('Dependencies installed')
  } catch (installError) {
    spinner.stop('Failed to install dependencies')
    throw installError
  }
}

async function removeGitDirectory(projectDir: string): Promise<void> {
  const gitDir = path.join(projectDir, '.git')

  if (await fs.pathExists(gitDir)) {
    await fs.remove(gitDir)
  }
}

function handleCancellation(): void {
  p.cancel('Project creation cancelled.')
}

export async function runCli(): Promise<void> {
  p.intro(welcomeMessage())

  const projectName = await promptProjectName()

  if (!projectName) {
    handleCancellation()
    return
  }

  const databaseUrl = await promptDatabaseUrl()

  if (!databaseUrl) {
    handleCancellation()
    return
  }

  const projectDir = path.resolve(process.cwd(), projectName)

  if (await fs.pathExists(projectDir)) {
    error(`Target directory already exists: ${projectName}`)
    process.exitCode = 1
    return
  }

  try {
    info(`Creating project in ${projectDir}`)

    await downloadTemplate({
      repo: TEMPLATE_REPO,
      branch: TEMPLATE_BRANCH,
      projectDir,
    })

    await removeGitDirectory(projectDir)
    await setupEnv({ projectDir, databaseUrl })
    await installDependencies(projectDir)

    p.outro(successMessage(projectName))
  } catch (cliError) {
    const message =
      cliError instanceof Error ? cliError.message : 'Failed to create project.'

    error(message)
    process.exitCode = 1
  }
}
