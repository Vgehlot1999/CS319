var playing = false;
var init = false;
var x = 0;
var y = 300;
var speed = 1;
var death = false;
var direction = "right";
var canvas;

var ctx;
function start()
{
	
	var game = document.getElementById("start");
	if(game.value == "Start")
	{
		game.value = "Stop";
		playing = true;
		if(init === false)
		{
			canvas = document.getElementById("canvas");

			ctx = canvas.getContext("2d");
			timer();
			init = true;
		}
	}
	else
	{
		game.value = "Start";
		playing = false;
		clearInterval(timer);
		
	}
}
function turnRight()
{
	if(playing && !death)
	{
		if( direction == "right")
		{
			direction = "down";
		}
		else if( direction == "down")
		{
			direction = "left";
		}
		else if( direction == "left")
		{
			direction = "up";
		}
		else
		{
			direction = "right";
		}
	}
}
function turnLeft()
{
	if(playing && !death)
	{	if( direction == "right")
		{
			direction = "up";
		}
		else if(direction == "up")
		{
			direction = "left";
		}
		else if( direction == "left")
		{
			direction = "down";
		}
		else
		{
			direction = "right";
		}
	}
}
function timer()
{
	
	var timer = setInterval(function()
	{
		if(playing && !death)
		{
		
			ctx.moveTo(x, y);
			if(direction == "right")
			{
				if(ctx.getImageData(x+speed + 3,y,1,1).data[0] <255 && ctx.getImageData(x+speed,y,1,1).data[1] <255 && ctx.getImageData(x+speed,y,1,1).data[2] < 255)
				{
					ctx.lineTo(x+=speed, y);
					outOfBounds();
				}
				else
				{
					ctx.lineTo(x+=speed+3, y);
					death = true;
					alert("you hit yourself!");
					
				}
			}
			else if(direction == "left")
			{
				if(ctx.getImageData(x-speed - 3,y,1,1).data[0] <255 &&ctx.getImageData(x-speed,y,1,1).data[1] <255 && ctx.getImageData(x-speed,y,1,1).data[2] < 255)
				{
					ctx.lineTo(x-=speed, y);
					outOfBounds();
				}
				else
				{
					ctx.lineTo(x-=speed-3, y);
					death = true;
					alert("you hit yourself!");
					
				}
			}
			else if(direction=="down")
			{
				if(ctx.getImageData(x,y+speed+3,1,1).data[0] <255 &&ctx.getImageData(x,y+speed,1,1).data[1] <255 && ctx.getImageData(x,y+speed,1,1).data[2] < 255)
				{
					ctx.lineTo(x, y+=speed);
					outOfBounds();
				}
				else
				{
					ctx.lineTo(x, y+=speed + 3);
					death = true;
					alert("you hit yourself!");
					
				}
			}
			else
			{
				if(ctx.getImageData(x,y-speed-3,1,1).data[0] <255 && ctx.getImageData(x,y-speed,1,1).data[1] <255 && ctx.getImageData(x,y-speed,1,1).data[2] < 255)
				{
					ctx.lineTo(x, y-=speed);
					outOfBounds();
				}
				else
				{
					ctx.lineTo(x, y-=speed-3);
					death = true;
					alert("you hit yourself!");
														
				}
			}
			ctx.lineWidth = 2;
			ctx.strokeStyle = "red";
			ctx.lineCap = "round";
			ctx.stroke();
		}
	},25);
	
}
function outOfBounds()
{
	if(x>= canvas.width || x<=0 || y>=canvas.height || y<=0)
	{death = true;
		alert("you hit a wall! Refresh the page");
	}
}

