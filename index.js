// Your code here
function createEmployeeRecord(employeeObj) {
    return {
        firstName: employeeObj[0],
        familyName: employeeObj[1],
        title: employeeObj[2],
        payPerHour: employeeObj[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(function(employeeObj) {
        return createEmployeeRecord(employeeObj)
    })
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

function hoursWorkedOnDate(employee, dateMatch) {
    let inEvent = employee.timeInEvents.find((e) => {
        return e.date === dateMatch
    })

    let outEvent = employee.timeOutEvents.find((e) => {
        return e.date === dateMatch
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateMatch) {
    let grossSalary = hoursWorkedOnDate(employee, dateMatch)
        * employee.payPerHour;
    return parseFloat(grossSalary.toString())
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map((e) => {
        return e.date
    })

    let payable = dates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(function(rec) {
        return rec.firstName === firstName
    })
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((memo,rec) => {
        return memo + allWagesFor(rec)
    }, 0)
}

