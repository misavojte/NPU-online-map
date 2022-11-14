export class AbstractController {

    /**
     *
     * @param {AbstractModel} model
     */
    constructor(model) {
        this.model = model;
    }

    /**
     *
     * @param {Event} e
     * Fire according event type handler. These type handlers should be customized to do expected actions.
     */
    handleEvent(e) {
        e.stopPropagation();
        switch (e.type) {
            case 'click' : this.handleClickEvent(e); break;
            case 'change' : this.handleChangeEvent(e); break;
            default : this.handleDefaultEvent(e);
        }
    }

    handleClickEvent(e) {this.handleDefaultEvent(e)}

    handleChangeEvent(e) {this.handleDefaultEvent(e)}

    handleDefaultEvent(e) {
        console.warn('Event type not registered in controller', this, e)
    }

}