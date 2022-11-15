import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import {ScaleLine, defaults as defaultControls} from 'ol/control';
import {transformExtent, get as getProj} from 'ol/proj';
import {GeneralModalModel, LayerModalModel} from "./js/model/ModalModel";
import {ModalController} from "./js/controller/ModalController";
import {GeneralModalView, LayerModalView} from "./js/view/ModalView";
import {MenuView} from "./js/view/MenuView";
import {MenuController} from "./js/controller/MenuController";
import {MenuModel} from "./js/model/MenuModel";
import {LayerControlItemModel} from "./js/model/LayerControlItemModel";
import {LayerControlItemController} from "./js/controller/LayerControlItemController";
import {LayerControlItemView} from "./js/view/LayerControlItemView";


const ext = transformExtent([12.2401111182, 48.5553052842, 18.8531441586, 51.1172677679], getProj('EPSG:4326'), getProj('EPSG:3857'));

const control = new ScaleLine({
  bar: true,
  steps: parseInt(2, 10),
  text: false,
  minWidth: 100,
});

window.osmLayer = new TileLayer({
  zIndex: 2,
  opacity: 0.8,
  source: new OSM()
});

window.ortofotoLayer = new TileLayer({
  zIndex: 1,
  visible: false,
  source: new TileWMS({
    url: 'https://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx',
    params: {'LAYERS': 'GR_ORTFOTORGB'},
    attributions: 'HELLO'
  }),
})

//defaultControls().extend([control])

const map = new Map({
  target: 'map',
  layers: [
    window.osmLayer,
      window.ortofotoLayer
  ],
  view: new View({
    center: [1610658.6414825092, 6459122.7899542395],
    zoom: 12,
    minZoom: 9,
    maxZoom: 20,
    extent: ext
  }),
  controls: defaultControls().extend([new ScaleLine()])
});

window.lcv = new LayerControlItemView(new LayerControlItemController(new LayerControlItemModel(window.osmLayer, 'OpenStreetMap', '/assets/img/map-pr1.png')));
window.ocv = new LayerControlItemView(new LayerControlItemController(new LayerControlItemModel(window.ortofotoLayer, 'Ortofoto ČÚZK', '/assets/img/map-pr2.png')));

const aboutModalView = new GeneralModalView(new ModalController(new GeneralModalModel('about')));
const layerModalModel = new LayerModalModel('layer');
layerModalModel.addLayerControl(window.ocv);
layerModalModel.addLayerControl(window.lcv);

const layerModalView = new LayerModalView(new ModalController(layerModalModel));





const menuModel = new MenuModel();
menuModel.addObserver(aboutModalView.controller.model);
menuModel.addObserver(layerModalView.controller.model);


new MenuView(new MenuController(menuModel));

window.map = map;
