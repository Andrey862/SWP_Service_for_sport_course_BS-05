
var tmp = 0;
std_hh = {};
std_fn = {};

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = String(yyyy + '-' + mm + '-' + dd);

function show_groups(tid){
    fetch('http://194.87.102.88/api/groups/')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            var table = document.getElementById("table");
            var arr_url = [];

            for(var i=0; i<data.length; i++){
                if (data[i]['trainer']['id']  == tid){
                    var row = table.insertRow(table.rows.length);
                    var cell = row.insertCell(0).outerHTML = "<th class='group' colspan='4'>" + data[i]['name'] + "</th>";

                    arr_url.push(data[i]['url']);  
                    tmp++;  
                }
            }
            tmp--;
            show_students(arr_url);
        });
}

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

function get_data(){
    fetch('http://194.87.102.88/api/hours/')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            for(var i=0; i<data.length; i++){
                if (today == data[i]['date']) {
                    std_hh[data[i]['student']] += data[i]['hours'];
                }
            }
        });
}

async function show_students(arr_url){
    for (var i=0; i<arr_url.length; i++){
        const url = arr_url[i];
        let res = await do_fetch(url);
    }
    get_data();
}

async function do_fetch(urrl) {
    let res = await fetch(urrl);
    let data = await res.json();
    var table = document.getElementById("table");

    let std = data['students'];
    for(var j=0; j<std.length; j++){
        var full_name = std[j]['first_name'] + " " + std[j]['last_name'];
        std_hh[String(std[j]['id'])] = 0;
        std_fn[String(std[j]['id'])] = full_name;

        var row1 = table.insertRow(table.rows.length - tmp);
        var cell1 = row1.insertCell(0).outerHTML = "<td class='student'>" + full_name + "</td>";
        var cell1 = row1.insertCell(1).outerHTML = "<td type='button' class='btn_add' onclick='add_hour(1, {0});'>".format(std[j]['id']) + "1 hours" + "</td>";
        var cell1 = row1.insertCell(2).outerHTML = "<td type='button' class='btn_add' onclick='add_hour(2, {0});'>".format(std[j]['id']) + "2 hours" + "</td>";
        var cell1 = row1.insertCell(3).outerHTML = "<td type='button' class='btn_add' onclick='add_hour(3, {0});'>".format(std[j]['id']) + "3 hours" + "</td>";
    }

    tmp--;
    return 1;
}

function add_hour(hh, id){
    // console.log('beka');
    
    if ( std_hh[id] + hh > 3 ){
		alert('You cannot add more than 3 hours per day')
        return 0;
    }
    else {
        std_hh[id] += hh;
    }

    let xhr = new XMLHttpRequest();
    let url = "http://194.87.102.88/api/hours/";
    xhr.open("POST", url, true); 
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 
            result.innerHTML = this.responseText;
        } 
    };

    var data = JSON.stringify({ "hours": hh, "date": today, "student": id });
    xhr.send(data); 
    
    const students_url = "http://194.87.102.88/api/users/?is_student=true";
    const request = new XMLHttpRequest()
    request.open('GET', students_url, false)
    request.send()

    JSON.parse(request.responseText).forEach(st => {
		if (st['id'] == id){
			alert('You added ' + hh + ' hours to ' +  st['first_name'] + ' ' + st['last_name'])
		}
	})
}
