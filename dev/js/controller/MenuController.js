import {AbstractController} from "./AbstractController";

export class MenuController extends AbstractController {

    /**
     *
     * @param {MenuModel} menuModel
     */
    constructor(menuModel) {
        super(menuModel);
    }

    handleClickEvent(e) {
        const id = e.target.closest('.js-click').id.substring(2);
        this.postUpdate('toggleModal', {'open': true, 'id': id});
    }
}