"use strict";

window.momentum = window.momentum || {};

// Weather

momentum.WeatherCtrl = function () {
    this.apiKey = "2fa8d7829e39deb65ec58c425b7f4768";
    this.apiUrl = "http://api.openweathermap.org/data/2.5/weather?APPID=" + this.apiKey;
};

momentum.WeatherCtrl.prototype = {
    fetchWeather: function (lat, lon, cb) {
        $.ajax({
            url: this.apiUrl + "&lat=" + lat + "&lon=" + lon,
            method: "GET",
            success: cb
        });
    }
};
