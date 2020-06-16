class Game {
  constructor(){
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    runner1 = createSprite(100,200);
    //runner1.addAnimation("runner1",runner1_img);
    runner2 = createSprite(300,200);
    //runner2.addAnimation("runner2",runner2_img);
    runner3 = createSprite(500,200);
    //runner3.addAnimation("runner3",runner3_img);
    runner4 = createSprite(700,200);
    //runner4.addAnimation("runner4",runner4);
    cars = [runner1, runner2, runner3, runner4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));

      image(track, 0,displayHeight*4,displayWidth, displayHeight*5);
      
      var index = 0;

      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        
        index = index + 1 ;

        x = x + 200;
      
        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;
        cars[index-1].y = y;
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y+150,30,30);
          cars[index - 1].shapeColor = "yellow";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          
        }
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    for (var i = 0; i < displayWidth; i=i+100) {
      rect(i, 220, 100, 50);
    }

    for (var i = 0; i < displayWidth; i=i+100) {
      rect(i, 330, 100, 50);
    }
    for (var i = 0; i < displayWidth; i=i+100) {
      rect(i, 440, 100, 50);
    }
    for (var i = 0; i < displayWidth; i=i+100) {
      rect(i, 550, 100, 50);
    }

    if(player.distance > 3860){
      gameState = 2;
    }
   
    drawSprites();
  }

  mousePressed(){
    if(keyCode == 32 && index === player.index){
      fill("green");
    }
  }

  end(){
    console.log("Game Ended");
  }
}