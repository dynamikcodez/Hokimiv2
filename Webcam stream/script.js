var video = document.querySelector("#video_element");
if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({video: true})
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function (error){
    alert("Something went wrong \nReload page");
  })
}
