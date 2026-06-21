import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');

const url = process.argv[2] || 'http://localhost:3456';
const scrollY = parseInt(process.argv[3] || '0');
const label = process.argv[4] || 'scroll';

const existing = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
const n = existing.length + 1;
const filename = `screenshot-${n}-${label}.png`;
const outPath = path.join(screenshotsDir, filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await page.evaluate((y) => window.scrollTo(0, y), scrollY);
await new Promise(r => setTimeout(r, 600));
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log(`Saved → ${outPath}`);
