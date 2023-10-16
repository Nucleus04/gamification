import { Meteor } from 'meteor/meteor';
import DashboardMethods from '../../api/server/methods/DashboardMethods';
import ReviewMethods from '../../api/server/methods/ReviewMethods';
import BonusesMethod from '../../api/server/methods/BonusesMethod';
import GoalsMethods from '../../api/server/methods/GoalsMethods';
import MembersMethod from '../../api/server/methods/MembersMethod';
import TeamsMethod from '../../api/server/methods/TeamsMethod';
import TimeSheetMethod from '../../api/server/methods/TimeSheetMethod';
import ReportMethods from '../../api/server/methods/ReportMethods';
import TimelineMethods from '../../api/server/methods/TimelineMethods';
import AttendanceMethod from '../../api/server/methods/AttendanceMethod';
import ActivityMethod from '../../api/server/methods/ActivityMethod';
import FeedbackMethods from '../../api/server/methods/FeedbackMethods';
import SettingsMethod from '../../api/server/methods/SettingsMethod';
import ReviewPublication from '../../api/server/publication/ReviewPublication';
import HubstaffMethod from '../../api/server/methods/HubstaffMethod';
import GoalsPublication from '../../api/server/publication/GoalsPublication';
import GamificationPublication from '../../api/server/publication/GamificationPublication';
import AttendancePublication from '../../api/server/publication/AttendancePublication';
import FeedbackPublication from '../../api/server/publication/FeedbackPublication';
import RewardMethods from '../../api/server/methods/RewardMethods';
class Server {
    _init() {

        return Meteor.startup(async () => {
            console.log("Meteor Server start...");
            DashboardMethods.methods();
            ReviewMethods.methods();
            BonusesMethod.methods();
            GoalsMethods.methods();
            MembersMethod.method();
            TeamsMethod.method();
            TimeSheetMethod.method();
            ReportMethods.method();
            TimelineMethods.method();
            AttendanceMethod.method();
            ActivityMethod.method();
            FeedbackMethods.method();
            SettingsMethod.method();
            ReviewPublication.publication();
            GoalsPublication.publication();
            GoalsPublication.pointsystem();
            GoalsPublication.userGoalspublication();
            HubstaffMethod.method();
            GamificationPublication.pointsAndCredits();
            AttendancePublication.getPoints();
            FeedbackPublication.point_system();
            RewardMethods.methods();
            GamificationPublication.exchangeRate();
            GamificationPublication.exchangeHistoryPublication();
            GamificationPublication.rewardList();
            GamificationPublication.inventory();
            FeedbackPublication.feedback();
            GamificationPublication.leaderboards();
        })
    }
}


export default new Server;