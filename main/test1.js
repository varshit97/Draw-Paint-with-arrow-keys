var x=document.getElementById('canvas1');
var ctx=x.getContext('2d');
x.width=1000;
x.height=700;
ctx.fillRect(0,0,1000,700);
ctx.fillStyle='#000000';

var c=document.getElementById('canvas2');
var ctx1=c.getContext('2d');

var pacman_x=40,pacman_y=35,pacman_speed=200,time=Date.now(),pacman_speed_drop=200;
var keypressed={};
window.addEventListener('keydown', function(e) {
	keypressed[e.keyCode]=true;
	e.preventDefault();
});
window.addEventListener('keyup', function(e) {
	delete keypressed[e.keyCode];
	e.preventDefault();
});

var height=15,score=0,position=19,flag=0;
var si1,si2,si3;

function drop_block()
{
	if(height>680)
	{
		clearInterval(si3);
		ctx.clearRect(0,0,1000,700);
		var imageObj=new Image();
	     	imageObj.onload=function() {ctx.drawImage(imageObj,500,350,100,100);};
	      	imageObj.src='image2.png';
		return ;
	}
	ctx.beginPath();
	ctx.rect(position,height,5,5);
	ctx.fillStyle="rgba(255,0,0,0.5)";
	ctx.fill();
	ctx.lineWidth=6;
	ctx.strokeStyle="rgba(255,0,0,0.5)";
	ctx.stroke();
	height+=pacman_speed_drop*((Date.now()-time)/1000);
	document.getElementById('head1').innerHTML=pacman_speed_drop;
	if(Math.round(pacman_y)==Math.round(height) && Math.round(position)<=Math.round(pacman_x)+20 && Math.round(position)>=Math.round(pacman_x)-20)
	{
		score+=1;
		pacman_speed_drop+=100;
		document.getElementById('head3').innerHTML=score;
		position+=10;
		height=15;
		drop_block();
	}
}

function GetUrlValue(VarSearch)
{
	var SearchString=window.location.search.substring(1);
	var VariableArray=SearchString.split('&');
	for(var i=0; i<VariableArray.length;i++)
	{
		var KeyValuePair=VariableArray[i].split('=');
		if(KeyValuePair[0]==VarSearch)
		{
			l=KeyValuePair[1];
			return ;
		}
	}
}

function move(value)
{
	if(37 in keypressed && pacman_x>=19)
	{
        	pacman_x-=pacman_speed*value;
    	}
    	if(38 in keypressed && pacman_y>=15)
	{
        	pacman_y-=pacman_speed*value;
	}
	if(39 in keypressed && pacman_x<=974)
	{
	        pacman_x+=pacman_speed*value;
	}
    	if(40 in keypressed && pacman_y<=678)
	{
        	pacman_y+=pacman_speed*value;
	}
}

function cover_path(a,b)
{
	ctx.beginPath();
	ctx.rect(a,b,5,5);
	ctx.fillStyle='#00CC00';
	ctx.fill();
	ctx.lineWidth=6;
	ctx.strokeStyle='#00CC00';
	ctx.stroke();
}

var v;
function draw(value)
{
	if(37 in keypressed && pacman_x>=20)
	{
		v=pacman_x;
        	pacman_x-=pacman_speed*value;
		ctx.beginPath();
		ctx.rect(pacman_x,pacman_y,5,5);
		ctx.fillStyle='#00CC00';
		ctx.fill();
		ctx.lineWidth=6;
		ctx.strokeStyle='#00CC00';
		ctx.stroke();
		cover_path(v,pacman_y);
    	}
    	if(38 in keypressed && pacman_y>=21)
	{
		v=pacman_y;
        	pacman_y-=pacman_speed*value;
		ctx.beginPath();
		ctx.rect(pacman_x,pacman_y,5,5);
		ctx.fillStyle='#00CC00';
		ctx.fill();
		ctx.lineWidth=6;
		ctx.strokeStyle='#00CC00';
		ctx.stroke();
		cover_path(pacman_x,v);
	}
	if(39 in keypressed && pacman_x<=974)
	{
		v=pacman_x;
	        pacman_x+=pacman_speed*value;
		ctx.beginPath();
		ctx.rect(pacman_x,pacman_y,5,5);
		ctx.fillStyle='#00CC00';
		ctx.fill();
		ctx.lineWidth=6;
		ctx.strokeStyle='#00CC00';
		ctx.stroke();
		cover_path(v,pacman_y);
	}
    	if(40 in keypressed && pacman_y<=678)
	{
		v=pacman_y;
        	pacman_y+=pacman_speed*value;
		ctx.beginPath();
		ctx.rect(pacman_x,pacman_y,5,5);
		ctx.fillStyle='#00CC00';
		ctx.fill();
		ctx.lineWidth=6;
		ctx.strokeStyle='#00CC00';
		ctx.stroke();
		cover_path(pacman_x,v);
	}
}

function make_canvas_draw()
{
	ctx.beginPath();
	ctx.rect(pacman_x,pacman_y,5,5);
	ctx.fillStyle='#00CC00';
	ctx.fill();
	ctx.lineWidth=6;
	ctx.strokeStyle='#00CC00';
	ctx.stroke();
}

function make_canvas_move()
{
	ctx1.clearRect(0,0,1000,700);
	ctx1.beginPath();
	ctx1.rect(pacman_x,pacman_y,5,5);
	ctx1.fillStyle='#00CC00';
	ctx1.fill();
	ctx1.lineWidth=6;
	ctx1.strokeStyle='#00CC00';
	ctx1.stroke();
}

function main1()
{
	draw((Date.now()-time)/1000);
	make_canvas_draw();
	time=Date.now();
}

function main2()
{
	move((Date.now()-time)/1000);
	make_canvas_move();
	time=Date.now();
}

function basic(val)
{
	if(val.localeCompare("d")==0)
	{
		clearInterval(si2);
		si1=setInterval(main1,10);
	}
	else if(val.localeCompare("m")==0)
	{
		clearInterval(si1);
		si2=setInterval(main2,10);
	}
	else if(val.localeCompare("p")==0)
	{
		clearInterval(si1);
		si2=setInterval(main2,10);
		si3=setInterval(drop_block,100);
		get_score();
	}
}
//make_canvas_move();
