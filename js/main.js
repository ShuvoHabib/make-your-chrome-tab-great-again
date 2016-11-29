"use strict";

window.momentum = window.momentum || {};

momentum.Core = function () {
    this.timeStr = "";
    this.quoteStr = "";
    this.quoteAuthorStr = "";
    this.weatherStr = "";
    this.ampm = "AM";
    this.salutation = "Morning, ";
    this.location = "";
    this.timeEl = $("#time");
    this.quoteEl = $("#quote-text");
    this.quoteAuthor = $("#quote-author");
    this.weatherEl = $("#weather");
    this.greetingEl = $("#greetings");
    this.ampmEl = $("#ampm");
    this.lat;
    this.lon;
    this.weatherCtrl = new momentum.WeatherCtrl();
    this.quoteCtrl = new momentum.QuoteCtrl();
};

momentum.Core.prototype = {
    setTime: function () {
        var date = new Date();
        var hours = date.getHours();
        if (hours > 12) {
            this.salutation = "Afternoon, ";
        }
        if (hours > 18) {
            this.salutation = "Evening, ";
        }
        if (hours > 11 && hours < 24) {
            this.ampm = "PM";
        }
        if (hours > 12) {
            hours -= 12;
        }
        var mins = date.getMinutes();
        if (mins < 10) {
            var txt = '0' + mins;
            mins = txt;
        }
        var ret = '';
        ret = ret + hours + ':' + mins;
        this.timeStr = ret;
    },
    setQuote: function (quoteData) {
        this.quoteStr = JSON.parse(quoteData).quote;
        this.quoteAuthorStr = JSON.parse(quoteData).author;
        this.quoteEl.text(this.quoteStr);
        this.quoteAuthor.text(this.quoteAuthorStr);
        this.render();
    },
    setWeather: function (weatherData) {
        this.weatherStr = Math.floor(weatherData.main.temp - 273.15);
        this.location = weatherData.name;
        this.render();
    },
    updateTime: function () {
        this.setTime();
    },
    updateWeather: function () {
        this.weatherCtrl.fetchWeather(this.lat, this.lon, this.setWeather.bind(this));
    },
    updateQuote: function () {
        this.quoteCtrl.fetchQuote(this.setQuote.bind(this));

    },
    start: function () {
        if (!navigator.geolocation) {
            throw "Geolocation not supported!";
        }
        function error() {
            throw "Error occured!";
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            this.updateWeather();
        }.bind(this), error);
        this.setTime();
        this.updateQuote();
        this.render();
    },
    render: function () {
        this.timeEl.text(this.timeStr);
        this.greetingEl.text("Good " + this.salutation);
        this.ampmEl.text(this.ampm);
        this.weatherEl.text(this.weatherStr);
        this.quoteEl.text(this.quoteStr);
        this.quoteAuthor.text(this.quoteAuthorStr);
    }
};
var progress = setInterval(function () {
    var $bar = $("#bar");

    if ($bar.width() >= 600) {
        clearInterval(progress);
    } else {
        $bar.width($bar.width() + 60);
    }
    $bar.text($bar.width() / 6 + "%");
    if ($bar.width() / 6 == 100) {
        $bar.text("Still working ... " + $bar.width() / 6 + "%");
    }
}, 800);

$(window).load(function () {
    $("#bar").width(600);
    $(".loader").fadeOut(3000);
});

function doStuff(evt) {
    var nameElement = document.getElementById("someInput");
    localStorage.setItem('server', nameElement.value);
    var evt = evt || window.event;
    if (evt.keyCode == 13) {
        document.getElementById("someDiv").innerHTML += localStorage.getItem('server');
        $('input').hide();
    }
}
$('#someDiv').click(function () {
    $('#someDiv').empty();
    $('input').show();
})

$("#someInput").keyup(function (e) {
    return doStuff();
});

if (localStorage.getItem('server') != undefined) {
    document.getElementById("someDiv").innerHTML += localStorage.getItem('server');
    $('input').hide();
}
console.info("Dev: Shuvo Habib");
console.info("Web: www.shuvohabib.com");
