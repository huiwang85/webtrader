define(["indicator_base","highstock"],function(a){function b(b){var c=b.data,d=b.mamaData,p=b.index,q=b.fastLimit,r=b.slowLimit,s=b.type,t=b.appliedTo,u=a.getPrice(c,p,t,s);if(p>10){e[p]=(4*a.getPrice(c,p,t,s)+3*a.getPrice(c,p-1,t,s)+2*a.getPrice(c,p-2,t,s)+1*a.getPrice(c,p-3,t,s))/10,f[p]=(.0962*e[p]+.5769*~~e[p-2]+.5769*~~e[p-4]+.0962*~~e[p-6])*(.075*~~g[p-1]+.054),i[p]=(.0962*f[p]+.5769*~~f[p-2]+.5769*~~f[p-4]+.0962*~~f[p-6])*(.075*~~g[p-1]+.054),h[p]=~~f[p-3];var v=(.0962*h[p]+.5769*~~h[p-2]+.5769*~~h[p-4]+.0962*~~h[p-6])*(.075*~~g[p-1]+.054),w=(.0962*i[p]+.5769*~~i[p-2]+.5769*~~i[p-4]+.0962*~~i[p-6])*(.075*~~g[p-1]+.054);j[p]=h[p]+w,k[p]=i[p]+v,j[p]=.2*j[p]+.8*~~j[p-1],k[p]=.2*k[p]+.8*~~k[p-1],l[p]=j[p]*~~j[p-1]+k[p]*~~k[p-1],m[p]=j[p]*~~k[p-1]+k[p]*~~j[p-1],l[p]=.2*l[p]+.8*~~l[p-1],m[p]=.2*m[p]+.8*~~m[p-1],0!=m[p]&&0!=l[p]&&(g[p]=360/Math.atan(m[p]/l[p])),g[p]>1.5*~~g[p-1]&&(g[p]=1.5*~~g[p-1]),g[p]<.67*~~g[p-1]&&(g[p]=.67*~~g[p-1]),g[p]<6&&(g[p]=6),g[p]>50&&(g[p]=50),g[p]=.2*g[p]+.8*~~g[p-1],n[p]=.88*g[p]+.67*~~n[p-1],0!=h[p]&&(o[p]=Math.atan(i[p]/h[p]));var x=~~o[p-1]-~~o[p];1>x&&(x=1);var y=~~(q/x);r>y&&(y=r),y>q&&(y=q),u=y*a.getPrice(c,p,t,s)+(1-y)*~~a.getIndicatorData(d[p-1])}return u}var c={},d={},e=[],f=[],g=[],h=[],i=[],j=[],k=[],l=[],m=[],n=[],o=[];return{init:function(){!function(p,q){function r(e,f){{var g=this;g.chart}for(var h in d)if(d[h]&&d[h].options&&d[h].options.data&&d[h].options.data.length>0&&c[h].parentSeriesID==g.options.id){var i=g.options.data,j=d[h].options.data,k=c[h],l=a.findIndexInDataForTime(i,e);if(l>=1){var m=b({data:i,mamaData:j,index:l,fastLimit:k.fastLimit,slowLimit:k.slowLimit,type:this.options.type,appliedTo:k.appliedTo});f?d[h].data[l].update({y:a.toFixed(m,4)}):d[h].addPoint([i[l].x||i[l][0],a.toFixed(m,4)],!0,!0,!1)}}}p&&!p.Series.prototype.addMAMA&&(p.Series.prototype.addMAMA=function(p){var r=this.options.id;p=q.extend({fastLimit:.5,slowLimit:.05,stroke:"red",strokeWidth:2,dashStyle:"line",levels:[],appliedTo:a.CLOSE,parentSeriesID:r},p);var s="_"+(new Date).getTime(),t=this.options.data||[];if(t&&t.length>0){for(var u=[],v=0;v<t.length;v++){var w=b({data:t,mamaData:u,index:v,fastLimit:p.fastLimit,slowLimit:p.slowLimit,type:this.options.type,appliedTo:p.appliedTo});e[v]||(e[v]=w,f[v]=w,h[v]=w,i[v]=w,j[v]=w,k[v]=w,l[v]=w,m[v]=w,g[v]=360/Math.atan(m[v]/l[v]),n[v]=g[v],o[v]=Math.atan(i[v]/h[v])),u.push([t[v].x||t[v][0],a.toFixed(w,4)])}var x=this.chart;c[s]=p;var y=this;d[s]=x.addSeries({id:s,name:"MAMA ("+a.appliedPriceString(p.appliedTo)+")",data:u,type:"line",dataGrouping:y.options.dataGrouping,opposite:y.options.opposite,color:p.stroke,lineWidth:p.strokeWidth,dashStyle:p.dashStyle,compare:y.options.compare},!1,!1),q(d[s]).data({onChartIndicator:!0,indicatorID:"mama",isIndicator:!0,parentSeriesID:p.parentSeriesID}),x.redraw()}return s},p.Series.prototype.removeMAMA=function(a){var b=this.chart;c[a]=null,b.get(a).remove(),d[a]=null},p.Series.prototype.preRemovalCheckMAMA=function(a){return{isMainIndicator:!0,appliedTo:c[a]?c[a].appliedTo:void 0,isValidUniqueID:null!=c[a]}},p.wrap(p.Series.prototype,"addPoint",function(b,d,e,f,g){b.call(this,d,e,f,g),a.checkCurrentSeriesHasIndicator(c,this.options.id)&&r.call(this,d[0])}),p.wrap(p.Point.prototype,"update",function(b,d,e,f){b.call(this,d,e,f),a.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&r.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});