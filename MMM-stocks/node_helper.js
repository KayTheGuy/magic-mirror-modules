var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  getStocks: function (url) {
    var self = this;
    request({
      url: url,
      method: 'GET'
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        self.sendSocketNotification('STOCKS_RESULT', result);
      }
    });
  },

  getStocksMulti: function (urls) {
    var self = this;
    var count = urls.length;
    var counter = 0;
    var stockResults = [];
    urls.forEach(url => {
      request({
        url: url,
        method: 'GET'
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          stockResults.push(JSON.parse(body));
          counter++;
          if (counter == count - 1) {
            self.sendSocketNotification('STOCKS_RESULT', stockResults);
          }
        } else {
          var err = error;
        }
      });
    });
  },
  socketNotificationReceived: function (notification, payload) {
    if (notification === 'GET_STOCKS') {
      this.getStocks(payload);
    }
    if (notification === "GET_STOCKS_MULTI") {
      this.getStocksMulti(payload);
    }
  }
});
