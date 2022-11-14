import {AbstractView} from "./AbstractView";

class ModalView extends AbstractView {
    constructor(id, controller) {
        super(controller, document.getElementById(id));
    }
}

export class GeneralModalView extends ModalView {
    constructor(id, controller) {
        super(id, controller);
    }

    handleUpdate(data) {
        switch (data) {
            case 'closeModal' : this.element.style.display = 'none'; break;
        }
        if (data.type === 'openModal' && data.body === this.element.id) this.element.style.display = '';
    }
}