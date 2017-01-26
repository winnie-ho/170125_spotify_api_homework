

var app = function(){
  var searchButton = document.querySelector("#search-button");
  searchButton.onclick = handleButtonClick;


  var saved = localStorage.getItem("urlSearch");
  var lastSearch = setSearchText(saved);
  var url = "https://api.spotify.com/v1/search?q=" + saved + "&type=album";
  makeRequest(url, requestComplete)
}
var handleButtonClick = function (){
  var searchBox = document.querySelector("#search-query");
  var url = "https://api.spotify.com/v1/search?q=" + searchBox.value + "&type=album";

  makeRequest(url, requestComplete)
  localStorage.setItem("urlSearch", searchBox.value);
} 

window.onload = app;



var handleSearch = function(){
  var searchString = this.value
  console.log (searchString);
  var url = "https://api.spotify.com/v1/search?q=" + searchString + "&type=album";

  return url;
}

var setSearchText = function(text){
  var searchBox = document.querySelector("#search-query");
  searchBox.value = text;
}

var ResultInfo = null;

var makeRequest = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function (){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  ResultInfo = JSON.parse(jsonString);
  var resultArray = ResultInfo.albums.items;
  console.log(ResultInfo);
  console.log(resultArray);
  showAlbums(resultArray);
}


var showAlbums = function(resultArray){

  var albumsDiv = document.querySelector("#albums");
  albumsDiv.innerHTML = "";

    resultArray.forEach(function(album){

    var albumBox = document.createElement("div")
    albumBox.id = "album_box"
    albumsDiv.appendChild(albumBox);

    var title = document.createElement("h3");
    title.innerText = album.name + "\n";
    albumBox.appendChild(title);

    var artist = document.createElement("p");
    artist.innerText = album.artists[0].name + "\n";
    title.appendChild(artist);

    var link = document.createElement("a");
    link.innerText = "Listen\n";
    link.href = album.external_urls.spotify;
    artist.appendChild(link);

    var image = document.createElement("img");
    image.src = album.images[0].url
    image.width = 100;
    link.appendChild(image);

    // var hr = document.createElement("hr");
    // image.appendChild(hr);

  })
}

