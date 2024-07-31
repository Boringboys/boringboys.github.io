// 动感、炫彩 模式
// 注释里的属性名加了#符号，去掉#就是熟悉名
// 禁用 <-> 开启
// di#s-co#lor <-> co#lor
// di#s-back#grou#nd-co#lor <-> back#grou#nd-co#lor

let festival = [
    {
        "name": "冬至",
        "date": "2023.12.22"
    },
    {
        "name": "元旦节",
        "date": "2024.1.1"
    },
    {
        "name": "腊八",
        "date": "2024.1.18"
    },
    {
        "name": "北方小年",
        "date": "2024.2.2"
    },
    {
        "name": "南方小年",
        "date": "2024.2.3"
    },
    {
        "name": "除夕",
        "date": "2024.2.9"
    },
    {
        "name": "春节",
        "date": "2024.2.10"
    },
    {
        "name": "元宵",
        "date": "2024.2.24"
    },
    {
        "name": "清明",
        "date": "2024.4.4"
    },
    {
        "name": "端午节",
        "date": "2024.6.10"
    },
    {
        "name": "父亲节",
        "date": "2024.6.16"
    },
    {
        "name": "中秋节",
        "date": "2024.9.17"
    },
    {
        "name": "国庆节",
        "date": "2024.10.1"
    },
    {
        "name": "元旦节",
        "date": "2025.1.1"
    },
    {
        "name": "北方小年",
        "date": "2025.1.22"
    },
    {
        "name": "南方小年",
        "date": "2025.1.23"
    },
    {
        "name": "除夕",
        "date": "2025.1.28"
    },
    {
        "name": "春节",
        "date": "2025.1.29"
    }
]

let vacationDays = [
    "2024.1.1",
    "2024.2.10-2024.2.17",
    "2024.4.4-2024.4.6",
    "2024.5.1-2024.5.5",
    "2024.6.10",
    "2024.9.15-2024.9.17",
    "2024.10.1-2024.10.7"
]

let workDays = [
    "2024.2.4",
    "2024.2.18",
    "2024.4.7",
    "2024.4.28",
    "2024.5.11",
    "2024.9.14",
    "2024.9.29",
    "2024.10.12"
]

let dateDayToWeek = [
    "周日", "周一", "周二", "周三", "周四", "周五", "周六"
]

let vacationDates = []
let workDates = []

for (let i = 0; i < vacationDays.length; i++) {
    // console.log(vacationDays[i]);
    if (vacationDays[i].indexOf("-") > -1) {
        // console.log("日期范围！");
        let startDateSplit = vacationDays[i].split("-")[0].split(".");
        let endDateSplit = vacationDays[i].split("-")[1].split(".");
        startDateSplit[1] = startDateSplit[1].padStart(2, "0");
        startDateSplit[2] = startDateSplit[2].padStart(2, "0");
        endDateSplit[1] = endDateSplit[1].padStart(2, "0");
        endDateSplit[2] = endDateSplit[2].padStart(2, "0");
        let startDate = new Date(startDateSplit.join("-") + "T00:00:00")
        let endDate = new Date(endDateSplit.join("-") + "T00:00:00")
        // console.log("开始日期：", startDate, "结束日期", endDate);

        let newDate = startDate;
        while (newDate <= endDate) {
            // console.log("新日期：", newDate);
            // vacationDates.push(new Date(newDate.valueOf()));
            // debugger;
            vacationDates.push(newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate());
            newDate.setDate(newDate.getDate() + 1);
        }
    } else {
        // console.log("单个日期！");
        let newDateSplit = vacationDays[i].split(".");
        newDateSplit[1] = newDateSplit[1].padStart(2, "0");
        newDateSplit[2] = newDateSplit[2].padStart(2, "0");
        let newDate = new Date(newDateSplit.join("-") + "T00:00:00")
        // console.log("新日期：", newDate);
        // vacationDates.push(new Date(newDate.valueOf()));
        vacationDates.push(newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate());
    }
}

for (let i = 0; i < workDays.length; i++) {
    // console.log(workDays[i]);
    if (workDays[i].indexOf("-") > -1) {
        // console.log("日期范围！");
        let startDateSplit = workDays[i].split("-")[0].split(".");
        let endDateSplit = workDays[i].split("-")[1].split(".");
        startDateSplit[1] = startDateSplit[1].padStart(2, "0");
        startDateSplit[2] = startDateSplit[2].padStart(2, "0");
        endDateSplit[1] = endDateSplit[1].padStart(2, "0");
        endDateSplit[2] = endDateSplit[2].padStart(2, "0");
        let startDate = new Date(startDateSplit.join("-") + "T00:00:00")
        let endDate = new Date(endDateSplit.join("-") + "T00:00:00")
        // console.log("开始日期：", startDate, "结束日期", endDate);

        let newDate = startDate;
        while (newDate <= endDate) {
            // console.log("新日期：", newDate);
            // workDates.push(new Date(newDate.valueOf()));
            workDates.push(newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate());
            newDate.setDate(newDate.getDate() + 1);
        }
    } else {
        // console.log("单个日期！");
        let newDateSplit = workDays[i].split(".");
        newDateSplit[1] = newDateSplit[1].padStart(2, "0");
        newDateSplit[2] = newDateSplit[2].padStart(2, "0");
        let newDate = new Date(newDateSplit.join("-") + "T00:00:00")
        // console.log("新日期：", newDate);
        // workDates.push(new Date(newDate.valueOf()));
        workDates.push(newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate());
    }
}

// console.log(vacationDates);
// console.log(workDates);

function addSchedule(name, date) {
    let schedules = localStorage.getItem("schedules");
    let schedulesArray = [];
    let newItem = {
        "id": 0,
        "name": name,
        "date": date
    }
    if (schedules) {
        schedulesArray = JSON.parse(schedules);
        newItem.id = schedulesArray.length + 1;
    } else {
        newItem.id = 1;
    }
    schedulesArray.push(newItem);
    schedules = JSON.stringify(schedulesArray);

    localStorage.setItem("schedules", schedules)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function dynamicMode() {
    document.getElementById("nextVacationDay").style.setProperty("background-color", "rgba(" + parseInt(Math.random() * 150 + 100, 10) + "," + parseInt(Math.random() * 150 + 100, 10) + "," + parseInt(Math.random() * 150 + 100, 10) + ",0.9)");
    document.getElementById("nextVacationDay").style.setProperty("color", "rgb(" + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + ")");
    
    document.body.style.setProperty("background-image", 'url("https://1012553642-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FXOicOAC1wqoz8G4R30ma%2Fuploads%2FIKJxOezX1dbygEKGiUeS%2F%E5%9B%BE%E5%B1%82003.png?alt=media&token=22ae10ee-a5c7-47fb-8c52-e0707fac3c7a")');

    for (let node of document.getElementById("mainArea").childNodes) {
        node.style.setProperty("background-color", "rgba(" + parseInt(Math.random() * 150 + 100, 10) + "," + parseInt(Math.random() * 150 + 100, 10) + "," + parseInt(Math.random() * 150 + 100, 10) + ",0.9)");
        for (let childNode of node.childNodes) {
            childNode.style.setProperty("color", "rgb(" + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + ")");
            await sleep(1000);
        }
        await sleep(1000);
    }
}

async function resetColor() {
    // document.body.style.setProperty("background-color", "#f8f5f5");
    document.getElementById("nextVacationDay").style.setProperty("background-color", "#191970");
    document.getElementById("nextVacationDay").style.setProperty("color", "#b9dada");

    document.body.style.removeProperty("background-image");

    for (let node of document.getElementById("mainArea").childNodes) {
        node.style.setProperty("background-color", "#191970");
        for (let childNode of node.childNodes) {
            if (childNode.className == "festivalName") {
                childNode.style.setProperty("color", "#c3d8bf");
            } else {
                childNode.style.setProperty("color", "#b9dada");
            }
            await sleep(1000);
        }
        await sleep(1000);
    }
}

function addFestivalToPage(name, date) {
    let festivalDateSplit = date.split(".");
    festivalDateSplit[1] = festivalDateSplit[1].padStart(2, "0");
    festivalDateSplit[2] = festivalDateSplit[2].padStart(2, "0");
    let festivalDate = new Date(festivalDateSplit.join("-") + "T00:00:00");
    // let festivalDate = new Date(date.replaceAll(".", "-"))
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    let distanceDays = Math.ceil((festivalDate.getTime() - todayDate.getTime()) / (1000 * 3600 * 24));

    if (distanceDays < 0) return;
    if (distanceDays >= 365) return;

    let tmpDate = todayDate;
    let distanceWorkDays = 0;

    while (tmpDate < festivalDate) {
        // console.log(tmpDate);
        // debugger;
        if ([6, 0].indexOf(tmpDate.getDay()) > -1) {
            // 周六，周日
            // console.log("周六，周日", tmpDate.getDay());
            if (workDates.indexOf(tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate()) > -1) {
                // 但是调休上班
                // console.log("但是调休上班");
                distanceWorkDays += 1;
            }
        } else {
            // 周一到周五
            // console.log("周一到周五", tmpDate.getDay());
            if (vacationDates.indexOf(tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate()) == -1) {
                // 并且没有节假日
                // console.log("并且没有节假日");
                distanceWorkDays += 1;
            }
        }
        tmpDate.setDate(tmpDate.getDate() + 1);
    }

    let newFestivalDiv = document.createElement("div");
    newFestivalDiv.setAttribute("class", "festival");
    // newFestivalDiv.style.setProperty("background-color", "rgba(" + parseInt(Math.random() * 150 + 100, 10) + "," + parseInt(Math.random() * 150 + 100, 10) + "," + parseInt(Math.random() * 150 + 100, 10) + ",0.9)");
    // newFestivalDiv.style.setProperty("background-color", "rgba(210,210,210,0.9)");
    // newFestivalDiv.style.setProperty('background-image', "url('imgs/xsbg.gif')");

    let newFestivalTime = document.createElement("div");
    newFestivalTime.setAttribute("class", "festivalTime");
    // newFestivalTime.style.setProperty("color", "rgb(" + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + ")");
    newFestivalTime.innerText = date;
    newFestivalDiv.appendChild(newFestivalTime);

    let newFestivalName = document.createElement("div");
    newFestivalName.setAttribute("class", "festivalName");
    // newFestivalName.style.setProperty("color", "rgb(" + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + ")");
    newFestivalName.innerText = name;
    newFestivalDiv.appendChild(newFestivalName);

    let newFestivalDistanceDays = document.createElement("div");
    newFestivalDistanceDays.setAttribute("class", "festivalDistanceDays");
    // newFestivalDistanceDays.style.setProperty("color", "rgb(" + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + ")");
    newFestivalDistanceDays.innerText = "还有：" + distanceDays.toString() + "天";
    newFestivalDiv.appendChild(newFestivalDistanceDays);

    let newFestivalDistanceWorkDays = document.createElement("div");
    newFestivalDistanceWorkDays.setAttribute("class", "festivalDistanceWorkDays");
    // newFestivalDistanceWorkDays.style.setProperty("color", "rgb(" + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + ")");
    newFestivalDistanceWorkDays.innerText = "只算工作日：" + distanceWorkDays.toString() + "天";
    newFestivalDiv.appendChild(newFestivalDistanceWorkDays);

    document.getElementById("mainArea").appendChild(newFestivalDiv);
}

let todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);
tmpDate = new Date(todayDate.valueOf());
nextVacationDistanceDays = 0;
while (true) {
    // debugger;
    if ([6, 0].indexOf(tmpDate.getDay()) > -1 && workDates.indexOf(tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate()) == -1) {
        // 周六，周日 且不是调休工作日
        break;
    }
    if (vacationDates.indexOf(tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate()) > -1) {
        // 节假日
        break;
    }
    nextVacationDistanceDays += 1;
    tmpDate.setDate(tmpDate.getDate() + 1);
}

let nextVacationDayDiv = document.createElement("div");
nextVacationDayDiv.setAttribute("class", "nextVacationDay");
nextVacationDayDiv.setAttribute("id", "nextVacationDay");
// nextVacationDayDiv.style.setProperty("background-color", "rgba(210,210,210,0.9)");
// nextVacationDayDiv.style.setProperty("color", "rgb(" + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + "," + parseInt(Math.random() * 100 + 50, 10) + ")");
nextVacationDayDiv.innerText =
    "今天是 " + todayDate.getFullYear() + "-" + (todayDate.getMonth() + 1) + "-" + todayDate.getDate() + " " + dateDayToWeek[todayDate.getDay()] +
    " 距离下一个休息日\n" + tmpDate.getFullYear() + "-" + (tmpDate.getMonth() + 1) + "-" + tmpDate.getDate() + " " + dateDayToWeek[tmpDate.getDay()] +
    "\n还有" + nextVacationDistanceDays.toString() + "天";

document.getElementById("headArea").appendChild(nextVacationDayDiv);

festival.forEach(element => {
    // console.log(element);
    addFestivalToPage(element.name, element.date)
});

let audioPlayer = document.getElementById("audioPlay");
let audioPlayBtn = document.getElementById("audioBtn");

let locationHash = location.hash;
console.log(locationHash);
if (locationHash) {
    audioPlayer.src = locationHash.split("#")[1];
    audioPlayer.setAttribute("autoplay", "autoplay");
} else {
    let audioSrcPrefix = "https://boringboys-1254394685.cos.ap-shanghai.myqcloud.com/UnreliableSchedule/music/";
    let numOfAudio = 7;
    // let audioFileName = ((Math.floor(todayDate.getTime() / (24 * 60 * 60 * 1000)) % numOfAudio) + 1).toString() + ".mp3";
    // let audioFileName = ((Math.floor(todayDate.getTime() / (1000)) % numOfAudio) + 1).toString() + ".mp3";
    let audioFileName = (Math.floor(Math.random() * numOfAudio + 1)).toString() + ".mp3";
    audioPlayer.src = audioSrcPrefix + audioFileName;

}


// let dynamicModeInterval = null;
audioPlayBtn.onclick = function () {
    if (audioPlayer.paused) {
        audioPlayer.play();
        // 为什么是这个符号？你只要知道能暂停就行了
        if (!audioPlayer.paused) {
            audioPlayBtn.innerText = "| |";
            // dynamicModeInterval = setInterval(dynamicMode, 1000);
        }
    } else {
        audioPlayer.pause();
    }
}

audioPlayer.onpause = function () {
    audioPlayBtn.innerText = "▶";
    // clearInterval(dynamicModeInterval);
    // dynamicModeInterval = null;
    setTimeout(resetColor, 300);
    audioPlayBtn.click();
}

dynamicModeInterval = setInterval(dynamicMode, 1000);