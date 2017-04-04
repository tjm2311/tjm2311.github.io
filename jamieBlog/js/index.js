//main_nav	左边导航及对应右边内容动画
(function(){
	var mainNav = document.getElementById('main_nav');
	var lis = mainNav.getElementsByTagName('li');
	var content_wrap = document.getElementById('content_wrap');
	var divs = content_wrap.getElementsByTagName('div');
//	alert(lis.length)
	var iNow = 0;
	var len = lis.length;
	lis[iNow].style.opacity = 1;
	for(var i=0;i<lis.length;i++){
		lis[i].index = i;
		lis[i].onclick = function(){
			for(var i=0;i<lis.length;i++){
				lis[i].className = '';
			}
			var deg = this.index*90;
//			右边角度的变换
			content_wrap.style.transform ='rotateX('+deg+'deg)';
			content_wrap.style.WbkitTransform ='rotateX('+deg+'deg)';
			content_wrap.style.MozTransform ='rotateX('+deg+'deg)';
			content_wrap.style.MsTransform ='rotateX('+deg+'deg)';
			content_wrap.style.OTransform ='rotateX('+deg+'deg)';
//			左边class的变化
			iNow = this.index;
			lis[iNow==0?len-1:iNow-1].className = 'top';
			lis[iNow].className = 'current';
			lis[iNow==len-1?0:iNow+1].className = 'bottom';
			
			divs[iNow].style.opacity = 1;
		}
	}
})();
//web静态网页左右滑动效果
(function(){
	var web = document.getElementById('web');
	var lis = web.getElementsByTagName('li');
	var prev = web.getElementsByClassName('prev')[0];
	var next = web.getElementsByClassName('next')[0];
	var arr = [];
	var onOff = false;
	for(var i=0;i<lis.length;i++){
		arr.push(lis[i].className);
	}
	console.log(prev)
	prev.onclick = function(){
		if(onOff)return;
		onOff = true;
		arr.unshift(arr.pop());
		for(var i=0;i<lis.length;i++){
			lis[i].className = arr[i];
		}
	}
	next.onclick = function(){
		if(onOff)return;
		onOff = false;
		arr.push(arr.shift());
		for(var i=0;i<lis.length;i++){
			lis[i].className = arr[i];
		}
	}
	for(var i=0;i<lis.length;i++){
		lis[i].addEventListener('transitionend',function(){
			onOff = false;
		},false)
		
	}
})();
//喜欢的     点击旋转开多个div效果
(function(){
	var like = document.getElementById('like');
	var spans = like.querySelectorAll('span');
	var sp = spans.length-1;
	for( var i=0;i<sp;i++){
		if(i<sp){
			spans[i].style.background = 'url(img/'+i%6+'.jpg)'
		}
	}
	//打开旋转
	spans[sp].onclick = function(){
		like.removeChild(this);
		for(var i=0;i<sp;i++){
			spans[i].style.transition = '1s all ease';
			(function(index){
				setTimeout(function(){
					spans[index].style.transform = 'rotateY(-'+index*360/sp+'deg) translateZ(300px)'
				})
			})(i)
		}
//		拖拽
		let x = 0,
		y = 0,
		speedX = 0,
		speedY = 0,
		lastX = 0,
		lastY = 0,
		timer = null;
		like.onmousedown = function(ev){
			clearInterval(timer);
			let  disX = ev.pageX - y,
			disY = ev.pageY -x;
			document.onmousemove = function(ev){
				x = ev.pageY - disY;
				y = ev.pageX - disX;
				like.style.transform = 'perspective(800px) rotateX('+(-x/5)+'deg) rotateY('+y/5+'deg)';
				speedX = ev.pageX - lastX;
				speedY = ev.pageY - lastY;
				lastX = ev.pageX;
				lastY = ev.pageY;
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
				timer = setInterval(function(){
					speedX*=0.95;
					speedY*=0.95;
					y+=speedX;
					x+=speedY;
					like.style.transform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
					if(Math.abs(speedX)<1)speedX=0;
					if(Math.abs(speedY)<1)speedY=0;
					if(speedX==0&&speedY==0){
						clearInterval(timer);
					}
				},30)
			}
			return false;
		}
	}
})()
