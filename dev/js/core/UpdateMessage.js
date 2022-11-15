export class UpdateMessage {

    /**
     *
     * @param {string} type
     * @param {Object} body
     * @param {boolean} isViewOnly
     */
    constructor(type, body, isViewOnly) {
        this.type = type;
        this.body = body;
        this.isViewOnly = isViewOnly;
    }

    createChildMessage() {
        return new UpdateMessage(this.type, this.body, this.isViewOnly)
    }
}