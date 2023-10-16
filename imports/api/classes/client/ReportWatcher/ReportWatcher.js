import Watcher from "../Watcher";
import Client from "../Client";
import { REPORT } from "../../../common";

class ReportWatcher extends Watcher {
    constructor(parent) {
        super(parent);
    }


    summary() {
        return new Promise((resolve, reject) => {
            this.Parent.callFunc(REPORT.RETREIVESUMMARY).then((result) => {
                console.log(result);
                resolve(result);
            }).catch((error) => {
                console.log(error);
            })
        })
    }
}


export default new ReportWatcher(Client);