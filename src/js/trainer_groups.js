var tmp = 0;

function show_groups(){
    fetch('http://194.87.102.88/api/groups/')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            console.log( data );
            var table = document.getElementById("table");

            for(var i=0; i<data.length;i++){
                console.log( data[i]['name'] )
                
                var row = table.insertRow(table.rows.length);
                var cell = row.insertCell(0).outerHTML = "<th class='group' colspan='2'>" + data[i]['name'] + "</th>";

                fetch(data[i]['url'])
                    .then(function(resp1) {
                        return resp1.json();
                    })
                    .then(function(data1) {
                        for(var j=0; j<data1['students'].length; j++){
                            var full_name = data1['students'][j]['first_name'] + " " + data1['students'][j]['last_name'];
                            console.log( full_name );

                            var row1 = table.insertRow(table.rows.length - tmp);
                            var cell1 = row1.insertCell(0).outerHTML = "<td class='student'>" + full_name + "</td>";
                            var cell1 = row1.insertCell(1).outerHTML = "<td class='btn_add'>" + "Add 2 hours" + "</td>";
                        }
                        tmp--;
                    });
                tmp = i;
            }
        });
}
