import degit from 'degit'
import * as p from '@clack/prompts'

export async function downloadTemplate({
  repo,
  branch,
  projectDir,
}: {
  repo: string
  branch: string
  projectDir: string
}): Promise<void> {
  const spinner = p.spinner()

  spinner.start('Downloading template...')

  try {
    const emitter = degit(`${repo}#${branch}`, {
      cache: false,
      force: true,
      verbose: false,
    })

    await emitter.clone(projectDir)

    spinner.stop('Template downloaded')
  } catch (err) {
    spinner.stop('Failed to download template')
    throw err
  }
}
