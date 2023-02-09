var hwlist = [];
var num = 0;
var finished = [];
sessionStorage.setItem("finished", finished);
function save_div(){
    var gett = [];
    gett.push(document.getElementById(`major${num}`).checked);
    gett.push(document.getElementById(`title${num}`).value);
    gett.push(document.getElementById(`date${num}`).value);
    gett.push(document.getElementById(`time${num}`).value);
    hwlist.push(gett);
    num=num+1;
    // sessionStorage.setItem("hwlist", hwlist);
    sessionStorage.setItem("hwlist", JSON.stringify(hwlist));
    //test해보는거임
    var data = JSON.parse(sessionStorage.getItem("hwlist"));
    for (var i = 0; i < data.length; i++){
        data[i][2] = Number(data[i][2]);
    }
}

function add_div(){
    var div = document.createElement('div');
    div.innerHTML = `
    <div class="form-group" id=form${num}>
        <label style="margin-right: 7px;">${num+1}</label>                   
        <label for="major${num}" class="checklabel">전공</label> 
        <input type="checkbox" id="major${num}" placeholder="전공" class="tt form-control"  style="margin-left: 0px;"/> 
        <input type="text" id="title${num}" name="title" class="tt form-control" placeholder="과제"/>  
        <input type="datetime-local" id="date${num}" class="tt form-control" placeholder="마감일"/>
        <input type="number" id="time${num}" class="tt form-control" placeholder="걸리는 시간"/>
        <input type="button" id="remove${num}" value="삭제" class="tt btn" onclick="remove_div(this)">
    </div>`;
    document.getElementById('field').appendChild(div);
}


function remove_div(){
    if (document.getElementById(`form${num}`).remove()){
        num -= 1;
    }
}