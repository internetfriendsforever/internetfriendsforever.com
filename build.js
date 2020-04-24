const fs = require('fs')
const path = require('path')
const child = require('child_process')
const styles = require('@cyberspace/styles')
const util = require('util')
const exec = util.promisify(child.exec)
const writeFile = util.promisify(fs.writeFile)

const sourcePath = path.join(__dirname, 'src')
const outputPath = path.join(__dirname, 'dist')

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath)
}

const pages = {
  'index.html': require(path.join(sourcePath, 'pages/index')),
  '404.html': require(path.join(sourcePath, 'pages/404')),
  'styles.css': async () => styles.toString()
}

async function build () {
  const writeFiles = Object.keys(pages).map(async filename => {
    console.log(`Building ${filename}...`)

    return writeFile(
      path.join(outputPath, filename),
      await pages[filename]()
    )
  })

  console.log('Syncing assets...')
  const assetsSource = path.join(sourcePath, 'assets')
  const syncAssets = exec(`rsync -r ${assetsSource} ${outputPath}`)

  await Promise.all([
    writeFiles,
    syncAssets
  ])
}

build()
