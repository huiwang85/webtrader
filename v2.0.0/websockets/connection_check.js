define(["websockets/binary_websockets","charts/chartingRequestMap"],function(a,b){var c=null;return $(document).everyTime(15e3,null,function(){var d=(new Date).getTime()-(c||(new Date).getTime());d>=6e4?b&&$.each(b,function(c,d){var e=d.chartIDs;if(a.send({forget:b[c].tickStreamingID}),b[c].tickStreamingID=null,e&&e.length>0){var f={ticks:e[0].instrumentCode,end:"latest",passthrough:{instrumentCdAndTp:c.toUpperCase()}};a.send(f)}}):a.send({ping:"1"})}),a.events.on("ping",function(){c=(new Date).getTime()}),{}});