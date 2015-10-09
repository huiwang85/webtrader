requirejs.config({baseUrl:".",paths:{jquery:"lib/jquery/dist/jquery.min","jquery-ui":"lib/jquery-ui/jquery-ui.min",highstock:"lib/highstock/highstock","highcharts-exporting":"lib/highstock/modules/exporting","highcharts-theme":"lib/highstock/themes/sand-signika","jquery.dialogextend":"lib/binary-com-jquery-dialogextended/jquery.dialogextend.min","jquery-growl":"lib/growl/javascripts/jquery.growl",modernizr:"lib/modernizr/modernizr","reconnecting-websocket":"lib/reconnectingWebsocket/reconnecting-websocket.min",lokijs:"lib/lokijs/build/lokijs.min","jquery-timer":"lib/jquery.timers/jquery.timers.min","color-picker":"lib/colorpicker/jquery.colorpicker",datatables:"lib/datatables/media/js/jquery.dataTables.min","datatables-jquery-ui":"lib/datatables/media/js/dataTables.jqueryui.min",currentPriceIndicator:"charts/indicators/highcharts_custom/currentprice",indicator_base:"charts/indicators/highcharts_custom/indicator_base",loadCSS:"lib/loadcss/loadCSS"},shim:{"jquery-ui":{deps:["jquery"]},highstock:{deps:["jquery"]},"highcharts-exporting":{deps:["highstock"]},"highcharts-theme":{deps:["highstock"]},"jquery-growl":{deps:["jquery"]},"jquery-timer":{deps:["jquery"]},datatables:{deps:["jquery-ui"]},currentPriceIndicator:{deps:["highstock"]}}}),require(["jquery","jquery-ui","modernizr","loadCSS","common/util"],function(a){"use strict";return Modernizr.svg?(loadCSS("lib/jquery-ui/themes/smoothness/jquery-ui.min.css"),loadCSS("main.css"),loadCSS("lib/hamburger.css"),void a(document).ready(function(){a(".mainContainer").load("mainContent.html",function(){require(["instruments/instruments"],function(a){require(["jquery","jquery-growl"],function(a){a.growl.notice({message:"Loading chart menu!"})}),a.init()}),require(["windows/windows"],function(b){b.init(a(".topContainer .windows").closest("li"))})}),loadCSS("lib/growl/stylesheets/jquery.growl.css"),loadCSS("charts/charts.css"),loadCSS("lib/datatables/media/css/jquery.dataTables.min.css"),loadCSS("lib/datatables/media/css/dataTables.jqueryui.min.css"),loadCSS("lib/colorpicker/jquery.colorpicker.css")})):void(window.location.href="unsupported_browsers.html")});