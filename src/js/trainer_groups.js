var tmp = 0;
std_hh = {};
std_fn = {};

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = String(yyyy + '-' + mm + '-' + dd);


function show_groups(){
    fetch('http://194.87.102.88/api/groups/')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            // console.log( data );
            var table = document.getElementById("table");

            var arr_url = [];
            tmp = data.length - 1;

            for(var i=0; i<data.length; i++){
                // console.log( data[i]['name'] );
                
                var row = table.insertRow(table.rows.length);
                var cell = row.insertCell(0).outerHTML = "<th class='group' colspan='4'>" + data[i]['name'] + "</th>";

                arr_url.push(data[i]['url']);
            }

            show_students(arr_url);
        });
    // add_hour();
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
            // console.log( data );

            for(var i=0; i<data.length; i++){
                // console.log( data[i] );
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
    // console.log(std_hh);
    // console.log(std_fn);
    get_data();
}

async function do_fetch(urrl) {

    let res = await fetch(urrl);
    let data = await res.json();

    // console.log(data);
    let std = data['students'];
    for(var j=0; j<std.length; j++){
        var full_name = std[j]['first_name'] + " " + std[j]['last_name'];
        // console.log( std[j] );
        std_hh[String(std[j]['id'])] = 0;
        std_fn[String(std[j]['id'])] = full_name;

        var row1 = table.insertRow(table.rows.length - tmp);
        var cell1 = row1.insertCell(0).outerHTML = "<td class='student'>" + full_name + "</td>";
        var cell1 = row1.insertCell(1).outerHTML = "<td type='button' class='btn_add' onclick='add_hour({0}, {1});'>".format('1', std[j]['id']) + "1 hours" + "</td>";
        var cell1 = row1.insertCell(2).outerHTML = "<td type='button' class='btn_add' onclick='add_hour({0}, {1});'>".format('2', std[j]['id']) + "2 hours" + "</td>";
        var cell1 = row1.insertCell(3).outerHTML = "<td type='button' class='btn_add' onclick='add_hour({0}, {1});'>".format('3', std[j]['id']) + "3 hours" + "</td>";
    }

    tmp--;
    return 1;
}


function add_hour(hh, id){
    // console.log(hh);
    // console.log(id);
    // console.log('\n');

    console.log(std_hh);
    console.log(std_fn);

    if ( std_hh[id] + hh > 3 ){
        console.log('no way');
    }
    else {
        std_hh[id] += hh;
    }

    let xhr = new XMLHttpRequest();
    let url = "http://194.87.102.88/api/hours/";

    // open a connection 
    xhr.open("POST", url, true); 

    // Set the request header i.e. which type of content you are sending 
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4 && xhr.status === 200) { 

            // Print received data from server 
            result.innerHTML = this.responseText;

        } 
    };

    var data = JSON.stringify({ "hours": hh, "date": today, "student": id });
  
    // Sending data with the request 
    xhr.send(data); 
}









