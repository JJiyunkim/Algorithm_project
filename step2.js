function clock() {
    var time = new Date();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var month=time.getMonth()+1; 
    var date=time.getDate();
    var day = new Date();
    const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
    var week = WEEKDAY[day.getDay()];
    var AmPm ="AM";
    if(hours > 12){   
        var AmPm ="PM";
        hours %= 12;
    }
    var monthtext = document.getElementById("month");
    var datetext = document.getElementById("date");
    var weektext = document.getElementById("week");
    var timetext = document.getElementById("time");
    monthtext.innerText = month;
    datetext.innerText = date;
    weektext.innerText = week;
    timetext.innerText = `현재 시각 ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${AmPm}`
}
clock();
setInterval(clock, 1000); 

function save_time(){
    sessionStorage.setItem("studytime", JSON.stringify(document.getElementById(`studytime`).value));
    var finished = [];
    finished.push(sessionStorage.getItem("finished"));
    sessionStorage.setItem("finished", finished);
    console.log(sessionStorage);
}