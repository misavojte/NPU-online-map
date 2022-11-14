import {AbstractController} from "./AbstractController";

export class ModalController extends AbstractController {

    /**
     *
     * @param {ModalModel} modalModel
     */
    constructor(modalModel) {
        super(modalModel);
    }

    handleClickEvent(e) {
        if (e.target.closest('.modal-close')) {
            this.model.update('closeModal');
            return;
        }
        this.handleDefaultEvent(e);
    }
}