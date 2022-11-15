import {AbstractView} from "./AbstractView";

class ModalView extends AbstractView {
    constructor(controller) {
        super(controller, document.getElementById(controller.model.id));
    }
    handleToggle(data) {
        this.element.style.display = 'none';
        if (!data.body.open) {this.element.style.display = 'none'; return}
        if (data.body.id === this.element.id) {this.element.style.display = ''}
    }
}

export class GeneralModalView extends ModalView {
    constructor(controller) {
        super(controller);
    }

    /**
     *
     * @param {UpdateMessage} data
     */
    handleUpdate(data) {
        switch (data.type) {
            case 'toggleModal' : this.handleToggle(data); break;
        }
    }
}

export class LayerModalView extends ModalView {

    constructor(controller) {
        super(controller)
        this.#addLayerControls()
    }

    /**
     *
     * @param {UpdateMessage} data
     */
    handleUpdate(data) {
        switch (data.type) {
            case 'toggleModal' : this.handleToggle(data); break;
        }
    }

    #addLayerControls() {
        const views = this.controller.model.layerControlArray;
        for (let i = 0; i < views.length; i++) {
            this.element.querySelector('.layer-container').append(views[i].element)
        }
    }

}