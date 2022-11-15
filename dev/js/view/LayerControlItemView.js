import {AbstractView} from "./AbstractView";
import '/css/layerControl.css';

export class LayerControlItemView extends AbstractView {
    constructor(controller) {
        super(controller, LayerControlItemView.createElement(controller.model));
    }

    /**
     *
     * @param {LayerControlItemModel} model
     * @return {HTMLElement}
     */
    static createElement(model) {
        const element = document.createElement('div');
        element.className = 'layer-control';
        element.innerHTML = LayerControlItemView.createInnerHtml(model);
        element.style.order = model.order;
        return element
    }

    /**
     *
     * @param {LayerControlItemModel} model
     * @return {string}
     */
    static createInnerHtml(model) {
        return `
        <img src="${model.imgSrc}" alt="${model.title}">
        <div>
            <strong>${model.title}</strong>
            <div>Vrstva aktivována</div>
            <input name="visibility" class="js-change" type="checkbox"${model.isVisible?' checked':''}>
            <div>Průhlednost</div>
            <input name="opacity" class="js-change" type="range" min="0" max="100" value="${model.opacity*100}" step="5">
            <div>Pořadí vrstvy</div>
            <div>
                <button class="js-click" data-direction="up">⬆</button>
                <button class="js-click" data-direction="down">⬇</button>
            </div>
        </div>
        `
    }

    /**
     *
     * @param {UpdateMessage} data
     */
    handleUpdate(data) {
        switch (data.type) {
            case 'layerOrderInit' : break;
            case 'setOrder' : this.element.style.order = data.body.order;
        }
    }
}