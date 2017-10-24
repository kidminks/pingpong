// made by MAYANK KUMAR 
// GitHub username Kidminks
var speedX = -10;
var speedY = 10;
var movebotby = 8;
var mul = 0;


var balltop;
var ballleft;

var gameloop;
var movebotloop;

function startgame(event){
	if(event.which == 32){
		var	ball = document.getElementById("ball");
		var	ballCurrPos = ball.getBoundingClientRect();
		document.getElementById("del").innerHTML = "";
		balltop = ballCurrPos.top;
		ballleft = ballCurrPos.left;
		gameloop = setInterval(moveball,50);
		movebotloop = setInterval(movebot,50);
	}
	if(event.which == 40){
		moveplayer(12);
	}
	else if(event.which == 38){
		moveplayer(-12);
	}
}
	
function moveball(){
	var	ball = document.getElementById("ball");
	var	ballCurrPos = ball.getBoundingClientRect();
	var	wholebody = document.getElementById("body").getBoundingClientRect();
	var	playercurrpos = document.getElementById("player").getBoundingClientRect();
	var botcurrpos = document.getElementById("bot").getBoundingClientRect();
	var ballcenter = (ballCurrPos.bottom-ballCurrPos.top)/2+ballCurrPos.top;
	if(playercurrpos.top<=(ballcenter+10) && 
		playercurrpos.right>=ballCurrPos.left 
		&& playercurrpos.bottom>=(ballcenter-10) 
		&& playercurrpos.left<=ballCurrPos.left){
		speedX *= -1;
		if(mul >= 5){
			if(speedX>0){
				speedX += 2;
			}
			else{
				speedX -= 2;
			}
			if(speedY>0){
				speedY += 2;
			}
			else{
				speedY -= 2;
			}
			movebotby += 1;
			mul = 0;
		}
		mul += 1;
	}
	else if(botcurrpos.top<=(ballcenter+10) && 
		botcurrpos.right>=ballCurrPos.right 
		&& botcurrpos.bottom>=(ballcenter-10) 
		&& botcurrpos.left<=ballCurrPos.right){
		speedX *= -1;
		mul += 1;
	}
	else{
		if(wholebody.top > ballCurrPos.top ){
			speedY *= -1;
		}
		else if(wholebody.right < ballCurrPos.right ){
			gameover();
		}
		else if(wholebody.left > ballCurrPos.left ){
			gameover();
		}
		else if(wholebody.bottom < ballCurrPos.bottom ){
			speedY *= -1;
		}
	}
	ball.style.top = ballCurrPos.top+speedY+"px";
	ball.style.left = ballCurrPos.left+speedX+"px";
}
function gameover(){
	clearInterval(gameloop);
	clearInterval(movebotloop);
	var	ball = document.getElementById("ball");
	var	ballCurrPos = ball.getBoundingClientRect();
	var	wholebody = document.getElementById("body").getBoundingClientRect();
	if(ballCurrPos.left<wholebody.left){
		document.getElementById("total").innerHTML = "<p id='data'>BOT WON</p><p>refresh to play again</p>";
	}
	else if(ballCurrPos.right>wholebody.right){
		document.getElementById("total").innerHTML = "<p id='data'>YOU WON</p><p>refresh to play again</p>";
	}
}

function moveplayer(moveplayerby){
	var player = document.getElementById("player");
	var	wholebody = document.getElementById("body").getBoundingClientRect();
	var	playercurrpos = player.getBoundingClientRect();
	if(playercurrpos.top>wholebody.top && playercurrpos.bottom<wholebody.bottom){
		player.style.top = moveplayerby + playercurrpos.top + "px";
	}
}

function movebot(){
	var	ball = document.getElementById("ball");
	var	ballCurrPos = ball.getBoundingClientRect();
	var bot = document.getElementById("bot");
	var	wholebody = document.getElementById("body").getBoundingClientRect();
	var	botcurrpos = bot.getBoundingClientRect();
	var botcenter = (botcurrpos.bottom-botcurrpos.top)/2+botcurrpos.top;
	if((wholebody.right-ballCurrPos.right)> wholebody.right/2){
		if(wholebody.bottom/2>botcurrpos.top+20&&wholebody.bottom/2<botcurrpos.bottom-20){
			console.log("do nothing");
		}
		else if(botcenter>wholebody.bottom/2){
			bot.style.top = botcurrpos.top-movebotby+"px";
		}
		else if(botcenter<wholebody.bottom/2){
			bot.style.top = botcurrpos.top+movebotby+"px";
		}
	}
	else{
		if(speedY>0){
			var y = wholebody.bottom-ballCurrPos.bottom;
			var x = wholebody.right-ballCurrPos.right
			var move = wholebody.bottom-botcenter;
			if(y>=x){
				var check = wholebody.bottom-(y-x);
				if(check<botcenter+10&&check>botcenter-10){
					console.log("do nothing");
				}
				else if(move>=(y-x)){
					bot.style.top = botcurrpos.top+movebotby+"px";
				}
				else if(move<(y-x)){
					bot.style.top = botcurrpos.top-movebotby+"px";
				}
			}
			else{
				var check = wholebody.bottom-(x-y);
				if(check<botcenter+5&&check>botcenter-5){
					console.log("do nothing");
				}
				else if(move>=(x-y)){
					bot.style.top = botcurrpos.top+movebotby+"px";
				}
				else if(move<(x-y)){
					bot.style.top = botcurrpos.top-movebotby+"px";
				}
			}
		}
		else if(speedY<0){
			var y = ballCurrPos.top-wholebody.top;
			var x = wholebody.right-ballCurrPos.right
			var move = botcenter-wholebody.top;
			if(y>=x){
				var check = (y-x)-wholebody.top;
				if(check<botcenter+10&&check>botcenter-10){
					console.log("do nothing");
				}
				else if(move>=(y-x)){
					bot.style.top = botcurrpos.top-movebotby+"px";
				}
				else if(move<(y-x)){
					bot.style.top = botcurrpos.top+movebotby+"px";
				}
			}
			else{
				var check = (x-y)-wholebody.top;
				if(check<botcenter+10&&check>botcenter-10){
					console.log("kabhi kabhi");
				}
				else if(move>=(x-y)){
					bot.style.top = botcurrpos.top-movebotby+"px";
				}
				else if(move<(x-y)){
					bot.style.top = botcurrpos.top+movebotby+"px";
				}
			}
		}
	}

}