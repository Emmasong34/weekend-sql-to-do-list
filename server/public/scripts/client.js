console.log('hello from js');

$(document).ready(onReady);

function onReady(){
    console.log('hello from jq');
    getTasks();
    $('#submitTask').on('click', addToList);
    $('#list').on('click', '.taskCompleted', updateTaskList);
    //$('#list').on('click', '.taskCompleted', changeText);
    $('#list').on('click', '.delete', deleteTask);
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
    // $('#list').empty();
    $.ajax({
        type: 'GET',
        url: '/taskList'
    }).then(function (response) {
        console.log("in new get", response);
        // append data to the DOM
        $('#list').empty();
        for (let i = 0; i < response.length; i++) {
            //for(let task of response){
                //let cssClass;
                if (response[i].completed === false){
                    //cssClass = 'complete';
                    $('#list').append(`
                <li   data-id=${response[i].id}>
                        ${response[i].task}
                        <button class ="taskCompleted" >finished</button>
                        <button class="delete">remove</button>
                    </li>           
            `);   
                }
                else if (response[i].completed === true){
                    //cssClass = 'incomplete';
                    $('#list').append(`
                <li  class="changeText" data-id=${response[i].id}>
                        ${response[i].task}
                        <button class="delete">remove</button>
                    </li> 
                    `);          
                };
        }
                   
    
    })}

 //sends update to database 
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


//this is where the same click event that fires off the updateTaskList function
//also fires off the changeText function that will mark a line through the text
//as if crossing off a to-do list in person
// function changeText(){
//     console.log('in change color function');
//     $(this).closest('li').data('id').addClass('changeText');
// }


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


    


 