"use strict";
let cell;

function populateNumbers(grid){
	for(let i = 0; i < grid.length; i++){
		for(let j = 0; j < grid[i].length; j++){
			if(grid[i][j].isBee)
				continue;
			let beeCount = 0;
			for(let k = -1; k <= 1; k++){
				for(let l = -1; l <= 1; l++){
					if(typeof grid[i+k] === 'undefined' || typeof grid[i+k][j+l] === 'undefined')
						continue;
					if(grid[i+k][j+l].isBee){
						beeCount+=1;
					}
				}
			}
			if(beeCount !== 0){
				grid[i][j].count = beeCount;
			}
		}
	}
}

function flood(grid, i, j){
	grid[i][j].isRevealed = true;
	for(let k = -1; k <= 1; k++){
		for(let l = -1; l <= 1; l++){
			if(typeof grid[i+k] === 'undefined' || typeof grid[i+k][j+l] === 'undefined')
				continue;
			if(grid[i+k][j+l].isRevealed)
				continue;
			if((i === i+k) && (j === j+l)){
				continue;
			}
			if(grid[i+k][j+l].count !== null){
				grid[i+k][j+l].isRevealed = true;
			}
			if(grid[i+k][j+l].count === null){
				flood(grid, i+k, j+l);
			}
		}
	}
}

function isGameWon(grid){
	for(let i in grid){
		for(let j in grid[i]){
			if(grid[i][j].count !== null && grid[i][j].count !== 0 && !grid[i][j].isBee && !grid[i][j].isRevealed){
				console.log("Ran");
				return false;
			}
		}
	}
	return true;
}

function game() {
	this.numberOfBees = 20;
	this.cellWidth = 40;
	this.cellHeight = 40;
	this.w  = 0;
	this.h = 0;
	this.isGameOver = false;
	this.isGameWon = false;

	this.setup = function(w, h){
		let numRows = Math.floor(w / this.cellWidth);
		// console.log(numRows);
		let numCols = Math.floor(h / this.cellHeight);
		// console.log(numCols);
		this.grid = [];
		let randArr = [];
		for(let i=0; i<numRows; i++){
			let col = [];
			for(let j=0; j<numCols; j++){
				cell = new Cell(i*this.cellWidth, j * this.cellHeight, this.cellWidth, this.cellHeight);
				col.push(cell);
				randArr.push(cell);
			}
			this.grid.push(col);
		}
		// console.log(randArr.length);
		for(let i = 0; i< this.numberOfBees; i++){
			let cellNo = Math.floor(random(randArr.length-1));
			// console.log(cellNo);
			randArr[cellNo].isBee = true;
			// console.log(randArr[cellNo]);
			randArr.splice(cellNo,1);
		}
		populateNumbers(this.grid);
	};

	this.draw = function(){
		this.grid.map(function(arr){
			arr.map(function(cell){
				cell.draw();
			})
		})
	};

	this.update = function(mx, my, w, h, flag){
		let i = Math.floor(my / this.cellWidth);
		let j = Math.floor(mx / this.cellHeight);
		if(j >= Math.floor(w / this.cellWidth) || i >= Math.floor(h / this.cellHeight) || i < 0 || j < 0){
		} else if (flag){
			this.grid[i][j].isFlagged = !this.grid[i][j].isFlagged;
		} else {
			this.grid[i][j].isRevealed = true;
			if(this.grid[i][j].isBee){
				this.grid[i][j].count = 0;
				this.isGameOver = true;
			}
			if(isGameWon(this.grid)){
				this.isGameWon = true;
			}
			if(this.grid[i][j].count === null){
				flood(this.grid, i, j);
			}
		}

	}

}