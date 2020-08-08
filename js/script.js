var taskTitleEl = document.getElementById('task-title');
var taskDescriptionEl = document.getElementById('task-description');
var numCharEl = document.getElementById('num-of-char');
var selectEl = document.getElementById('priority');
var taskCards = document.getElementsByClassName('task-card');
var formEl = document.getElementsByTagName('form')[0];

var textLeft = '';
var taskTitle = '';
var taskDescription = '';
var taskPriority = '';
 
taskPriority = selectEl.value;

taskTitleEl.addEventListener('input', function(){
    taskTitle = this.value;
    updateDescriptionStatus(this.value.length);
}, false);


taskDescriptionEl.addEventListener('input', function(){
    taskDescription = this.value;
    countDescriptionText(this.value.length);
}, false);

selectEl.addEventListener('change', function(){
    taskPriority = this.value;
}, false);

formEl.addEventListener('submit', function(event){
    event.preventDefault();
    if( taskTitle.length >= 1){
        if( textLeft < 0 ){
            alert('Description too long');
        } else {
            addTaskCard(taskTitle, taskDescription, taskPriority);
            resetForm();
        }
    }
}, false);

formEl.addEventListener('reset', resetForm, false);

updateDate();

function resetForm(){
    formEl.reset();
    taskTitle = '';
    taskDescription = '';
    taskPriority = selectEl.value;
    countDescriptionText(0);
    updateDescriptionStatus(0);
    //updateTaskCards();
}

function determineSeason(month, date){
    var season = '';
    switch( month ){
        case 'January':
        case 'February':
            season = 'winter';
            break;
        case 'March':
            season = ( date < 21 ) ? 'winter' : 'spring';
            break;
        case 'April':
        case 'May':
            season = 'spring';
            break;
        case 'June':
            season = ( date < 21 ) ? 'spring' : 'summer';
            break;
        case 'July':
        case 'August':
            season = 'summer';
            break;
        case 'September':
            season = ( date < 21 ) ? 'summer' : 'fall';
            break;
        case 'October':
        case 'November':
            season = 'fall';
            break;
        case 'December':
            season = ( date < 21 ) ? 'fall' : 'winter';
            break;
        default:
            season = '';
            break;
    }
    return season;
}

function updateDate(){

    var dateEl = document.getElementById('date');
    var dayEl = document.getElementById('day');
    var imageEl = document.getElementById('top-panel');

    // to-do background image depends on the season
    const toDoWallpapers = [];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    function Wallpaper(season, image, credential){
        this.season = season;
        this.image = image;
        this.credential = credential;
    }

    var summer = new Wallpaper('summer', 'pexels-marctutorials-1152359.jpg', 'Photo by MarcTutorials from Pexels');
    var fall = new Wallpaper('fall', 'pexels-emre-kuzu-2170234.jpg', 'Photo by Emre Kuzu from Pexels');
    var spring = new Wallpaper('spring', 'pexels-nita-54300.jpg', 'Photo by Nita from Pexels');
    var winter = new Wallpaper('winter', 'pexels-simon-matzinger-688660.jpg', 'Photo by Simon Matzinger from Pexels')

    toDoWallpapers.push(summer);
    toDoWallpapers.push(fall);
    toDoWallpapers.push(spring);
    toDoWallpapers.push(winter);

    var date = new Date();
    var currentMonth = months[date.getMonth()];
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    var currentDay = days[date.getDay()];

    dateEl.textContent = `${currentMonth} ${currentDate}, ${currentYear}`;
    dayEl.textContent = `${currentDay}`;

    // update wallpaper
    var currentSeason = determineSeason(currentMonth, currentDate);

    for(let i = 0; i < toDoWallpapers.length; ++i){
        if( toDoWallpapers[i].season == currentSeason){
            imageEl.style.backgroundImage = `url("images/${toDoWallpapers[i].image}")`;
        }
    }
}

function updateDescriptionStatus(length){
    if( length ){
        taskDescriptionEl.removeAttribute('disabled', '');
    } else {
        taskDescriptionEl.setAttribute('disabled', '');
    }   
}

function countDescriptionText(length){
    var numCharEl = document.getElementById('num-of-char');
    textLeft = 60 - length;
    var msg = '', color = '';

    if (textLeft > 1){
        msg = `${textLeft} characters left`;
        color = 'green';
    } else if(textLeft == 1 || textLeft == 0){
        msg = `${textLeft} character left`;
        color = 'green';
    } else {
        msg = `${textLeft} characters left` 
        color = 'red';
    }

    numCharEl.textContent = msg;
    numCharEl.style.color = color;
    numCharEl.style.fontWeight =  'bold';

}

function addTaskCard(title, description, priority){
    var insertEl = document.querySelector('.tasks-panel h1');

    // priority tab
    var spanPriority = document.createElement('span');
    spanPriority.className = 'priority ';
    spanPriority.className += priority.toLowerCase();
    spanPriority.textContent = priority.toUpperCase();
   
    // heading
    var headingText = document.createElement('h4');
    headingText.textContent = title;

    // description
    var pDescription = document.createElement('p');
    pDescription.textContent = description;

    // remove button with icon
    var trashIcon = document.createElement('i');
    trashIcon.className = 'far fa-trash-alt';
    var buttonRemove = document.createElement('button');
    buttonRemove.className = 'remove';
    buttonRemove.appendChild(trashIcon);

    // complete button 
    var checkIcon = document.createElement('i');
    checkIcon.className = 'far fa-check-square';
    var buttonComplete = document.createElement('button');
    buttonComplete.className = 'complete';
    buttonComplete.appendChild(checkIcon);

    // add remove event handler
    buttonRemove.addEventListener('click', function(event){
        console.log('Bye');
    }, false);

    buttonComplete.addEventListener('click', function(event){
        console.log('Hello');
    }, false);

    // append all buttons
    var buttons = document.createElement('div');
    buttons.className = 'controls';
    buttons.appendChild(buttonRemove);
    buttons.appendChild(buttonComplete);

    // var buttons =   '<div class="controls">' +
    //                     '<button class="remove"><i class="far fa-trash-alt"></i></buttons>' +
    //                     '<button class="complete"><i class="far fa-check-square"></i></button>' +
    //                 '</div>';

    var taskCardEl = document.createElement('div');
    taskCardEl.className = 'task-card';
    taskCardEl.appendChild(spanPriority);
    taskCardEl.appendChild(headingText);
    taskCardEl.appendChild(pDescription);
    taskCardEl.appendChild(buttons);
    //taskCardEl.innerHTML += buttons;


    insertEl.after(taskCardEl);
}



// function updateTaskCards(){
//     var removeButtons = document.querySelectorAll('.task-card .remove');
//     var completeButtons = document.querySelectorAll('.task-card .complete');
//     if(removeButtons){

//         for(let i=0; i<removeButtons.length; ++i){
//             removeButtons[i].addEventListener('click', function(event){
//                 this.parentNode.parentNode.remove();
//                 console.log(this);
//             }, false);
//         }
//     }



//     if(completeButtons){
//         for(let i=0; i<completeButtons.length; ++i){
//             completeButtons[i].addEventListener('click', function(event){
//                 console.log(this);
//             }, false);
//         }
//     }

// }


