//var tasks = [];
loadTasks = function(){
    var savedTasks = localStorage.getItem("scheduled");
    savedTasks = JSON.parse(savedTasks);
    if(savedTasks == null){
        return [];
    }else{
        return savedTasks;
    }
}

var tasks = loadTasks();
//console.log(tasks);

/* Show current date: */
$("#currentDay").text(moment().format("LL"));

/* Create UL of schedule: */
var ulList = $("<ul>")
    .attr('id', 'list-toDo')
    .addClass("list-group list-group-flush")

$(".container").append(ulList);


/* Create Time intervals: */
var timeArr = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

/* If local storage emptry: save time into array */
if(tasks.length == 0){
    for(var i=0; i<timeArr.length; i++){
        tasks.push({
            time : timeArr[i],
            task : ''
        })
    }
}

for(var i = 0; i<tasks.length; i++){
    var liList = $('<li>').addClass("list-group-item row justify-content-around");
    var timeItem =$("<span>")
        .text(tasks[i].time);
    var taskItem = $("<input>")
        .attr("type", "text")
        .addClass("form-control")
        .val(tasks[i].task);
    var saveBtn = $("<button/>")
        .text("Save")
        .addClass("btn btn-primary");

    liList.append(timeItem, taskItem, saveBtn);
    ulList.append(liList);

    var timeNow = moment().format('HH');
    var time = moment(tasks[i].time, 'LT').format('HH');
    
    if(timeNow>time){
        liList.addClass('list-group-item-dark');
    }else if(timeNow<time){
        liList.addClass('list-group-item-success');
    }else{
        liList.addClass('list-group-item-danger');
    }

}

$(".list-group").on("click", "button", function(){
    
    var parentEl = $(this).parent();

    var timeInput = $(parentEl)
        .find("span")
        .text()
        .trim();
    
    var taskInput = $(parentEl)
        .find("input")
        .val()
        .trim();
    
    saveTasks(timeInput, taskInput);
})

saveTasks = function(timeInput, taskInput){
    for(var i=0; i<timeArr.length; i++){
        if(tasks[i].time == timeInput){
            tasks[i].task = taskInput;
        }
    }
    localStorage.setItem("scheduled", JSON.stringify(tasks));
}


