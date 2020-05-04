var hh = 0;

function show_hours(id) {

    fetch('http://194.87.102.88/api/hours/')
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            var hours = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i]['student'] == id) {
                    hh += data[i]['hours'];
                    hours.push(data[i]);
                }
            }

            put_hours(hours);
        });

}

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

function put_hours(arr) {

    var bar1 = document.getElementById("bar");
    bar1.innerHTML += " <div class='progress' data-label='{0} hours' id='bar1'></div>".format(String(hh));

    var to_add = (hh / 30) * 100;
    if (to_add > 100) {
        to_add = 100;
    }

    var bar2 = document.getElementById("bar1");
    bar2.innerHTML += "<span class='value' style='width:{0}%;'></span>".format(String(to_add));

    var table = document.getElementById("table");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0).outerHTML = "<th class='hours'>" + "Club Date Hour" + "</th>";

    for (var i = arr.length - 1; i >= 0; i--) {
        var row = table.insertRow(table.rows.length);
        var club = 'Sambo ';
        var cell = row.insertCell(0).outerHTML = "<td class='date'>" + club + arr[i]['date'] + ' ' + arr[i]['hours'] + "</td>";

    }
}


