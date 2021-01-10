var tasks = [];
/* Show current date: */
$("#currentDay").text(moment().format("LL"));

/* Create UL of schedule: */
var ulList = $("<ul>")
    .attr('id', 'list-toDo')
    .addClass("list-group list-group-flush")

$(".container").append(ulList);
/* var liList = $('<li>').addClass("list-group-item");
ulList.append(liList); */

/* Create Time intervals: */
var timeArr = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

timeArr.forEach(el => {

    var liList = $('<li>').addClass("list-group-item row justify-content-around");
    var timeItem =$("<span>")
        //.addClass('col-2')
        .text(el);
    var taskItem = $("<input>")
        .attr("type", "text")
        .addClass("form-control")
        //.addClass('col-8');
    var saveBtn = $("<button/>")
        .text("Save")
        .addClass("btn btn-primary");

    liList.append(timeItem, taskItem, saveBtn);
    ulList.append(liList);

    //console.log(moment().format("hh:mm"));
    //console.log(el);

    var timeNow = moment().format('HH');
    // var timeNow = 11;
    var time = moment(el, 'LT').format('HH');
    
   /*  console.log(moment().format('HH'));
    console.log(time.format('HH')); */
    if(timeNow>time){
        liList.addClass('list-group-item-dark');
    }else if(timeNow<time){
        liList.addClass('list-group-item-success');
    }else{
        liList.addClass('list-group-item-danger');
    }
    // console.log(timeNow);
    // console.log(time);
});

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
    // console.log(timeInput, taskInput);

//    tasks.push([timeInput, taskInput]);
    /* tasks.forEach(el =>{
        tasks[el]
        
    }); */
// if nothing in localStorage, create a new object to track all task status arrays

   
    /* if(tasks.length == 0){
        tasks.push({
            time:timeInput,
            task: taskInput
        });
    }else{
        for(var i=0; i<tasks.length; i++){
            if(tasks[i]['time'] == timeInput){
                tasks[i]['task'] = taskInput;
                console.log(tasks[i]['task']);
            }else{
                tasks.push({
                    time: timeInput,
                    task: taskInput
                });
                break;
            }
        }
    } */
    
    // if(timeInput in tasks){
    //     tasks[timeInput] = [taskInput];
    //     console.log(tasks);
    // }else{
    //     /* tasks.push({
    //         time: timeInput,
    //         task: taskInput
    //     }); */
    //     tasks[timeInput].push(taskInput);
            
    //     console.log(tasks);
    // }
    //console.dir(tasks);
    
}

loadTasks = function(){
}
