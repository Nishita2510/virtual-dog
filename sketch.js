var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var gameState=0;
var playerCount;
var form,player,game;
//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  game = new Game()
  game.getState()
  game.start()
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  fedTime=database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed = data.val()
  })

//  readState=database.ref('gameState');
//  readState.on("value",function(data){
 //   gameState=data.val();
 // });   

  //create feed the dog button here
  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(790,95);
  feedTheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fill("black");
    stroke(0);
    //strokeWeight(5);
    textSize(20);
  //write code to display text lastFed time here
  if (lastFed >= 12) {
    text("Last Fed :" + lastFed % 12, " PM", 250, 50);
  } else if (lastFed == 0) {
    text("Last Fed : 12 AM", 250, 50);
  } else {
    text("Last Fed : " + lastFed + " AM", 250, 50);
  }
  
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
  
function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock()
    if(food_stock_val <=0){
      foodObj.updateFoodStock(food_stock_val *0)
    }else{
      foodObj.updateFoodStock(food_stock_val -1)
    }
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour(),
    })
   
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS,
  })
}
