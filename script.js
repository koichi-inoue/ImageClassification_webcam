window.onload = function() {
  // EventListener for Drop Image
  var obj = document.getElementById("button");
  obj.addEventListener("click", function(ev){ ev.preventDefault(); prediction(ev);}, false);
}

// Grab elements, create settings, etc.
const video = document.getElementById('video');

// Create a webcam capture
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })

function prediction(){

  document.getElementById('predictions').innerHTML = '<p>The MobileNet model loading・・</p>';
  
  ml5.imageClassifier('MobileNet', video)
      .then(classifier => classifier.classify())
      .then(results => {
        var txt="";
        for(i=0; i<results.length; i++){
         txt += "Label：" + results[i].label +'<br>';
         txt += "Confidence：" + results[i].confidence.toFixed(4) +'<br>';
         txt += '<br>';
        }
        document.getElementById('predictions').innerHTML = txt;
      });

}
