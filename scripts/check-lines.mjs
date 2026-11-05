import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const SRC = new URL('../src', import.meta.url).pathname
const LIMIT = 250
const EXT = new Set(['.js', '.jsx', '.css'])

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return walk(full)
    return EXT.has(extname(full)) ? [full] : []
  })
}

const rows = walk(SRC)
  .map((file) => ({
    file: file.replace(SRC + '/', 'src/'),
    lines: readFileSync(file, 'utf8').replace(/\n$/, '').split('\n').length,
  }))
  .sort((a, b) => b.lines - a.lines)

const over = rows.filter((row) => row.lines >= LIMIT)
rows.slice(0, 8).forEach((row) => console.log(`${String(row.lines).padStart(4)}  ${row.file}`))

if (over.length) {
  console.error(`\n${over.length} file(s) at or above ${LIMIT} lines:`)
  over.forEach((row) => console.error(`  ${row.lines}  ${row.file}`))
  process.exit(1)
}

console.log(`\nline check passed: every src file is under ${LIMIT} lines`)
