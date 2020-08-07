var taskTitleEl = document.getElementById('task-title');
var taskDescriptionEl = document.getElementById('task-description');
var numCharEl = document.getElementById('num-of-char');
var selectEl = document.getElementById('priority');
var taskCards = document.getElementsByClassName('task-card');

var textLeft = '';

function determineSeason(month, date){
    /** 
     * winter => dec. 21 - mar. 20
     * spring => mar. 21 - jun. 20
     * summer => jun. 21 -sep. 20
     * fall => sep. 21 - dec. 20
     */
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

function updateDescriptionStatus(){
    if( taskTitleEl.value.length ){
        taskDescriptionEl.removeAttribute('disabled', '');
    } else {
        taskDescriptionEl.setAttribute('disabled', '');
    }   
}

function countDescriptionText(){
    var numCharEl = document.getElementById('num-of-char');
    textLeft = 60 - taskDescriptionEl.value.length;
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

function submitForm(){
    taskTitleEl.addEventListener('input', updateDescriptionStatus, false);
    taskDescriptionEl.addEventListener('input', countDescriptionText, false);
    selectEl.addEventListener('change', function(e){alert(this.value);}, false);
    
}



updateDate();
submitForm();