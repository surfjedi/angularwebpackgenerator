'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

function rewrite(body, newRoute) {
    var linesBody = body.split('\n');
    var lastLine = linesBody.length - 1;

    var linesRemoved = [];

    //console.dir(linesBody.join('\n'));

    while(lastLine >= linesBody.length - 1) {
        var line = linesBody[lastLine];

        if(line) {
            var linha = line.toString().trim();

            //console.dir();
            try {

                if(_.endsWith(linha.toString(), '});')) {
                    linesBody[lastLine] = linha.replace(';','');
                    linesBody[lastLine] = "    "+linesBody[lastLine];
                    linesBody = linesBody.concat(newRoute);
                    linesBody = linesBody.concat(linesRemoved.reverse());
                    break;
                }

            } catch(e) {
                console.dir(e.message);
            }

        }

        linesRemoved.push(line);
        linesBody.splice(lastLine, 1);
        lastLine--;
    }


    return linesBody.join('\n');
}

function rewriteRouteFile (newRoute, path) {
    path = path || process.cwd();

    var body = fs.readFileSync(path, 'utf8');
    var result = rewrite(body, newRoute);

    fs.writeFileSync(path, result);
}

module.exports = {
    rewriteRouteFile: rewriteRouteFile
};
