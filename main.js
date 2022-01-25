status=" "
hello = []

function setup(){
    canvas = createCanvas(480,480);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,480);
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object-name").value;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        hello = results;
    }
}

function draw(){
    image(video, 0, 0, 480, 480);
 
    if(status != " "){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for(i=0; i<hello.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill(r,g,b);
            percentage = Math.floor(hello[i].confidence * 100);
            text(hello[i].label + " " + percentage + "%", hello[i].x + 15, hello[i].y + 15);

            noFill();
            stroke(r,g,b);
            rect(hello[i].x, hello[i].y, hello[i].width, hello[i].height);

            if(hello[i].label == object){
                video.stop();
                objectDetector.detect(gotResult);

                document.getElementById("object-found").innerHTML = "Object was found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object + "was found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object-found").innerHTML = "Object was not found";
            }
        }
    }
}
