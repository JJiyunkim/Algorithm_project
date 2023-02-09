var data = JSON.parse(sessionStorage.getItem("hwlist"));
for (var i = 0; i < data.length; i++){
    data[i][0] = Boolean(data[i][0]);
    data[i][3] = Number(data[i][3]);
}
var ori_idx = [...Array(data.length).keys()];
var idx = [];
for (var i = 0; i < ori_idx.length; i++){
    if (sessionStorage.getItem("finished").includes(i) == false){
        idx.push(ori_idx[i]);
    }
}
//combination 구하는 함수
const getCombinations = (array, selectNumber) => {
    const results = [];
    if(selectNumber === 1){
        return array.map((element) => [element]);
    }
    array.forEach((fixed, index, origin) => {
        const rest = origin.slice(index+1);
        const combinations = getCombinations(rest, selectNumber - 1);
        const attached = combinations.map((combination) => [fixed, ...combination]);
        results.push(...attached);
    });
    return results;
}
var nCr = [];
console.log(idx)
//모든 가능한 조합을 다 구함.
for (var i = 1; i < idx.length+1; i++){
    nCr = nCr.concat(getCombinations(idx, i));
}

//마감일 빠른 순으로 가치 계산
var today = new Date().getTime();
for (var i = 0; i < data.length; i++){
    var end = Date.parse(data[i][2]);
    //남은 일수 계산 + 과목별 가치 계산
    var diff = (end-today)/(1000*60*60*24);
    diff = (1/diff) *10;
    if (data[i][0] === true){
        diff *= 1.2;
    }
    data[i].push(diff);
}
//모든 경우의 수 계산해보기 (시간, 가치)
var result = new Array(nCr.length).fill(null).map(()=>Array(2).fill(0));
for (var i = 0; i < nCr.length; i++){
    for (var j = 0; j < data.length; j++){
        if (nCr[i].includes(j)){
            result[i][0] += data[j][3]; //시간
            result[i][1] += data[j][4]; //가치
        }
    }
    result[i].push(nCr[i]); //출력을 위해 인덱스 값들도 저장해두기
}
//공부할 시간 입력한 거 가져와서 정수로 변환
var studytime = JSON.parse(sessionStorage.getItem("studytime"));
studytime = Number(studytime);
//result 중 시간 안 넘는 것 + 가치가 최대인 것
result = result.sort((a,b) => b[1] - a[1]);
for (var i = 0; i < result.length; i++){
    if (result[i][0] <= studytime){
        var maxidx = i;
        break;
    }
}
//최대를 가리키는 idx == maxidx
var listdiv = document.getElementById("list");
const newlist = document.createElement('p');
var html = `
<table class="table"> 
    <thead>
        <tr>
            <th> 번호 </th>
            <th> 과목 </th>
            <th> 과제명 </th>
            <th> 마감일 </th>
            <th> 시간 </th>
            <th> 상태 </th>
        </tr>
    </thead>
    <tbody>
`
var count = 0; //끝낸 과제 개수
for (var i = 1; i < result[maxidx][2].length+1; i++){
    var pp = result[maxidx][2][i-1];
    html += "<tr>";
    html += "<td>" + i + "</td>";
    if (data[pp][0] == true){
        html += "<td> 전공 </td>";
    }
    else{
        html += "<td>비전공</td>";
    }
    html += "<td>" + data[pp][1] +"</td>";
    html += "<td>" + data[pp][2] +"</td>";
    html += "<td>" + data[pp][3] +"</td>";
    if (sessionStorage.getItem("finished").includes(pp)){
        count += 1;
        html += `<td> <input type='checkbox' id='check${pp}' checked> <label for 'check' class='checklabel'></label> </td>`
    }
    else{
        html += `<td> <input type='checkbox' id='check${pp}'> <label for 'check' class='checklabel'></label> </td>`
    }
    html += "</tr>"
}
html+=`</tbody>
</table>`
newlist.innerHTML = `
<h3>📒과제 정보</h3>
오늘 해야 할 과제 ${result[maxidx][2].length}개 /
<text id="fin">끝낸 과제 ${count}개</text>
<h3>⏱시간 정보</h3>
오늘 공부할 시간 ${studytime}시간 / 과제 소요 시간 ${result[maxidx][0]}시간
<br/><br/>${html}`
listdiv.append(newlist);
var oldfin = document.getElementById("fin");    
if (JSON.parse(sessionStorage.getItem("status")).length === result[maxidx][2].length){
    oldfin.innerHTML += "<br> <label>오늘의 과제를 모두 완료했습니다!🎉</label>"
}
//checkbox 체크한 값 저장하기
function save_status(){
    var status = [];
    for (var i = 0; i < result[maxidx][2].length; i++){
        if (document.getElementById(`check${result[maxidx][2][i]}`).checked){
            status.push(result[maxidx][2][i]);
        }
    }
    sessionStorage.setItem("status", JSON.stringify(status));
    
    var finished = [];
    finished.push(sessionStorage.getItem("finished"));
    finished.push(status);
    sessionStorage.setItem("finished", finished);
    var oldfin = document.getElementById("fin");
    oldfin.innerHTML = `끝낸 과제 ${JSON.parse(sessionStorage.getItem("status")).length}개`;
    if (JSON.parse(sessionStorage.getItem("status")).length === result[maxidx][2].length){
        oldfin.innerHTML += "<br> <label>오늘의 과제를 모두 완료했습니다!🎉</label>"
    }
}