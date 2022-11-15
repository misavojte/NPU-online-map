import {AbstractView} from "../view/AbstractView";
import {UpdateMessage} from "../core/UpdateMessage";

export class AbstractModel {

    observers = [];
    isView = false;

    /**
     *
     * @param {AbstractModel|AbstractView} observer
     * Add an observer for changes to this.observers
     */
    addObserver(observer) {
        this.observers.push(observer);
    }

    /**
     *
     * @param {AbstractModel|AbstractView} observer
     * Remove an observer for changes from this.observers
     */
    removeObserver(observer) {
        const removeIndex = this.observers.findIndex((obs) => {
            return observer === obs;
        });

        if (removeIndex !== -1) {
            this.observers = this.observers.slice(removeIndex, 1);
        }
    }

    /**
     *
     * @param {UpdateMessage} msg
     * Loops over this.observers and calls the update method on each observer.
     * The state object will call this method everytime it is updated.
     */
    notify(msg) {
        if (this.observers.length > 0) {
            this.observers.forEach((observer) => {
                if(msg.isViewOnly) {
                    if(!observer.isView) {console.log("not a view", observer, this); return}
                }
                let childMsg = msg.createChildMessage();
                observer.update(childMsg)
            });
        }
    }

    /**
     * 
     * @param {UpdateMessage} msg
     * Gets called by the AbstractModel::notify method.
     * Firstly the update is handled. If it returns TRUE, notify method is called.
     */
    update(msg) {
        console.log('update received', this)
        if (this.handleUpdate(msg)) this.notify(msg);
    }

    /**
     *
     * @param {UpdateMessage} msg
     */
    handleUpdate(msg) {
        console.warn("handleUpdate method was not implemented in model", this);
        return false;
    }

    /**
     *
     * @param {string} type
     * @param {Object} body
     * @param {boolean} isViewOnly
     */
    postNotification(type, body, isViewOnly = true) {
        this.notify(new UpdateMessage(type, body, isViewOnly))
    }

}