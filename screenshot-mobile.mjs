import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');

const url = process.argv[2] || 'http://localhost:3456';
const label = process.argv[3] || 'mobile';

const existing = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
const n = existing.length + 1;
const filename = `screenshot-${n}-${label}.png`;
const outPath = path.join(screenshotsDir, filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.goto(url, { waitUntil: 'networkidle2' });

await page.evaluate(() => {
  document.querySelectorAll('.reveal, .reveal-group').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved → ${outPath}`);
