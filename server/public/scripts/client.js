console.log('hello from js');

$(document).ready(onReady);

function onReady(){
    console.log('hello from jq');
    getTasks();
    $('#submitTask').on('click', addToList);
    $('#list').on('click', '.taskCompleted', updateTaskList);
    $('#list').on('click', '.delete', deleteTask)
}

//takes inputs from dom and sends them to server
function addToList(){
    console.log('in add to list');
    let newTask = $('#taskInput').val()
        $.ajax({
            type: 'POST',
            url: '/taskList',
            data: {newTask: newTask}
        }).then(function (response){
            $('#taskInput').val('');
            ///get request will go here
            getTasks();
        }).catch(function(error) {
            console.log(error);
        });
    };

 function getTasks() {
    $('#list').empty();
    $.ajax({
        type: 'GET',
        url: '/taskList'
    }).then(function (response) {
        console.log("in new get", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#list').append(`
                <ul>
                    <li data-id=${response[i].id}>
                        ${response[i].task}
                        <button class ="taskCompleted">finished</button>
                        <button class="delete">remove</button>
            `);
        }
    });
}

 //updates database 
function updateTaskList(){
    let taskListId = $(this).closest('li').data('id');
    console.log('in updateTaskList function', taskListId);
    $.ajax({
        method: 'PUT',
        url: `/taskList/completed/${taskListId}`,
        data: {completedYet: true}
    }).then(function(response){
        console.log(response);
        getTasks();
        //get request
    }).catch(function(error){
        console.log(error);
    });
};


function deleteTask(){
    let taskListId = $(this).closest('li').data('id');
    console.log('in deleteTask', taskListId);
    $.ajax({
        method: 'DELETE',
        url: `/taskList/${taskListId}`
    }).then(function(response){
        console.log(response);
        getTasks();
    }).catch(function(error){
        console.log(error);
    });
};







     
  
  