import {AbstractModel} from "./AbstractModel";

export class LayerControlItemModel extends AbstractModel {

    imgSrc;

    /**
     * @param {TileLayer} layer
     * @param {string} title
     * @param {string} imgSrc
     */
    constructor(layer, title, imgSrc = "/assets/img/NPU.png") {
        super();
        this.layer = layer;
        this.opacity = layer.getOpacity();
        this.order = layer.getZIndex();
        this.title = title;
        this.id = title;
        this.isVisible = layer.getVisible();
        this.imgSrc = imgSrc;
    }

    handleUpdate(msg) {
        switch (msg.type) {
            case 'layerVisibility' : return this.#setVisibility(msg);
            case 'layerOpacity' : return this.#setOpacity(msg);
            case 'layerOrderInit' : return this.#orderInit(msg);
        }
    }

    #orderInit(msg) {
        msg.body.id = this.id;
        return true;
    }

    #setVisibility(msg) {
        console.log(msg);
        if (typeof msg.body.isVisible !== "boolean") return false;
        this.isVisible = msg.body.isVisible;
        this.layer.setVisible(this.isVisible);
        console.log(msg);
        return false
    }

    #setOpacity(msg) {
        this.opacity = msg.body.opacity;
        this.layer.setOpacity(this.opacity);
        return false
    }

    setOrder(order) {
        this.order = order;
        this.layer.setZIndex(this.order);
        this.postNotification('setOrder',{'order':order})
    }

}