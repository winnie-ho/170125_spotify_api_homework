var app = function(){
var url = "https://api.spotify.com/v1/search?q=rnb&type=album";
makeRequest(url, requestComplete)
}




window.onload = app;

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
  console.log(resultArray);
  showAlbums(resultArray);
}


var showAlbums = function(resultArray){
  var albumsDiv = document.querySelector("#albums");
    resultArray.forEach(function(album){

    var point = document.createElement("p");
    point.innerText = album.name + "\n";
    albumsDiv.appendChild(point);

    var link = document.createElement("a");
    link.innerText = album.href;
    link.href = album.external_urls.spotify;
    point.appendChild(link);

    console.log(album);
  })

}