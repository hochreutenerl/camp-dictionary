#! /usr/bin/env node

var childProcess = require('child_process');

function runScript(scriptPath, args, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath, args);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

const sheets = [
    {name: 'all', id: '16alnROkJ__37BM4sKzlyJ7LYCvwgjr0U1rA0T6OtybA'},
    {name: 'swadesh', id: '1ZSIuWrSbhluLYiEhfvV9yU_Mcy90ExPb6TqOcYLOp6E'},
    {name: 'communikate20', id: '1EYBn60uCfKs9Rrc3dRrApnZovt99oW1r9voCIDuh7NE'},
    {name: 'core24', id: '1_5rCDrzR0o2GmiTCuLUUEMJxJ5Zb6asi9ejJrZsiS28'},
];

sheets.forEach(function(sheet) {
    var args = ['--spreadsheet=' + sheet['id'], '--sheet=Sheet1', '--format=json', '--output=src/locales/' + sheet['name'] + '.json'];
    runScript('./src/plugins/spreadsheet.js', args, function (err) {
        if (err) throw err;
        console.log('finished running some-script.js');
    });
});

