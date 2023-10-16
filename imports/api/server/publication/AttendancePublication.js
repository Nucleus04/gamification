import { Meteor } from "meteor/meteor";
import { PUBLICATION } from "../../common";
import { pointSystem } from "../../db";


class AttendancePublication {
    getPoints() {
        return Meteor.publish(PUBLICATION.ATTENDANCE_POINT_RETRIEVAL, () => {
            return pointSystem.find({ target: "attendance" });
        })
    }
}



export default new AttendancePublication