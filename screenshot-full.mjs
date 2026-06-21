import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');

const url = process.argv[2] || 'http://localhost:3456';
const label = process.argv[3] || 'full';

const existing = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
const n = existing.length + 1;
const filename = `screenshot-${n}-${label}.png`;
const outPath = path.join(screenshotsDir, filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });

// Scroll through page to trigger reveal animations
await page.evaluate(async () => {
  await new Promise(resolve => {
    let pos = 0;
    const step = () => {
      pos += 300;
      window.scrollTo(0, pos);
      if (pos < document.body.scrollHeight) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
});
await new Promise(r => setTimeout(r, 800));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 300));

await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved → ${outPath}`);
