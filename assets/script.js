// Create array of time:
var timeArr = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

// Show current date: 
$("#currentDay").text(moment().format("LL"));

// Create UL Element of task:
var ulList = $("<ul>")
    .attr('id', 'list-toDo')
    .addClass("list-group list-group-flush")

$(".container").append(ulList);

// Load Function: will load from local storage and return array
loadTasks = function(){
    var savedTasks = localStorage.getItem("scheduled");
    savedTasks = JSON.parse(savedTasks);
    if(savedTasks == null){
        return [];
    }else{
        return savedTasks;
    }
}

// Save Function: save new/update old tasks in the lists into local storage
saveTasks = function(timeInput, taskInput){
    for(var i=0; i<timeArr.length; i++){
        if(tasks[i].time == timeInput){
            tasks[i].task = taskInput;
        }
    }
    localStorage.setItem("scheduled", JSON.stringify(tasks));
}

// Load tasks to tasks array using load function:
var tasks = loadTasks();

// If local storage empty: load time array into tasks array
if(tasks.length == 0){
    for(var i=0; i<timeArr.length; i++){
        tasks.push({
            time : timeArr[i],
            task : ''
        })
    }
}

// Create HTML element from tasks array:
for(var i = 0; i<tasks.length; i++){
    var liList = $('<li>').addClass("row");
    
    var timeItem =$("<span>")
        .addClass("col-2 align-self-center text-center")
        .text(tasks[i].time);
    var taskItem = $("<p>")
        .addClass("col-8 m-0 p-4 border-left")
        .text(tasks[i].task);
    var saveBtn = $("<button/>")
        .text("Save")
        .addClass("col-2 btn btn-primary");

    liList.append(timeItem, taskItem, saveBtn);
    ulList.append(liList);

    // get time now and from task list
    var timeNow = moment().format('HH');
    var time = moment(tasks[i].time, 'LT').format('HH');
    
    // add red/grey/green bg into list element according to timeleft:
    if(timeNow>time){
        liList.addClass('list-group-item-dark');
    }else if(timeNow<time){
        liList.addClass('list-group-item-success');
    }else{
        liList.addClass('list-group-item-danger');
    }

}
// Clicking on task:
$(".list-group").on("click", "p", function(){
    var text = $(this)
        .text()
        .trim();
    var textInput = $("<textarea>")
        .addClass("col-8 form-control")
        .val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
})

// When text area blurred:
$(".list-group").on("blur", "textarea", function(){
    
    //console.log('test');
    var text = $(this)
        .val()
        .trim();
      
    // recreate p element
    var taskP = $("<p>")
        .addClass("col-8 col-8 m-0 p-4 border-left")
        .text(text);
    
    $(this).replaceWith(taskP);
})

// If saved button clicked in task lists:
$(".list-group").on("click", "button", function(){
    
    // get ul element
    var parentEl = $(this).parent();

    // get time from list element
    var timeInput = $(parentEl)
        .find("span")
        .text()
        .trim();
    
    // get task from the list element
    var taskInput = $(parentEl)
        .find("p")
        .text()
        .trim();
    
    // save or update the tasks into task lists
    saveTasks(timeInput, taskInput);
})


