import puppeteer from 'puppeteer';

export default async (html = '', filePath = '') => {
  const browser = process.env.IS_DOCKER ?
    await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: [
        '--no-sandbox',
        '--disable-gpu',
      ]
    }) :
    await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({ path: filePath, format: 'A4' });

  await page.close();
  await browser.close();

  return pdfBuffer;
};


