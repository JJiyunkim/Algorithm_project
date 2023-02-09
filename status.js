var listdiv = document.getElementById("list");
var data = JSON.parse(sessionStorage.getItem("hwlist"));
if (data === null){
    var listdiv = document.getElementById("list");
    listdiv.innerHTML = "<h3> 📢 Step 1에서 과제를 추가하세요!</h3>";
}
var status = sessionStorage.getItem("finished");
for (var i = 0; i < data.length; i++){
    data[i][3] = Number(data[i][3]);
}
var today = new Date().getTime();
sort_first();
function sort_first(){
    data = data.sort((a,b) => Date.parse(a[2]) - Date.parse(b[2]));
    var listdiv = document.getElementById("list");
    const newlist = document.createElement('p');
    var count = 0;
    var html = `
    <table id="table" class="table"> 
        <thead>
            <tr>
                <th> 번호 </th>
                <th> 과목 </th>
                <th> 과제명 </th>
                <th> 마감일 </th>
                <th> 남은 기간 (일수) </th>
                <th> 걸리는 시간 </th>
                <th> 완료 </th>
            </tr>
        </thead>
        <tbody>
    `
    for (var i = 1; i < data.length+1; i++){
        html += "<tr>";
        html += "<td>" + i + "</td>";
        if (data[i-1][0] == true){
            html += "<td> 전공 </td>";
        }
        else{
            html += "<td>비전공</td>";
        }
        html += "<td>" + data[i-1][1] +"</td>";
        html += "<td>" + data[i-1][2] +"</td>";
        if (today - Date.parse(data[i-1][2]) > 0) {
            html += "<td>" + "😭" +"</td>";
        }
        else{
            html += "<td>" + ((Date.parse(data[i-1][2]) - today)/(1000*60*60*24)).toFixed(1) +"</td>";
        }
        html += "<td>" + data[i-1][3] +"</td>";
        if (status.includes(i-1)){
            html += "<td>" + "⭕" + "</td>";
            count += 1;
        }
        else if (today - Date.parse(data[i-1][2]) > 0){
            html += "<td>" + "❗" + "</td>";
        }
        else{
            html += "<td>" + "❌" + "</td>";
        }
        html += "</tr>";
    }
    html+=`</tbody>
    </table>`;
    newlist.innerHTML = `
    <h3>✍️과제 정보</h3>
    전체 과제 과제 ${data.length}개 /
    <text id="fin">끝낸 과제 ${count}개</text>
    <br/><br/>${html}`;
    listdiv.append(newlist);
}

function sort_time(){
    data = data.sort((a,b) => a[3] - b[3]);
    var tablediv = document.getElementById("table");
    tablediv.innerHTML = null;
    var html = `
    <table  id="table" class="table"> 
        <thead>
            <tr>
                <th> 번호 </th>
                <th> 과목 </th>
                <th> 과제명 </th>
                <th> 마감일 </th>
                <th> 남은 기간 (일수) </th>
                <th> 걸리는 시간 </th>
                <th> 완료 </th>
            </tr>
        </thead>
        <tbody>
    `
    for (var i = 1; i < data.length+1; i++){
        html += "<tr>";
        html += "<td>" + i + "</td>";
        if (data[i-1][0] == true){
            html += "<td> 전공 </td>";
        }
        else{
            html += "<td>비전공</td>";
        }
        html += "<td>" + data[i-1][1] +"</td>";
        html += "<td>" + data[i-1][2] +"</td>";
        if (today - Date.parse(data[i-1][2]) > 0) {
            html += "<td>" + "😭" +"</td>";
        }
        else{
            html += "<td>" + ((Date.parse(data[i-1][2]) - today)/(1000*60*60*24)).toFixed(1) +"</td>";
        }
        html += "<td>" + data[i-1][3] +"</td>";
        if (status.includes(i-1)){
            html += "<td>" + "⭕" + "</td>";
            count += 1;
        }
        else if (today - Date.parse(data[i-1][2]) > 0){
            html += "<td>" + "❗" + "</td>";
        }
        else{
            html += "<td>" + "❌" + "</td>";
        }
        html += "</tr>";
    }
    html+=`</tbody>
    </table>`;
    tablediv.innerHTML = html;
}

function sort_date(){
    data = data.sort((a,b) => Date.parse(a[2]) - Date.parse(b[2]));
    var tablediv = document.getElementById("table");
    var html = `
    <table  id="table" class="table"> 
        <thead>
            <tr>
                <th> 번호 </th>
                <th> 과목 </th>
                <th> 과제명 </th>
                <th> 마감일 </th>
                <th> 남은 기간 (일수) </th>
                <th> 걸리는 시간 </th>
                <th> 완료 </th>
            </tr>
        </thead>
        <tbody>
    `
    for (var i = 1; i < data.length+1; i++){
        html += "<tr>";
        html += "<td>" + i + "</td>";
        if (data[i-1][0] == true){
            html += "<td> 전공 </td>";
        }
        else{
            html += "<td>비전공</td>";
        }
        html += "<td>" + data[i-1][1] +"</td>";
        html += "<td>" + data[i-1][2] +"</td>";
        if (today - Date.parse(data[i-1][2]) > 0) {
            html += "<td>" + "😭" +"</td>";
        }
        else{
            html += "<td>" + ((Date.parse(data[i-1][2]) - today)/(1000*60*60*24)).toFixed(1) +"</td>";
        }
        html += "<td>" + data[i-1][3] +"</td>";
        if (status.includes(i-1)){
            html += "<td>" + "⭕" + "</td>";
            count += 1;
        }
        else if (today - Date.parse(data[i-1][2]) > 0){
            html += "<td>" + "❗" + "</td>";
        }
        else{
            html += "<td>" + "❌" + "</td>";
        }
        html += "</tr>";
    }
    html+=`</tbody>
    </table>`;
    tablediv.innerHTML = html;   
}

//저장공간 초기화 함수 
function refresh(){
    sessionStorage.clear();
}