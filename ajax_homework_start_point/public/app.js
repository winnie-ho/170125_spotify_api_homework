var app = function(){
var url = "https://api.spotify.com/v1/search?q=disney&type=album";
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
  console.log(ResultInfo);
  console.log(resultArray);
  showAlbums(resultArray);
}


var showAlbums = function(resultArray){
  var albumsDiv = document.querySelector("#albums");
    resultArray.forEach(function(album){

    var albumBox = document.createElement("div")
    albumBox.id = "album_box"
    albumsDiv.appendChild(albumBox);



    var title = document.createElement("p");
    title.innerText = album.name + "\n";
    albumBox.appendChild(title);

    var image = document.createElement("img");
    image.src = album.images[0].url
    image.width = 100;
    title.appendChild(image);

    var link = document.createElement("a");
    link.innerText = "Listen";
    link.href = album.external_urls.spotify;
    title.appendChild(link);

  })

}