import Watcher from "./Watcher";
import { Meteor } from 'meteor/meteor';

class Client extends Watcher {
    constructor(props) {
        super(props);
        this.secureTransaction();
    }
}

export default new Client;