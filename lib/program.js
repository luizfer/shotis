const program = require('commander');

program
    .option('--url, [url]', 'Insert URL')
    .option('--emulate, [emulate]', 'The device emulate')
    .option('--fullpage, [fullpage]', 'Full page option')
    .option('--pdf, [pdf]', 'Generate PDF file')
    .option('--w, [width]', 'Width')
    .option('--h, [height]', 'Height')
    .option('--time, [time]', 'Wait time in milliseconds')
    .option('--el, [selector]', 'selector DOM')
    .option('--auth, [auth]', 'Basic HTTP authentication')
    .option('--mobile, [mobile]', 'Generate responsive page')
    .option('--open, [open]', 'Open browser')
    .parse(process.argv);

module.exports = program;