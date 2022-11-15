import {AbstractModel} from "./AbstractModel";

class ModalModel extends AbstractModel {
    constructor(id, isOpen = false) {
        super();
        this.id = id;
        this.isOpen = isOpen;
    }
}

export class GeneralModalModel extends ModalModel {

    handleUpdate(data) {
        if (data.type === 'toggleModal') {this.isOpen = data.body.open; data.isViewOnly = true; return true}
        return false
    }

}

export class LayerModalModel extends ModalModel {

    /**
     *
     * @type {[LayerControlItemView]}
     */
    layerControlArray = [];

    handleUpdate(data) {
        if (data.type === 'toggleModal') {this.isOpen = data.body.open; return true}
        if (data.type === 'toggleModal') {this.isOpen = data.body.open; return true}
        if (data.type === 'layerOrderInit') {this.setLayerControlsOrder(data); return false}
        return false
    }

    setLayerControlsOrder(msg) {
        const submittedOrder = msg.body.order;
        if (submittedOrder <= 0) return;
        if (submittedOrder > this.layerControlArray.length) return;
        this.layerControlArray.forEach((x)=>{
            const model = x.controller.model;
            if (model.id === msg.body.id) {model.setOrder(submittedOrder); return}
            if (model.order === submittedOrder) {
                model.setOrder(msg.body.direction === 'up' ? submittedOrder-1 : submittedOrder+1 )
            }
        })
    }

    addLayerControl(layerControlView) {
        layerControlView.controller.model.addObserver(this);
        this.layerControlArray.push(layerControlView);
    }

}