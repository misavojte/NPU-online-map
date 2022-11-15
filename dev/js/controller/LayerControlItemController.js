import {AbstractController} from "./AbstractController";

export class LayerControlItemController extends AbstractController {

    /**
     *
     * @param {LayerControlItemModel} model
     */
    constructor(model) {
        super(model);
    }

    handleClickEvent(e) {
        const direction = e.target.dataset.direction;
        const order = direction === 'up' ? this.model.order + 1 : this.model.order - 1;
        this.postUpdate('layerOrderInit', {order, direction})
    }

    handleChangeEvent(e) {
        switch (e.target.name) {
            case 'opacity' : this.postUpdate('layerOpacity', {'opacity': e.target.value/100}); break;
            case 'visibility' : this.postUpdate('layerVisibility', {'isVisible': e.target.checked});
        }
    }
}