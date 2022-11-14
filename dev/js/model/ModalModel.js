import {AbstractModel} from "./AbstractModel";

class ModalModel extends AbstractModel {
    isOpen = false;
}

export class GeneralModalModel extends ModalModel {

    handleUpdate(data) {
        if (data === 'closeModal') {this.isOpen = false}
    }

}

export class LayerModalModel extends ModalModel {

    layerControlArrayModel = [];

    handleUpdate(data) {
        if (data === 'closeModal') {this.isOpen = false}
    }

}