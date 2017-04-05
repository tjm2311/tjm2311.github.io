var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var colors = ['#69D2E7','#A7DBD8','#E0E4CC','#F38630','#FA6900','#FF4E50','#F9D423'];
var balls = [];
var timer3 = null;
var on = true;//让鼠标移动的时候，定时器也可以跑

canvas.width = window.innerWidth;
canvas.height = window.innerHeight+400;
canvas.style.backgroundColor = 'black';
//return;


/* 分析：
 *		一个圆
 * 			1、半径不同
 * 			2、颜色不同
 * 			3、位置不同
 * 			4、速度不同
 * 
 * 		var ball = {
 * 			x:x轴的位置
 * 			y:y轴的位置
 * 			r:远的半径
 * 			vx:x轴的速度
 * 			vy:y轴的速度
 * 			color:颜色
 * 		}
 * 	角度转弧度：
 * 		数学公式：角度*π/180
 * 				 360*π/180
 */

//在canvas上画圆
function draw(ball){
	//传声明对象
	context.beginPath();//开始的路径
	//arc(x轴的位置，y轴的位置，半径，起始弧度，结束弧度)
	context.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
	context.fillStyle = ball.color;//给圆填充颜色
	context.globalCompositeOperation = 'lighter';//球合成高亮
	context.fill();//填充到画布
}

//取x到y之间随机数：math.round(Math.random()*y-x(+x))
function random(min,max){ 
	return Math.round(Math.random()*(max-min)+min);
}

//给canvas添加鼠标移动事件
canvas.onmousemove = function(ev){
	//在移动时候创建两个圆
	for (var i = 0; i < 2; i++) {
		var ball = {
			x:random(-5,5)+ev.clientX,
			y:random(-5,5)+ev.clientY+window.pageYOffset,
//			r:random(10,45),
			r:random(10,30),
			vx:Math.random()-0.5,
			vy:Math.random()-0.5,
			color:colors[random(0,colors.length-1)]
		};
		balls.push(ball);
		if(balls.length>300){
			balls.shift();
		}
	}
	
	//让定时器只开启一次
	if(on){
		clearInterval(timer);
		timer3 = setInterval(drallBall,30);
		on =!on;
	}
	
	
	drallBall()
	function drallBall(){
		context.clearRect(0,0,canvas.width,canvas.height);
		for (var i = 0; i < balls.length; i++) {
			//需要在画的时候把球的位置和半径都改了，这样看上去球才会动
			balls[i].x += balls[i].vx*8;//通过速度改变x轴的位置
			balls[i].y += balls[i].vy*8;//通过速度改变y轴的位置
			balls[i].r = balls[i].r*0.94;//改变球的半径
			balls[i].index = i;//为了在下面能够找到他并删掉
			//如果球的半径小于1的时候，就不让canvas再画它了
			if(balls[i].r<1){
				balls.splice(balls[i].index,1);
				continue;//如果球已经被删了，下面的代码就不用再走了；
			}
			draw(balls[i]);
			if(!balls.length){
				clearInterval(timer3);
				on = true;
			}
		}
	}
}
