function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}
music="";
function preload(){
    music=loadSound("music.mp3");
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function modelloaded(){
    console.log("Model is loaded");
}
scoreleftwrist=0;
scorerightwrist=0;
function gotposes(results){
    if(results.length >0){
    console.log(results);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scoreleftwrist= "+scoreleftwrist);
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("scorerightwrist= "+scorerightwrist);
    leftx=results[0].pose.leftWrist.x;
    rightx=results[0].pose.rightWrist.x;
    lefty=results[0].pose.leftWrist.y;
    righty=results[0].pose.rightWrist.y;
    console.log("leftx= "+leftx);
    console.log("rightx= "+rightx);
    console.log("lefty= "+lefty);
    console.log("righty= "+righty);
}
}

function draw(){
    image(video,0,0,600,500);
    fill("#330033");
    stroke("#330033");
    if(scorerightwrist >0.2){
    circle(rightx,righty,20);
    if(righty >0 && righty <=100){
        document.getElementById("speed").innerHTML="speed = 0.5x";
        music.rate(0.5);
    }
    else if(righty >100 && righty <=200){
        document.getElementById("speed").innerHTML="speed = 1x";
        music.rate(1);
    }
    else if(righty >200 && righty <=300){
        document.getElementById("speed").innerHTML="speed = 1.5x";
        music.rate(1.5);
    }
    else if(righty >300 && righty <=400){
        document.getElementById("speed").innerHTML="speed = 2x";
        music.rate(2);
    }
    else if(righty >400 && righty <=500){
        document.getElementById("speed").innerHTML="speed = 2.5x";
        music.rate(2.5);
    }
}
    if(scoreleftwrist >0.2){
        circle(leftx,lefty,20);
        numlefty=Number(lefty);
        numberdecimal=floor(numlefty); 
        volume=numberdecimal/500;
        document.getElementById("displayv").innerHTML=volume;
        music.setVolume(volume);
    }
    }


leftx=0;
rightx=0;
lefty=0;
righty=0;