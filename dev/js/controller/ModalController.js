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
            this.postUpdate('toggleModal',  {'open': false}, true)
            return;
        }
        this.handleDefaultEvent(e);
    }
}