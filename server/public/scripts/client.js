console.log('hello from js');

$(document).ready(onReady);

function onReady(){
    console.log('hello from jq');
    getTasks();
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
            ///get request will go here
            getTasks();
        }).catch(function(error) {
            console.log(error);
        });
    };


//gets tasks from server
 function getTasks(){
     console.log('in getTasks');
     $.ajax({
         method: 'GET',
         url: '/taskList'
     }).then(function(response){
         appendToDom(response);
     }).catch(function(error){
         console.log(error);
     });
 };

 //appends list to dom
 function appendToDom(){
     console.log('in appendToDom');
     //empties so the list doesn't double
     $('#newTask').empty();
     console.log('array', array);
     for(let i=0; i < array.length; i++){
         let element = '';
         if(array[i].completed === true){
             element = 'Task completed';
         } else {
             element = '<button class ="taskCompleted">DONE</button>'
         }
         $('#list').append(`
         <li data-id=${array[i].id}>
            <p>${array[i].task}: <span>${element}</span> <p>
            <button class="delete">delete</button>
         </li>
         `);
     };
 };





     
  
  