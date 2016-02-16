define(["jquery","windows/windows","websockets/binary_websockets","navigation/menu","moment","lodash","jquery-growl","common/util","highstock","highcharts-exporting","export-csv"],function(a,b,c,d,e,f){function g(b,d,f){var g=a(".downloadChart");g.highcharts()&&g.highcharts().destroy(),g.highcharts("StockChart",{chart:{events:{load:function(){this.credits.element.onclick=function(){window.open("http://www.binary.com","_blank")}}},spacingLeft:0,marginLeft:40},navigator:{enabled:!0,series:{id:"navigator"}},plotOptions:{candlestick:{lineColor:"black",color:"red",upColor:"green",upLineColor:"black",shadow:!0}},title:{text:b.display_name+" ("+d+")"},credits:{href:"http://www.binary.com",text:"Binary.com"},xAxis:{labels:{formatter:function(){var a=this.axis.defaultLabelFormatter.call(this);return a.replace(".","")}}},yAxis:[{opposite:!1,labels:{formatter:function(){return this.value},align:"center"}}],tooltip:{crosshairs:[{width:2,color:"red",dashStyle:"dash"},{width:2,color:"red",dashStyle:"dash"}],enabled:!0,enabledIndicators:!0,xDateFormat:"%A, %b %e, %Y %H:%M:%S"},exporting:{enabled:!0,buttons:{contextButton:{menuItems:[{text:"Download PNG",onclick:function(){this.exportChart()}},{text:"Download JPEG",onclick:function(){this.exportChart({type:"image/jpeg"})},separator:!1},{text:"Download PDF",onclick:function(){this.exportChart({type:"application/pdf"})},separator:!1},{text:"Download SVG",onclick:function(){this.exportChart({type:"image/svg+xml"})},separator:!1},{text:"Download CSV",onclick:function(){this.downloadCSV()},separator:!1},{text:"Download XLS",onclick:function(){this.downloadXLS()},separator:!1}]}}},rangeSelector:{enabled:!1}});var h=g.highcharts();h.showLoading(),a(".download_show").prop("disabled",!0);var i=e.utc(f,"DD/MM/YYYY HH:mm").unix(),j=i+1800,k={ticks_history:b.symbol,start:i};isTick(d)||(k.granularity=convertToTimeperiodObject(d).timeInSeconds(),k.style="candles",j=i+1e3*k.granularity),e.utc().unix()<j&&(j=e.utc().unix()),k.end=j,c.send(k).then(function(c){var e=[];isTick(d)?c.history.times.forEach(function(a,b){e.push([1e3*parseInt(a),parseFloat(c.history.prices[b])])}):c.candles.forEach(function(a){e.push([1e3*a.epoch,parseFloat(a.open),parseFloat(a.high),parseFloat(a.low),parseFloat(a.close)])});var f=e.length,g=f>100?100:f-1;h.xAxis[0].setExtremes(e[0][0],e[g][0]);var i=b.display_name,j={id:"_"+Date.now(),name:i,data:e,type:isTick(d)?"line":"candlestick",dataGrouping:{enabled:!1},states:{hover:{enabled:!1}}};isTick(d)&&(j.marker={enabled:!0,radius:4}),h.addSeries(j),h.hideLoading(),a(".download_show").prop("disabled",!1)})["catch"](function(b){a.growl.error({message:b.message}),h.hideLoading(),a(".download_show").removeAttr("disabled")})}function h(h){require(["css!download/download.css"]),h.click(function(){i?i.moveToTop():(i=b.createBlankWindow(a('<div class="download_window"/>'),{title:"View Historical Data",width:700,minHeight:460,height:460,resize:function(){var b=a(".downloadChart").width(a(this).width()).height(a(this).height()-40).highcharts();b&&b.reflow()}}),i.dialog("open"),i.closest("div.ui-dialog").css("overflow","visible"),require(["text!download/download.html"],function(b){b=a(b),b.find("button, input[type=button]").button(),b.find(".download_fromDate").datepicker({changeMonth:!0,changeYear:!0,dateFormat:"dd/mm/yy",showButtonPanel:!0,minDate:e.utc().subtract(1,"years").toDate(),maxDate:e.utc().toDate()}).click(function(){a(this).datepicker("show")}),b.find(".download_fromTime").timepicker({showCloseButton:!0}).click(function(){a(this).timepicker("show")}),b.appendTo(i),c.cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(b){j=d.extractChartableMarkets(b),j=d.sortMenu(j);var c=a("<ul>"),e=void 0;j.forEach(function(b){var d=a("<ul>");b.submarkets.forEach(function(b){var c=a("<ul>");b.instruments.forEach(function(b){var d=a("<li>");d.append(b.display_name),d.data("instrumentObject",b),d.click(function(){a(".download_instruments").data("instrumentObject",a(this).data("instrumentObject")).find("span").html(a(this).data("instrumentObject").display_name),a(".download_instruments_container > ul").toggle()}),f.isUndefined(e)&&(e=b),c.append(d)}),d.append(a("<li>").append(b.name).append(c))}),c.append(a("<li>").append(b.name).append(d))}),a(".download_instruments_container").append(c),c.menu().toggle();var g=a(".download_instruments");g.click(function(){a(".download_instruments_container > ul").toggle()}).blur(function(){a(".download_instruments_container > ul").hide()}),g.data("instrumentObject",e),g.find("span").html(e.display_name),a(".download_show").click()})["catch"](function(b){a.growl.error({message:b.message})});var h=a(".download_timePeriod"),l=a("<ul>");k.forEach(function(c){var d=a("<ul>");c.timePeriods.forEach(function(c){var e=a("<li>");e.append(c.name),e.data("timePeriodObject",c),e.click(function(){var c=a(this).data("timePeriodObject");a(".download_timePeriod").data("timePeriodObject",c).find("span").html(a(this).data("timePeriodObject").name),a(".download_timePeriod_container > ul").toggle();var d="1d"===c.code,e=b.find(".download_fromTime");e.attr("disabled",d),d&&e.val("00:00")}),d.append(e)}),l.append(a("<li>").append(c.name).append(d))}),a(".download_timePeriod_container").append(l),l.menu().toggle(),h.click(function(){a(".download_timePeriod_container > ul").toggle()}).blur(function(){a(".download_timePeriod_container > ul").hide()}),h.data("timePeriodObject",{name:"1 day",code:"1d"}),h.find("span").html("1 day"),a(".download_fromTime").prop("disabled",!0),b.find(".download_show").click(function(){var b=a(".download_instruments"),c=a(".download_timePeriod"),d=b.data("instrumentObject"),e=c.data("timePeriodObject");g(d,e.code,a(".download_fromDate").val()+" "+a(".download_fromTime").val())}),b.find(".download_fromDate").val(e.utc().subtract(1,"years").format("DD/MM/YYYY"))}))})}var i=null,j=[],k=[{name:"Ticks",timePeriods:[{name:"1 Tick",code:"1t"}]},{name:"Minutes",timePeriods:[{name:"1 min",code:"1m"},{name:"2 mins",code:"2m"},{name:"3 mins",code:"3m"},{name:"5 mins",code:"5m"},{name:"10 mins",code:"10m"},{name:"15 min",code:"15m"},{name:"30 min",code:"30m"}]},{name:"Hours",timePeriods:[{name:"1 hour",code:"1h"},{name:"2 hours",code:"2h"},{name:"4 hours",code:"4h"},{name:"8 hours",code:"8h"}]},{name:"Days",timePeriods:[{name:"1 day",code:"1d"}]}];return{init:h}});