console.log('hello from js');

$(document).ready(onReady);

function onReady(){
    console.log('hello from jq');
    $('#submitTask').on('click', addToList);
}

//takes inputs from dom and sends them to server
function addToList(){
    console.log('in add to list');
    let newTask = $('#newTask').val()
        $.ajax({
            type: 'POST',
            url: '/taskList',
            data: newTask
        }).then(function (response){
            $('#newTask').val('');
        });
    };
