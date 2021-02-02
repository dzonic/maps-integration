var map;

function init() {
  map = new OpenLayers.Map({
    div: "map",
    projection: new OpenLayers.Projection("EPSG:900913"),
  });

  var osm = new OpenLayers.Layer.OSM();
  var gmap = new OpenLayers.Layer.Google("Google Maps Normal");
  var gmapPhysical = new OpenLayers.Layer.Google("Google Maps Physical", {
    type: google.maps.MapTypeId.TERRAIN,
    sphericalMercator: true,
  });

  var srbija = new OpenLayers.Layer.WMS(
    "Država Srbija",
    "http://localhost:8080/geoserver/cite/wms",
    { layers: "cite:Srbija", transparent: true, format: "image/gif" },
    { visibility: false },
    { displayInLayerSwitcher: true }
  );

  var pokrajine = new OpenLayers.Layer.WMS(
    "Pokrajine u Srbiji",
    "http://localhost:8080/geoserver/cite/wms",
    { layers: "cite:Pokrajina", transparent: true, format: "image/gif" },
    { visibility: false },
    { displayInLayerSwitcher: true }
  );
  var cenej = new OpenLayers.Layer.WMS(
    "Čenej",
    "http://localhost:8080/geoserver/cite/wms",
    { layers: "cite:Cenej", transparent: true, format: "image/gif" },
    { visibility: false },
    { displayInLayerSwitcher: true }
  );

  var reke = new OpenLayers.Layer.WMS(
    "Reke",
    "http://localhost:8080/geoserver/cite/wms",
    { layers: "cite:Reke", transparent: true, format: "image/gif" },
    { visibility: false },
    { displayInLayerSwitcher: true }
  );

  var put = new OpenLayers.Layer.WMS(
    "Putevi u Srbiji",
    "http://localhost:8080/geoserver/cite/wms",
    { layers: "cite:Put", transparent: true, format: "image/gif" },
    { visibility: false },
    { displayInLayerSwitcher: true }
  );

  var hidroelektrane = new OpenLayers.Layer.WMS(
    "Hidroelektrane u Srbiji",
    "http://localhost:8080/geoserver/cite/wms",
    { layers: "cite:Hidroelektrane", transparent: true, format: "image/gif" },
    { visibility: false },
    { displayInLayerSwitcher: true }
  );

  function yandex_getTileURL(bounds) {
    var res = this.map.getResolution();
    var maxExtent = this.maxExtent ? this.maxExtent : yandexBounds;
    var tileW = this.tileSize ? this.tileSize.w : 256;
    var tileH = this.tileSize ? this.tileSize.h : 256;
    var x = Math.round((bounds.left - maxExtent.left) / (res * tileW));
    var y = Math.round((maxExtent.top - bounds.top) / (res * tileH));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);
    if (y < 0 >= limit) {
      return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
      x = ((x % limit) + limit) % limit;
      url = this.url ? this.url : "http://vec02.maps.yandex.net/";
      return url + "tiles?l=map&v=2.2.3&x=" + x + "&y=" + y + "&z=" + z;
    }
  }

  var yandexBounds = new OpenLayers.Bounds(
    -20037508,
    -20002151,
    20037508,
    20072865
  );

  var yandexMaps = new OpenLayers.Layer.TMS(
    "Yandex",
    "http://vec02.maps.yandex.net/",
    {
      maxExtent: yandexBounds,
      type: "png",
      getURL: yandex_getTileURL,
      numZoomLevels: 18,
      attribution: '<a href="http://beta-maps.yandex.ru/">Яндекс.Карты</a>',
      transitionEffect: "resize",
    }
  );

  map.addLayers([
    osm,
    gmap,
    gmapPhysical,
    yandexMaps,
    srbija,
    pokrajine,
    reke,
    put,
    hidroelektrane,
    cenej,
  ]);

  map.addControl(new OpenLayers.Control.LayerSwitcher());

  map.setCenter(
    new OpenLayers.LonLat(20.457273, 44.787197).transform(
      new OpenLayers.Projection("EPSG:4326"),
      map.getProjectionObject()
    ),
    6
  );
}
