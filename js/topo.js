(function(){!function(t){function e(){try{return a in t&&t[a]}catch(e){return!1}}function n(t){return function(){var e=Array.prototype.slice.call(arguments,0);e.unshift(c),l.appendChild(c),c.addBehavior("#default#userData"),c.load(a);var n=t.apply(o,e);return l.removeChild(c),n}}function i(t){return t.replace(/^d/,"___$&").replace(h,"___")}var o={},r=t.document,a="localStorage",s="script",c;if(o.disabled=!1,o.set=function(t,e){},o.get=function(t){},o.remove=function(t){},o.clear=function(){},o.transact=function(t,e,n){var i=o.get(t);null==n&&(n=e,e=null),"undefined"==typeof i&&(i=e||{}),n(i),o.set(t,i)},o.getAll=function(){},o.forEach=function(){},o.serialize=function(t){return JSON.stringify(t)},o.deserialize=function(t){if("string"!=typeof t)return void 0;try{return JSON.parse(t)}catch(e){return t||void 0}},e())c=t[a],o.set=function(t,e){return void 0===e?o.remove(t):(c.setItem(t,o.serialize(e)),e)},o.get=function(t){return o.deserialize(c.getItem(t))},o.remove=function(t){c.removeItem(t)},o.clear=function(){c.clear()},o.getAll=function(){var t={};return o.forEach(function(e,n){t[e]=n}),t},o.forEach=function(t){for(var e=0;e<c.length;e++){var n=c.key(e);t(n,o.get(n))}};else if(r.documentElement.addBehavior){var l,u;try{u=new ActiveXObject("htmlfile"),u.open(),u.write("<"+s+">document.w=window</"+s+'><iframe src="/favicon.ico"></iframe>'),u.close(),l=u.w.frames[0].document,c=l.createElement("div")}catch(d){c=r.createElement("div"),l=r.body}var h=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^{|}~]","g");o.set=n(function(t,e,n){return e=i(e),void 0===n?o.remove(e):(t.setAttribute(e,o.serialize(n)),t.save(a),n)}),o.get=n(function(t,e){return e=i(e),o.deserialize(t.getAttribute(e))}),o.remove=n(function(t,e){e=i(e),t.removeAttribute(e),t.save(a)}),o.clear=n(function(t){var e=t.XMLDocument.documentElement.attributes;t.load(a);for(var n=0,i;i=e[n];n++)t.removeAttribute(i.name);t.save(a)}),o.getAll=function(t){var e={};return o.forEach(function(t,n){e[t]=n}),e},o.forEach=n(function(t,e){for(var n=t.XMLDocument.documentElement.attributes,i=0,r;r=n[i];++i)e(r.name,o.deserialize(t.getAttribute(r.name)))})}try{var m="__storejs__";o.set(m,m),o.get(m)!=m&&(o.disabled=!0),o.remove(m)}catch(d){o.disabled=!0}o.enabled=!o.disabled,"undefined"!=typeof module&&module.exports&&this.module!==module?module.exports=o:"function"==typeof define&&define.amd?define(o):t.store=o}(Function("return this")()),function(t,e){e.Google=e.Class.extend({includes:e.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",opacity:1,continuousWorld:!1,noWrap:!1,mapOptions:{backgroundColor:"#dddddd"}},initialize:function(n,i){e.Util.setOptions(this,i),this._ready=void 0!==t.maps.Map,this._ready||e.Google.asyncWait.push(this),this._type=n||"SATELLITE"},onAdd:function(t,n){this._map=t,this._insertAtTheBottom=n,this._initContainer(),this._initMapObject(),t.on("viewreset",this._resetCallback,this),this._limitedUpdate=e.Util.limitExecByInterval(this._update,150,this),t.on("move",this._update,this),t.on("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="20px",this._reset(),this._update()},onRemove:function(t){t._container.removeChild(this._container),t.off("viewreset",this._resetCallback,this),t.off("move",this._update,this),t.off("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="0em"},getAttribution:function(){return this.options.attribution},setOpacity:function(t){this.options.opacity=t,1>t&&e.DomUtil.setOpacity(this._container,t)},setElementSize:function(t,e){t.style.width=e.x+"px",t.style.height=e.y+"px"},_initContainer:function(){var t=this._map._container,n=t.firstChild;this._container||(this._container=e.DomUtil.create("div","leaflet-google-layer leaflet-top leaflet-left"),this._container.id="_GMapContainer_"+e.Util.stamp(this),this._container.style.zIndex="auto"),t.insertBefore(this._container,n),this.setOpacity(this.options.opacity),this.setElementSize(this._container,this._map.getSize())},_initMapObject:function(){if(this._ready){this._google_center=new t.maps.LatLng(0,0);var e=new t.maps.Map(this._container,{center:this._google_center,zoom:0,tilt:0,mapTypeId:t.maps.MapTypeId[this._type],disableDefaultUI:!0,keyboardShortcuts:!1,draggable:!1,disableDoubleClickZoom:!0,scrollwheel:!1,streetViewControl:!1,styles:this.options.mapOptions.styles,backgroundColor:this.options.mapOptions.backgroundColor}),n=this;this._reposition=t.maps.event.addListenerOnce(e,"center_changed",function(){n.onReposition()}),this._google=e,t.maps.event.addListenerOnce(e,"idle",function(){n._checkZoomLevels()}),this.fire("MapObjectInitialized",{mapObject:e})}},_checkZoomLevels:function(){this._google.getZoom()!==this._map.getZoom()&&this._map.setZoom(this._google.getZoom())},_resetCallback:function(t){this._reset(t.hard)},_reset:function(t){this._initContainer()},_update:function(e){if(this._google){this._resize();var n=this._map.getCenter(),i=new t.maps.LatLng(n.lat,n.lng);this._google.setCenter(i),this._google.setZoom(Math.round(this._map.getZoom())),this._checkZoomLevels()}},_resize:function(){var t=this._map.getSize();(this._container.style.width!==t.x||this._container.style.height!==t.y)&&(this.setElementSize(this._container,t),this.onReposition())},_handleZoomAnim:function(e){var n=e.center,i=new t.maps.LatLng(n.lat,n.lng);this._google.setCenter(i),this._google.setZoom(Math.round(e.zoom))},onReposition:function(){this._google&&t.maps.event.trigger(this._google,"resize")}}),e.Google.asyncWait=[],e.Google.asyncInitialize=function(){var t;for(t=0;t<e.Google.asyncWait.length;t++){var n=e.Google.asyncWait[t];n._ready=!0,n._container&&(n._initMapObject(),n._update())}e.Google.asyncWait=[]}}(window.google,L),function(t){"use strict";var e=function(e){return null!=e||e!=t},n=function(t,e){for(var n=o._callbacks[t],i=0;i<n.length;i++)n[i].apply(window,e)},i=function(t){for(var e=0,n=t.length-1;n>t.length-6;n--)e+=t[n];return e/5},o=window.Compass={method:t,watch:function(t){var e=++o._lastId;return o.init(function(n){if("phonegap"==n)o._watchers[e]=o._nav.compass.watchHeading(t);else if("webkitOrientation"==n){var i=function(e){t(e.webkitCompassHeading)};o._win.addEventListener("deviceorientation",i),o._watchers[e]=i}else if("orientationAndGPS"==n){var r,i=function(e){r=-e.alpha+o._gpsDiff,0>r?r+=360:r>360&&(r-=360),t(r)};o._win.addEventListener("deviceorientation",i),o._watchers[e]=i}}),e},unwatch:function(t){return o.init(function(e){"phonegap"==e?o._nav.compass.clearWatch(o._watchers[t]):("webkitOrientation"==e||"orientationAndGPS"==e)&&o._win.removeEventListener("deviceorientation",o._watchers[t]),delete o._watchers[t]}),o},needGPS:function(t){return o._callbacks.needGPS.push(t),o},needMove:function(t){return o._callbacks.needMove.push(t),o},noSupport:function(t){return o.method===!1?t():e(o.method)||o._callbacks.noSupport.push(t),o},init:function(t){return e(o.method)?void t(o.method):(o._callbacks.init.push(t),o._initing?void 0:(o._initing=!0,o._nav.compass?o._start("phonegap"):o._win.DeviceOrientationEvent?(o._checking=0,o._win.addEventListener("deviceorientation",o._checkEvent),setTimeout(function(){o._checking!==!1&&o._start(!1)},500)):o._start(!1),o))},_lastId:0,_watchers:{},_win:window,_nav:navigator,_callbacks:{init:[],noSupport:[],needGPS:[],needMove:[]},_initing:!1,_gpsDiff:t,_start:function(t){o.method=t,o._initing=!1,n("init",[t]),o._callbacks.init=[],t===!1&&n("noSupport",[]),o._callbacks.noSupport=[]},_checking:!1,_checkEvent:function(t){o._checking+=1;var n=!1;e(t.webkitCompassHeading)?o._start("webkitOrientation"):e(t.alpha)&&o._nav.geolocation?o._gpsHack():o._checking>1?o._start(!1):n=!0,n||(o._checking=!1,o._win.removeEventListener("deviceorientation",o._checkEvent))},_gpsHack:function(){var t=!0,r=[],a=[];n("needGPS");var s=function(t){r.push(t.alpha)};o._win.addEventListener("deviceorientation",s);var c=function(c){var l=c.coords;e(l.heading)&&(t&&(t=!1,n("needMove")),l.speed>1?(a.push(l.heading),a.length>=5&&r.length>=5&&(o._win.removeEventListener("deviceorientation",s),o._nav.geolocation.clearWatch(u),o._gpsDiff=i(a)+i(r),o._start("orientationAndGPS"))):a=[])},l=function(){o._win.removeEventListener("deviceorientation",s),o._start(!1)},u=o._nav.geolocation.watchPosition(c,l,{enableHighAccuracy:!0})}}}();var t,e,n,i,o,r,a,s,c;o=null,L.Control.Markers=L.Control.extend({options:{position:"topleft",disableIcon:"fa-save",enableIcon:"fa-pencil",locate:null},onAdd:function(t){var e;return o=this,this.markers=[],this.loadMarkers(),e=L.DomUtil.create("div","leaflet-control-markers leaflet-bar leaflet-control"),this.link=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single fa fa-pencil",e),L.DomEvent.on(e,"click",L.DomEvent.stop).on(e,"click",function(t){return function(){return t.editing?t.stopEdit():t.startEdit()}}(this)).on(e,"dblclick",L.DomEvent.stop),t.on("click",function(t){return function(e){return t.editing?t.addMarker(e.latlng):void 0}}(this)),e},startEdit:function(){return this.editing=!0,L.DomUtil.removeClass(this.link,this.options.enableIcon),L.DomUtil.addClass(this.link,this.options.disableIcon),this.markers.forEach(function(t){return function(t){return t.dragging.enable()}}(this))},stopEdit:function(){return this.editing=!1,L.DomUtil.addClass(this.link,this.options.enableIcon),L.DomUtil.removeClass(this.link,this.options.disableIcon),this.markers.forEach(function(t){return function(t){return t.dragging.disable()}}(this)),this.saveMarkers()},loadMarkers:function(){var t;return t=store.get("markers")||[],t.forEach(function(t){return function(e){return t.addMarker(e)}}(this))},saveMarkers:function(){return store.set("markers",this.markers.map(function(t){return t.getLatLng()}))},addMarker:function(t){return o.markers.push(L.marker(t,{draggable:this.editing}).addTo(i).on("dblclick",this.removeMarker).on("click",this.showPopup))},removeMarker:function(){return o.editing?(this.closePopup(),i.removeLayer(this),o.markers.splice(o.markers.indexOf(this),1)):void 0},distanceInM:function(t){var e;return this.options.locate._event&&this.options.locate._active?(e=t.distanceTo(this.options.locate._event.latlng),Number(e.toFixed(1)).toLocaleString()+" m"):void 0},showPopup:function(){var t;return this.unbindPopup(),t=o.distanceInM(this.getLatLng()),t?this.bindPopup(t).openPopup():void 0}}),L.control.markers=function(t){return new L.Control.Markers(t)},t=null,L.Control.Compass=L.Control.extend({options:{position:"topleft",element:null,offset:0},onAdd:function(e){return t=this,Compass.needGPS(function(){return alert("Go outside and provide GPS")}).needMove(function(){return alert("Move forward")}).watch(function(t){return function(e){return L.DomUtil.removeClass(t.container,"hidden"),e+=window.orientation,t.colorNeedle(e),t.turnNeedle(e),t.options.element!==t.icon?t.showHeading(e):void 0}}(this)),this.container=L.DomUtil.create("div","leaflet-control-compass leaflet-bar leaflet-control hidden"),this.link=L.DomUtil.create("a","leaflet-bar-part leaflet-bar-part-single fa",this.container),this.icon=L.DomUtil.create("i","fa fa-arrow-up",this.link),this.options.element||(this.options.element=this.icon),this.container},colorElement:function(t,e,n){var i;return i=Math.abs(t)<=e?"addClass":"removeClass",L.DomUtil[i](this.options.element,n)},colorNeedle:function(t){var e;return e=100*Math.sin(t*(Math.PI/360)),this.colorElement(e,15,"accurate"),this.colorElement(e,3,"very")},turnNeedle:function(t){var e;return e=this.options.offset-t,this.options.element.style.webkitTransform="rotate("+e+"deg)"},showHeading:function(t){return this.link.innerHTML=""+Math.round(t)+"°"}}),L.control.compass=function(t){return new L.Control.Compass(t)},r=function(){return window.scrollTo(0,0)},window.addEventListener("orientationchange",r),r(),e=new L.Google("ROADMAP"),a=new L.Google("SATELLITE"),s=new L.Google("TERRAIN"),c=L.tileLayer("http://s3-eu-west-1.amazonaws.com/topo-slovenia/z{z}/{y}/{x}.png",{minZoom:10,maxNativeZoom:15,detectRetina:!0,attribution:'© <a href="http://www.gu.gov.si/">GURS</a>',unloadInvisibleTiles:!1}),i=L.map("map",{layers:e,minZoom:6}).setView([46,14.7],8),L.control.layers({Google:e,Satellite:a,Terrain:s,Topo:c}).addTo(i),L.control.scale({imperial:!1}).addTo(i),n=L.control.locate({setView:!1}).addTo(i),L.control.markers({locate:n}).addTo(i),L.control.compass({element:n.icon,offset:-45}).addTo(i),n.locate()}).call(this);