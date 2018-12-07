const program  = require('./program');
const chalk    = require('chalk');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const CLI         = require('clui')
const Spinner     = CLI.Spinner;

module.exports = {
   generateScreenshot : async () => {
      const status = new Spinner('Fazendo Screenshot...');
      status.start();
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const timestamp = new Date().getTime();
      program.emulate = '';
      
      if (program.w && program.h){
          await page.setViewport({
            width: Number(program.w), 
            height: Number(program.h),
            isMobile: program.mobile
          });
      }
      
      if (program.emulate) {
          const emulate = new Spinner('Inicializando no emulador...');
          emulate.start();
          await page.emulate(devices[program.emulate]);
          emulate.stop();
      }

      if (program.auth) {
        const auth = new Spinner('Auth in progress...');
        auth.start();
        const [username, password] = program.auth.split(';');
        await page.authenticate({ username, password });
        auth.stop();
      } 

      const goto = new Spinner('Recuperando dados do site...');
      goto.start();
      await page.goto(program.url);
      const title = (await page.title()).replace(/[/\\?%*:|"<>]/g, '-');
      goto.stop()
      
      
      if (program.time){
        const time = new Spinner('Esperando ' + program.time + ' milisegundos');
        time.start();
        await page.waitFor(Number(program.time));
        time.stop();
      }
      
      if (program.el) {
          const screenshot = new Spinner('Tirando screenshot...');
          screenshot.start();
          const el = await page.$(program.el);
          await el.screenshot({
            path: `${title}-${timestamp}.png`
          });
          screenshot.stop();
      } else {
          const screenshot = new Spinner('Tirando screenshot...');
          await page.screenshot({
              path: `${title}-${timestamp}.png`, fullPage: program.fullPage
          });
          screenshot.stop();
      }
      
      await page.emulateMedia('screen');
      
      if (program.pdf) {
        const pdf = new Spinner('Gerando PDF...');
        pdf.start();
        await page.pdf({path: `${title}-${timestamp}.pdf`});
        pdf.stop();
      }

      await browser.close();

      console.log(chalk.green('All done!'));
      status.stop();
  }
};