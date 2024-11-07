let intervalId;
const alarmSound = new Audio('clock-alarm-8761.mp3');
function setAlarm() {
    var alarmTime = document.getElementById('alarmTime').value;
    var alarm = new Date();
    var [hours, minutes] = alarmTime.split(':');
    alarm.setHours(hours);
    alarm.setMinutes(minutes);
    alarm.setSeconds(0);
    var now = new Date();

    // If the alarm time is in the past, set it for the next day
    if (alarm <= now) {
        alarm.setDate(alarm.getDate() + 1);
    }

    var timeToAlarm = alarm - now;
    console.log('Time to alarm:', timeToAlarm);

    var resultDiv = document.getElementById('result');
    resultDiv.innerText = '';

    if (timeToAlarm >= 0) {
        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(() => {
            var now = new Date();
            var timeToAlarm = alarm - now;
            if (timeToAlarm <= 0) {
                clearInterval(intervalId);
                resultDiv.innerText = 'Wake Up';
                alarmSound.play(); // Play the alarm sound
            } else {
                var remainingTime = Math.floor(timeToAlarm / 1000); // Convert to seconds
                var hours = Math.floor(remainingTime / 3600);
                var minutes = Math.floor((remainingTime % 3600) / 60);
                var seconds = remainingTime % 60;
                resultDiv.innerText = `Remaining time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
            }
        }, 1000);

    } else {
        resultDiv.innerText = 'Invalid time';
    }
}
