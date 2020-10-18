console.log('hello from js');

$(document).ready(onReady);

function onReady(){
    console.log('hello from jq');
    getTasks();
    $('#submitTask').on('click', addToList);
    $('#list').on('click', '.deleteTask', deleteTask)
    $('#list').on('click', '.taskCompleted', updateTaskList);
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


//gets tasks from server
//  function getTasks(){
//      console.log('in getTasks');
//      $.ajax({
//          method: 'GET',
//          url: '/taskList'
//      }).then(function(response){
//          appendToDom(response);
//      }).catch(function(error){
//          console.log(error);
//      });
//  };


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
                    <li${response[i].id}>
                        ${response[i].task}
                        <button class ="taskCompleted">finished</button>
                        <button class="delete">remove</button>
            `);
        }
    });
}





 //appends list to dom
//  function appendToDom(array){
//      console.log('in appendToDom');
//      //empties so the list doesn't double
//      $('#list').empty();
//      console.log('array', array);
//      for(let i=0; i < array.length; i++){
//          let element = '';
//          if(array[i].completed === true){
//              element = 'Task completed';
//          } else {
//              element = '<button class ="taskCompleted">finished</button>'
//          }
//          $('#list').append(`
//          <li data-id=${array[i].id}>
//             ${array[i].task} <span>${element}</span> 
//             <button class="delete">remove</button>
//          </li>
//          `);
//      };
//  };

 








 //updates database 
function updateTaskList(){
    let taskListId = $(this).closest('li').data('id');
    console.log('in updateTaskList function');//this was the old console.log taskListId
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







     
  
  