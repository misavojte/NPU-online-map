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
        if (e.target.closest('#m-about')) {
            this.model.update({type: 'openModal', body: 'about'});
        }
    }
}