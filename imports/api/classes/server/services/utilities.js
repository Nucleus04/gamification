

class utilities {
    calculateAverageActivity(activities) {
        let percentage = [];
        activities.forEach((element) => {
            let totalhour = element.billable;
            let totalactive = element.overall;
            percentage.push(totalactive / totalhour * 100);
        })
        let total = 0;
        for (let i = 0; i < percentage.length; i++) {
            total = total + percentage[i];
        }
        total = total / percentage.length;
        let notNumber = isNaN(total);
        if (notNumber) {
            total = 0;
        }
        return parseFloat(total).toFixed(2);
    }

    getPreviousSunday(currentDate) {
        const dayOfWeek = currentDate.getDay();
        const daysUntilSunday = (dayOfWeek + 7 - 1) % 7;
        const previousSunday = new Date(currentDate);
        previousSunday.setDate(currentDate.getDate() - daysUntilSunday);

        return previousSunday;
    }

    getAverageActiveTime(activities) {
        let totalTime = 0;
        activities.forEach(element => {
            totalTime = totalTime + element.overall;
        });

        let hour = Math.floor(totalTime / activities.length / 360);
        let minute = Math.floor(((totalTime / activities.length) % 360) % 60);

        return {
            hour,
            minute
        };
    }


    getAverageOfficeTime(activities) {
        let totalTime = 0;
        activities.forEach(element => {
            totalTime = totalTime + element.billable;
        });
        let hour = Math.floor(totalTime / activities.length / 360);
        let minute = Math.floor(((totalTime / activities.length) % 360) % 60);

        return {
            hour,
            minute
        };
    }

    percentageToday(hourToday, hourYesterday) {
        let today = Number(hourToday);
        let yesterday = Number(hourYesterday);
        let percentage = 0;
        if (today > 0 && yesterday > 0) {
            let difference = today - yesterday;
            percentage = (difference / yesterday) * 100;
        } else {
            if (today > yesterday) {
                percentage = 100;
            } else {
                percentage = -100;
            }
        }

        return percentage;
    }


    getTotalOfficeTime(activities) {
        let totalTime = 0;
        activities.forEach(element => {
            totalTime = totalTime + element.billable;
        });
        let hour = Math.floor(totalTime / activities.length / 360);
        let minute = Math.floor(((totalTime / activities.length) % 360) % 60);

        if (activities.length > 0) {
            return {
                hour,
                minute
            };
        } else {
            return {
                hour: 0,
                minute: 0,
            }
        }
    }

    sortAttendanceByCreatedAt(attendanceArray) {
        return attendanceArray.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
        });
    }

    countUniqueUsers(attendanceArray) {
        const uniqueUserIds = new Set();
        attendanceArray.forEach((attendance) => {
            uniqueUserIds.add(attendance.userId);
        });
        return uniqueUserIds.size;
    }

    countDifferentDays(attendanceArray) {
        const uniqueDays = new Set();
        attendanceArray.forEach((attendance) => {
            const date = new Date(attendance.created_at).toLocaleDateString();
            uniqueDays.add(date);
        });
        return uniqueDays.size;
    }

    getAttendanceForToday(attendanceArray) {
        const today = new Date().toLocaleDateString();
        return attendanceArray.filter((attendance) => {
            const createdDate = new Date(attendance.created_at).toLocaleDateString();
            return createdDate === today;
        });
    }

    getAttendanceForYesterday(attendanceArray) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Subtract one day from the current date
        const yesterdayString = yesterday.toLocaleDateString(); // Get the "YYYY-MM-DD" format for yesterday

        return attendanceArray.filter((attendance) => {
            const createdDate = new Date(attendance.created_at).toLocaleDateString();
            return createdDate === yesterdayString;
        });
    }

    isLateAndUnderTime(record) {
        // Parse the 'created_at' date and time
        const createdAt = new Date(record.created_at);

        // Set the target time for the 8 PM shift
        const targetTime = new Date(createdAt);
        targetTime.setHours(20, 0, 0, 0); // 8 PM

        // Check if the 'created_at' time is later than 8 PM
        const isLate = createdAt > targetTime;

        let isUnderTime = false;
        if (Number(record.billable) < 32400) {
            isUnderTime = true;
        }
        return {
            isLate,
            isUnderTime,
        };
    }
}



export default new utilities;