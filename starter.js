var util = require("util"),
    http = require("http"),
    cheerio = require("cheerio");

var args = process.argv.slice(2);
var options = {
    host: args[0],
    port: args[1],
    path: args[2]
};

var content = "";   

var req = http.request(options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        content += chunk;
    });

    res.on("end", function () {
        $ = cheerio.load(content);
        weather = {
          receiverTime: $('input[name=CurrTime]').val(),
          outdoorSensorId: $('input[name=Outdoor1ID]').val(),
          outdoorSensorBatt: $('input[name=outBattSta1]').val(),
          indoorSensorId: $('input[name=IndoorID]').val(),
          indoorSensorBatt: $('input[name=inBattSta]').val(),
          indoorTemperature: +$('input[name=inTemp]').val(),
          indoorHumidity: +$('input[name=inHumi]').val(),
          absolutePressure: +$('input[name=AbsPress]').val(),
          relatievPressure: +$('input[name=RelPress]').val(),
          outdoorTemperature: +$('input[name=outTemp]').val(),
          windDirection: +$('input[name=windir]').val(),
          windAverageSpeed: +$('input[name=avgwind]').val(),
          windGustSpeed: +$('input[name=gustspeed]').val(),
          solarRadiation: +$('input[name=solarrad]').val(),
          uv: +$('input[name=uv]').val(),
          uvi: +$('input[name=uvi]').val(),
          hourlyRainRate: +$('input[name=rainofhourly]').val(),
        };
        console.log(weather);
    });
});

req.end();
