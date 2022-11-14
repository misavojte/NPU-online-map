export class AbstractModel {

    observers = [];

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
     * @param data
     * Loops over this.observers and calls the update method on each observer.
     * The state object will call this method everytime it is updated.
     */
    notify(data) {
        if (this.observers.length > 0) {
            this.observers.forEach((observer) => observer.update(data));
        }
    }

    /**
     * 
     * @param data
     * Gets called by the Subject::notify method.
     */
    update(data) {
        console.log('update received', this)
        this.handleUpdate(data);
        this.notify(data);
    }

    handleUpdate(data) {
        console.warn("handleUpdate method was not implemented in model", this)
    }

}