var ball, database;
var position;
var referdata

function setup(){

  createCanvas(500,500);

  //initialising database
  database = firebase.database()
  console.log(database)

  ball = createSprite(250,250,10,10);
  ball.shapeColor = "red";

  //referring database
  referdata = database.ref("ball/position")
  //.on is a listener
  referdata.on("value",readposition,writePosition)


}

function draw(){
  background("lightblue");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-2,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(2,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-2);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+2);
    }
    drawSprites();
  
}

function writePosition(x,y) {
 // ball.x = ball.x+x
 // ball.y = ball.y+y
 //overriding position in firebase by using .set function
 database.ref("ball/position").set({
   x: position.x+x,
   y: position.y+y,
 })
}

function readposition(data){
  //val is a function storing data in position variable
  position = data.val()
  console.log(position)
  ball.x = position.x
  ball.y = position.y
}