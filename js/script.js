var dateEl = document.getElementById('date');
var dayEl = document.getElementById('day');


// to-do background image depends on the season
const toDoWallpapers = [];
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
