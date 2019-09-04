const exec = require('child_process').exec;

const Qs = require('./qs');
const parser = require('./response-parser');

exports.connection = function (credentials, raw) {
  function run(command, cb) {
    // console.log(command);
    return new Promise((resolve, reject) => {
      exec(command, function (error, stdout, stderr) {
        try {
          var response = parser.parse(stdout, raw);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      })
        .on('error', function (err) {
          reject(err);
        });
    });
  }

  return {
    get: function (url) {
      const [fetchUrl, search] = url.split('?');
      let command = "curl --GET --user \"" + credentials + "\" " + fetchUrl;
      if (search) {
        const datums = search.split('&');
        datums.forEach(function (d) {
          command += " --data " + d;
        });
      }
      return run(command);
    },

    post: function (url, data, cb) {
      var command = "curl --user \"" + credentials + "\" " + url + " --data \"" + data + "\"";
      // console.log(command);
      run(command, cb);
    },

    put: function (url, data, cb) {
      if (!data) {
        data = '""';
      }
      var command = "curl --request PUT --user \"" + credentials + "\" " + url + " --data \"" + data + "\"";
      run(command, cb);
    },

    del: function (url, cb) {
      var command = "curl --include --request DELETE --user \"" + credentials + "\" " + url;
      run(command, cb);
    }
  };
};
