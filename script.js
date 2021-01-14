// Preload
const  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
let video;

// modelLoaded > Ready to Accept
function modelLoaded() {
  document.getElementById('message').innerHTML = '<p>The MobileNet model loaded!</p>';

  video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })

  var obj = document.getElementById("button");
  obj.addEventListener("click", function(ev){ ev.preventDefault(); Classify();}, false);
}

// Classify
function Classify(){

  classifier.predict(video, DisplayResults);

}

function DisplayResults(err, results) {

  var txt="";
  for(i=0; i<results.length; i++){
   txt += "Label：" + results[i].label +'<br>';
   txt += "Confidence：" + results[i].confidence.toFixed(4) +'<br>';
   txt += '<br>';
  }
  document.getElementById('predictions').innerHTML = txt;

}
