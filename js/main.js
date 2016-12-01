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

$(window).load(function () {
    $('#preloader').fadeOut('slow', function () {
        $(this).remove();
    });
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

if (navigator.onLine) {
    document.querySelector('.bg-wrapper').setAttribute("style", "background-image: url('https://source.unsplash.com/daily') !important ");
} else {
    $('.quote, .clouds-flat-button, .weather').hide();
}

var clicks = 1;
$(".changeBg-right").click(function () {
    console.log(clicks);
    if (clicks < 6) {
        clicks++;
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + 'bg/bg' + clicks + '.jpeg' + ")" + '!important');
    } else
    {
        clicks = 0;
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image: url('https://source.unsplash.com/daily') !important ");
    }
});
$(".changeBg-left").click(function () {
    console.log(clicks);
    if (clicks > 1) {
        clicks--;
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image:" + "url" + "(" + 'bg/bg' + clicks + '.jpeg' + ")" + '!important');
    } else
    {
        clicks = 7;
        document.querySelector('.bg-wrapper').setAttribute("style", "background-image: url('https://source.unsplash.com/daily') !important ");
    }
});

console.info("Dev: Shuvo Habib");
console.info("Web: www.shuvohabib.com");
