let current = window.localStorage.getItem('id');
let token = window.localStorage.getItem('token');
var tmp = 0;

var std_fh = {};
var std_fn = {};

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = String(yyyy + '-' + mm + '-' + dd);

function show_groups() {
    fetch('http://194.87.102.88/api/groups/', {
        headers:
            {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${token}`
            }
    })
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var table = document.getElementById("table");
            var arr_url = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i]['trainer']['id'] == current) {
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

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

// function get_data() {
//     fetch('http://194.87.102.88/api/hours/', {
//         headers:
//             {
//                 "Content-type": "application/json; charset=UTF-8",
//                 'Authorization': `Token ${token}`
//             }
//     })
//         .then(function (resp) {
//             return resp.json();
//         })
//         .then(function (data) {
//             for (var i = 0; i < data.length; i++) {
//                 if (today == data[i]['date']) {
//                     std_hh[data[i]['student']] += data[i]['hours'];
//                 }
//             }
//         });
// }

async function show_students(arr_url) {
    let res = await fetch('http://194.87.102.88/api/hours/', {
        headers:
            {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${token}`
            }
    });
    let data = await res.json();

    for (var i = 0; i < data.length; i++) {
        if (!std_fh.hasOwnProperty(data[i]['student'])) {
            // std_hh[data[i]['student']] = 0;
            std_fh[data[i]['student']] = 0;
        }
        // if (today == data[i]['date']) {
        //     std_hh[data[i]['student']] += data[i]['hours'];
        // }
        std_fh[data[i]['student']] += data[i]['hours'];
    }

	

    for (var i = 0; i < arr_url.length; i++) {
        const url = arr_url[i];
        let res = await do_fetch(url);
    }
    // get_data();
}

async function do_fetch(urrl) {
    // console.log( "asd" );
    let res = await fetch(urrl, {
        headers:
            {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${token}`
            }
    });
    let data = await res.json();
    var table = document.getElementById("table");

    let std = data['students'];
    for (var j = 0; j < std.length; j++) {
        var full_name = std[j]['first_name'] + " " + std[j]['last_name'];
        std_fn[String(std[j]['id'])] = full_name;
		if (!std_fh[std[j]['id']]){std_fh[std[j]['id']] = '0'}
		//alert(std_fh[std[j]['id']])
        inf =  "<span class='fname'>" + full_name + "</span>" + "<span class='fhours'>{0} hours</span>".format(String(std_fh[std[j]['id']]));
        var row1 = table.insertRow(table.rows.length - tmp);
        // var cell1 = row1.insertCell(0).outerHTML = "<td class='student'>" + full_name + "</td>";
        var cell1 = row1.insertCell(0).outerHTML = "<td class='student'>" + inf + "</td>";
        var cell1 = row1.insertCell(1).outerHTML = "<td type='button' class='btn_add' onclick='add_hour(1, {0});'>".format(std[j]['id']) + "1 hour" + "</td>";
        var cell1 = row1.insertCell(2).outerHTML = "<td type='button' class='btn_add' onclick='add_hour(2, {0});'>".format(std[j]['id']) + "2 hours" + "</td>";
        var cell1 = row1.insertCell(3).outerHTML = "<td type='button' class='btn_add' onclick='add_hour(3, {0});'>".format(std[j]['id']) + "3 hours" + "</td>";
    }

    tmp--;
    return 1;
}

async function add_hour(hh, id) {
    let std_hh = {};
    let res = await fetch('http://194.87.102.88/api/hours/', {
        headers:
            {
                "Content-type": "application/json; charset=UTF-8",
                'Authorization': `Token ${token}`
            }
    });
    let data1 = await res.json();

    for (var i = 0; i < data1.length; i++) {
        if (!std_hh.hasOwnProperty(data1[i]['student'])) {
            std_hh[data1[i]['student']] = 0;
        }
        if (today == data1[i]['date']) {
            std_hh[data1[i]['student']] += data1[i]['hours'];
        }
    }

    if (std_hh[id] + hh > 3) {
        alert('You cannot add more than 3 hours per day')
        return 0;
    } else {
        std_hh[id] += hh;
    }

    let xhr = new XMLHttpRequest();
    let url = "http://194.87.102.88/api/hours/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', `Token ${token}`)

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            result.innerHTML = this.responseText;
        }
    };

    var data = JSON.stringify({"hours": hh, "date": today, "student": id});
    xhr.send(data);

    const students_url = "http://194.87.102.88/api/users/?is_student=true";
    const request = new XMLHttpRequest()
    request.open('GET', students_url, false)
    request.setRequestHeader('Authorization', `Token ${token}`)
    request.send()

    JSON.parse(request.responseText).forEach(st => {
        if (st['id'] == id) {
            alert('You added ' + hh + ' hours to ' + st['first_name'] + ' ' + st['last_name'])
        }
    })
}
