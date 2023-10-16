import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../ui/pages/Login";
import React from "react";
import Dashboard from "../../ui/pages/Dashboard";
import Signup from "../../ui/pages/Signup";
import Review from "../../ui/pages/Review";
import Goals from "../../ui/pages/Goals";
import Bonuses from "../../ui/pages/Bonuses";
import Members from "../../ui/pages/Members";
import Teams from "../../ui/pages/Teams";
import Reports from "../../ui/pages/Reports";
import TimeSheet from "../../ui/pages/Timesheet";
import Timeline from "../../ui/pages/Timeline";
import Attendance from "../../ui/pages/Attendance";
import ActivityLevel from "../../ui/pages/ActivityLevel";
import Feedbacks from "../../ui/pages/360Feedback";
import Insight from "../../ui/pages/Insights";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "../../ui/pages/Settings";
import Gamification from "../../ui/pages/Gamification";
function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/sign-up" element={<Signup />} />
                {/* <Route exact path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
                {/* <Route exact path="/review" element={<ProtectedRoute element={<Review />} />} /> */}
                <Route exact path="/goals" element={<ProtectedRoute element={<Goals />} />} />
                {/* <Route exact path="/bonuses" element={<ProtectedRoute element={<Bonuses />} />} /> */}
                {/* <Route exact path='/members' element={<ProtectedRoute element={<Members />} />} /> */}
                {/* <Route exact path='/teams' element={<ProtectedRoute element={<Teams />} />} /> */}
                <Route exact path='/reports' element={<ProtectedRoute element={<Reports />} />} />
                <Route exact path='/timesheets' element={<ProtectedRoute element={<TimeSheet />} />} />
                <Route exact path='/timeline' element={<ProtectedRoute element={<Timeline />} />} />
                <Route exact path='/attendance' element={<ProtectedRoute element={<Attendance />} />} />
                <Route exact path='/activity-level' element={<ProtectedRoute element={<ActivityLevel />} />} />
                <Route exact path='/360-feedback' element={<ProtectedRoute element={<Feedbacks />} />} />
                {/* <Route exact path='/insights' element={<ProtectedRoute element={<Insight />} />} /> */}
                <Route exact path='/settings' element={<ProtectedRoute element={<Settings />} />} />
                <Route exact path='/gamification' element={<ProtectedRoute element={<Gamification />} />} />
            </Routes>
        </BrowserRouter>
    )
}


export default Routers;