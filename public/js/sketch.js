'use strict';

var game;

function setup(){
	var canvas = createCanvas(601, 601);
	canvas.parent('sketch-holder');
	game = new game();
	game.setup(width, height);
}


function mousePressed(){
	if(mouseButton == LEFT){
		game.update(mouseX, mouseY, width, height, false);
		if(game.isGameOver){
			game.grid.map(function(row){
				row.map(function(cell){
					cell.isRevealed = true;
				})
			})
		}
	}
	if(mouseButton == RIGHT){
		game.update(mouseX, mouseY, width, height, true);
	}

}


function draw(){
	background("grey");
	game.draw();
	if(game.isGameOver){
		fill("Blue");
		textSize(40);
		text("   GAME OVER", (width / 2)/2, height /2);
	}
	if(game.isGameWon){
		fill("Blue");
		textSize(40);
		text("   YOU  WIN", (width / 2)/2, height /2);
	}
}