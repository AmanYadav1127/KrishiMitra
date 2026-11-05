import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import en from '../src/i18n/en.js'
import hi from '../src/i18n/hi.js'
import kn from '../src/i18n/kn.js'
import te from '../src/i18n/te.js'
import ta from '../src/i18n/ta.js'

const DICTS = { hi, kn, te, ta }
const SRC = new URL('../src', import.meta.url).pathname
const SKIP = new Set(['src/i18n'])

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) return walk(full)
    return ['.js', '.jsx'].includes(extname(full)) ? [full] : []
  })
}

const placeholders = (value) =>
  [...String(value).matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort()

let failures = 0

for (const [code, dict] of Object.entries(DICTS)) {
  const missing = Object.keys(en).filter((key) => !(key in dict))
  const extra = Object.keys(dict).filter((key) => !(key in en))
  const badPlaceholders = Object.keys(en).filter((key) => {
    const a = placeholders(en[key])
    const b = placeholders(dict[key] ?? '')
    return a.join(',') !== b.join(',')
  })
  if (missing.length || extra.length || badPlaceholders.length) {
    failures += 1
    console.error(`${code}: missing=${missing.length} extra=${extra.length} placeholders=${badPlaceholders.length}`)
    if (missing.length) console.error(`  missing: ${missing.slice(0, 10).join(', ')}`)
    if (extra.length) console.error(`  extra: ${extra.slice(0, 10).join(', ')}`)
    if (badPlaceholders.length) console.error(`  placeholders: ${badPlaceholders.slice(0, 10).join(', ')}`)
  } else {
    console.log(`${code}: ${Object.keys(dict).length} keys, placeholders OK`)
  }
}

const used = new Set()
for (const file of walk(SRC)) {
  if ([...SKIP].some((part) => file.includes(part))) continue
  const source = readFileSync(file, 'utf8')
  for (const match of source.matchAll(/\bt\(\s*(?:[^,()]+,\s*)?['"]([^'"]+)['"]/g)) {
    used.add(match[1])
  }
}

const unknown = [...used].filter((key) => !(key in en))
if (unknown.length) {
  failures += 1
  console.error(`unknown t() keys: ${unknown.join(', ')}`)
} else {
  console.log(`used t() keys present in English: ${used.size}`)
}

if (failures) {
  console.error(`i18n check failed (${failures} issue group${failures === 1 ? '' : 's'})`)
  process.exit(1)
}

console.log(`i18n check passed: ${Object.keys(en).length} English keys, 4 complete dictionaries`)
