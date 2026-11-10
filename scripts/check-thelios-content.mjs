import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../src/pages/theliosData.ts', import.meta.url), 'utf8')

const required = [
  'Thelios.AI',
  'AI-powered Computer Vision to transform Decision Making',
  'Visual Copilot',
  'No-Code Solution',
  'https://thelios.ai/contact-us?ref=home',
  'https://thelios.ai/thelios-ai-privacy-policy/',
]

for (const value of required) {
  if (!source.includes(value)) throw new Error(`Missing Thelios content: ${value}`)
}

console.log(`Thelios content check passed (${required.length} assertions)`)
