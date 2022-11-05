import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import {transformExtent, get as getProj} from 'ol/proj';


const ext = transformExtent([12.2401111182, 48.5553052842, 18.8531441586, 51.1172677679], getProj('EPSG:4326'), getProj('EPSG:3857'));

const control = new ScaleLine({
  bar: true,
  steps: parseInt(2, 10),
  text: false,
  minWidth: 100,
});

window.osmLayer = new TileLayer({
  source: new OSM(),
});

window.ortofotoLayer = new TileLayer({
  source: new TileWMS({
    url: 'https://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx',
    params: {'LAYERS': 'GR_ORTFOTORGB'},
  })
})

const map = new Map({
  target: 'map',
  layers: [
    window.osmLayer
  ],
  view: new View({
    center: [1610658.6414825092, 6459122.7899542395],
    zoom: 12,
    minZoom: 9,
    maxZoom: 20,
    extent: ext
  }),
  controls: defaultControls().extend([control])
});

map.once('postrender', function() {
  document.querySelector('.modal').style.display = "block"
});

window.map = map;
