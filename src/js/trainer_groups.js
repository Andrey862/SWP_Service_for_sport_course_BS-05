var tmp = 0;

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
                var cell = row.insertCell(0).outerHTML = "<th class='group' colspan='2'>" + data[i]['name'] + "</th>";


                arr_url.push(data[i]['url']);
            }
            show_students(arr_url);
        });
}

async function show_students(arr_url){
    for (var i=0; i<arr_url.length; i++){
        
        const url = arr_url[i];
        let res = await do_fetch(url);
    }
}

async function do_fetch(urrl) {

    let res = await fetch(urrl);
    let data = await res.json();

    // console.log(data);
    let std = data['students'];
    for(var j=0; j<std.length; j++){
        var full_name = std[j]['first_name'] + " " + std[j]['last_name'];
        // console.log( full_name );

        var row1 = table.insertRow(table.rows.length - tmp);
        var cell1 = row1.insertCell(0).outerHTML = "<td class='student'>" + full_name + "</td>";
        var cell1 = row1.insertCell(1).outerHTML = "<td class='btn_add'>" + "Add 2 hours" + "</td>";
    }

    tmp--;
    return 1;
}




// fetch(url)
        //     .then(function(resp1) {
        //         return resp1.json();
        //     })
        //     .then(function(data1) {
        //         // console.log(url);

        //         for(var j=0; j<data1['students'].length; j++){
        //             var full_name = data1['students'][j]['first_name'] + " " + data1['students'][j]['last_name'];
        //             // console.log( full_name );

        //             var row1 = table.insertRow(table.rows.length - tmp);
        //             var cell1 = row1.insertCell(0).outerHTML = "<td class='student'>" + full_name + "</td>";
        //             var cell1 = row1.insertCell(1).outerHTML = "<td class='btn_add'>" + "Add 2 hours" + "</td>";
        //         }
        //         tmp--;
        //     });
















