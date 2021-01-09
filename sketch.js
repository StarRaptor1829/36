var dogImage, happyDog, dog
var database
var foodS, foodStock
var fedTime, lastFed
var feed, foodObj, addFood
//var bedroomImg, gardenImg, washroomImg
function preload()
{
  dogImage=loadImage("images/dogImg.png")
  happyDog=loadImage("images/Happy.png")
 //bedroomImg=loadImage("images/Bed Room.png")
//gardenImg=loadImage("images/Garden.png")
//washroomImg=loadImage("images/Wash Room.png")
	//load images here
}

function setup() {
database=firebase.database();

  createCanvas(500,500);
  foodObj=new Food();

  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  feed=createButton("Feed the dog");
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(750,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(200,200,10,10);
  dog.addImage(dogImage);
  dog.scale=0.25

  
  
}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on('value',function(data){
  lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+lastFed%12+" PM",300,30);
}else if(lastFed==0){
  text("Last Feed: 12 AM", 300, 30);
}else{
  text("Last Feed: "+ lastFed +"AM", 300,30)
}

drawSprites();

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}




function feedDog(){
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  }