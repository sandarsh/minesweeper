function Cell(i, j, width, height) {
	this.width = width;
	this.height = height;
	this.isBee = false;
	this.isRevealed = false;
	this.centerX = j;
	this.centerY = i;
	this.count = null;
	this.isFlagged = false;


	this.draw = function(){
		fill(175);
		stroke("black");
		rect(this.centerX, this.centerY,this.width, this.height);
		if(this.isRevealed && this.isBee){
			fill(150);
			stroke("black");
			ellipse(this.centerX+this.width/2, this.centerY+this.height/2, this.width *0.5 , this.height * 0.5);
		}
		if(this.isRevealed && this.count !== null && !this.isBee){
			textSize(this.width * 0.5);
			fill("black");
			text(this.count,this.centerX + (this.width/2), this.centerY+(this.height/2));
		}
		if(this.isRevealed && this.count === null && !this.isBee){
			fill("black");
			stroke("grey");
			rect(this.centerX, this.centerY,this.width,this.height);
		}
		if(this.isFlagged){
			fill("red");
			stroke("black");
			rect(this.centerX, this.centerY,this.width,this.height);
		}
	}
}