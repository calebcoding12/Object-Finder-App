objects = [];
status1 = "";

function setup(){
    canvas = createCanvas(350,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide();
}
function modelLoaded(){
    console.log("Model is loaded");   
    status1 = true;
}
function draw(){
    image(video,0,0,350,350);
    if (status1 != ""){
        objectDetector.detect(video, gotResults);
        for (i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            fill("#FF0000")
            stroke("#FF0000");
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == name_of_object){
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("status_of_objects").innerHTML = name_of_object + " has been Found";
                var synth = window.speechSynthesis;
                speak_data = name_of_object + " has been found";
                var Utterthis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(Utterthis);
            }
            else {
                document.getElementById("status_of_objects").innerHTML = name_of_object + " has not been Found";
                var synth = window.speechSynthesis;
                speak_data2 = name_of_object + " has not been found";
                var Utterthis = new SpeechSynthesisUtterance(speak_data2);
                synth.speak(Utterthis);
            }
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    name_of_object = document.getElementById("text-box").value;
}
function gotResults(error, results){
   if (error){
    console.error(error)
   } else{
    console.log(results);
    objects = results;
   }
}   

