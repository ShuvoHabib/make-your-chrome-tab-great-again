"use strict";window.momentum=window.momentum||{},momentum.WeatherCtrl=function(){this.apiKey="2fa8d7829e39deb65ec58c425b7f4768",this.apiUrl="http://api.openweathermap.org/data/2.5/weather?APPID="+this.apiKey},momentum.WeatherCtrl.prototype={fetchWeather:function(t,e,a){$.ajax({url:this.apiUrl+"&lat="+t+"&lon="+e,method:"GET",success:a})}};