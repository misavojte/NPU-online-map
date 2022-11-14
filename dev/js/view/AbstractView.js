export class AbstractView {

    /**
     *
     * @param {AbstractController} controller
     * @param {HTMLElement} element
     * @param {boolean} registerToModel
     */
    constructor(controller, element, registerToModel = true) {
        this.element = element;
        this.controller = controller;
        if (registerToModel) this.controller.model.addObserver(this);
        this.registerEventListeners();
    }

    registerEventListeners() {
        const EVENT_TYPES = ['click', 'change'];
        for (let eventIndex = 0; eventIndex < EVENT_TYPES.length; eventIndex++) {
            const toRegisterEvents = this.element.getElementsByClassName(`js-${EVENT_TYPES[eventIndex]}`);
            for (let i = 0; i < toRegisterEvents.length; i++) {
                toRegisterEvents[i].addEventListener(EVENT_TYPES[eventIndex], this.controller)
            }
        }
    }

    /**
     * Gets called by the AbstractModel::notify method.
     */
    update(data) {
        console.log('update received', this);
        this.handleUpdate(data);
    }

    handleUpdate(data) {
        console.warn("update method in view not implemented", this)
    }
}