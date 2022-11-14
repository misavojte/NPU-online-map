import {AbstractView} from "./AbstractView";

export class MenuView extends AbstractView {
    constructor(controller) {
        super(controller, document.querySelector('nav'), false);
    }
}