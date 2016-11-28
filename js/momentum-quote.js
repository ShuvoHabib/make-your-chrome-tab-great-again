"use strict";

window.momentum = window.momentum || {};

// Quotes

momentum.QuoteCtrl = function () {
    //this.apiUrl = "https://horizonshq.herokuapp.com/api/inspirationalquotes";
    this.apiUrl = "https://andruxnet-random-famous-quotes.p.mashape.com/";

};

momentum.QuoteCtrl.prototype = {
    fetchQuote: function (cb) {
        $.ajax({
            url: this.apiUrl,
            headers: {
                'X-Mashape-Key': 'v59o64xwMgmshgjqKwJypJ54sCR8p1ALpyijsnYauOzYVMbYRK'
            },
            method: "POST",
            success: cb
        });
    }
};
