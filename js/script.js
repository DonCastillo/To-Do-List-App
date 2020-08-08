var taskTitleEl = document.getElementById('task-title');
var taskDescriptionEl = document.getElementById('task-description');
var numCharEl = document.getElementById('num-of-char');
var selectEl = document.getElementById('priority');
var taskCards = document.getElementsByClassName('task-card');
var taskCardsCompleted = document.getElementsByClassName('task-completed');
var formEl = document.getElementsByTagName('form')[0];
var tasksPanelEl = document.getElementsByClassName('tasks-panel')[0];
var clearCompleteEl = document.getElementById('clear-complete');



var textLeft = '';
var taskTitle = '';
var taskDescription = '';
var taskPriority = '';
 
taskPriority = selectEl.value;

window.addEventListener('load', addInitialMsg, false);

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
            addInitialMsg();
        }
    }
}, false);

clearCompleteEl.addEventListener('click', function(){
    //alert(taskCardsCompleted.length);
    for(let i=0; i<taskCardsCompleted.length; ++i){
        taskCardsCompleted[i].remove();
    }
}, false);

formEl.addEventListener('reset', resetForm, false);

updateDate();



function addInitialMsg(){
    if( taskCards.length === taskCardsCompleted.length ){
        var nothingToDoEl = document.createElement('p');
        nothingToDoEl.id = 'nothing-to-do';
        nothingToDoEl.textContent = 'Nothing to do.';
        clearCompleteEl.after(nothingToDoEl);
    } else {
        var nothingToDo = document.getElementById('nothing-to-do');
        if(nothingToDo){
            nothingToDo.remove();
        }
    }
}

function resetForm(){
    formEl.reset();
    taskTitle = '';
    taskDescription = '';
    taskPriority = selectEl.value;
    countDescriptionText(0);
    updateDescriptionStatus(0);
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
        this.parentNode.parentNode.remove();
        addInitialMsg();
    }, false);

    buttonComplete.addEventListener('click', function(event){
        var target = this.parentNode.parentNode;
        var clone = target.cloneNode(true);
        target.remove();
        tasksPanelEl.appendChild(clone);
        clone.className += ' task-completed';
        addInitialMsg();
    }, false);

    // append all buttons
    var buttons = document.createElement('div');
    buttons.className = 'controls';
    buttons.appendChild(buttonRemove);
    buttons.appendChild(buttonComplete);

    var taskCardEl = document.createElement('div');
    taskCardEl.className = 'task-card';
    taskCardEl.appendChild(spanPriority);
    taskCardEl.appendChild(headingText);
    taskCardEl.appendChild(pDescription);
    taskCardEl.appendChild(buttons);
    clearCompleteEl.after(taskCardEl);
    adjustCardsHeight();
}

function adjustCardsHeight(){
    var maxHeight = 0;
    for(let i=0; i<taskCards.length; ++i){
        var thisHeight = taskCards[i].clientHeight
        if( maxHeight < thisHeight ){
            maxHeight = thisHeight;
        }
    }
    for(let i=0; i<taskCards.length; ++i){
        taskCards[i].style.minHeight = `${maxHeight}px`;
    }
}