window.onload=init;
function init() {
	var box=document.getElementById('mini_box');
	var btn=document.getElementById('mini_button');


	var abc=document.getElementsByClassName("post-content")[0];///////将文章第一个标签填写在main处
	// var abc=document.body;

	var speed=20;//速度
	var timer,timer2;
	//鼠标点击事件
	btn.onclick=function(){
		ios13grant();
		clearInterval(timer2);//清除定时器
		timer2=setInterval(moveLeft,50);
		btn.style.display="none";
	};

	//鼠标在按钮上方，按钮出现
	btn.onmousemove=function(){
		clearInterval(timer);
		timer=setInterval(btn_display,50);
	}  

	//鼠标离开按钮上方
	btn.onmouseleave=function(){
		clearInterval(timer);
		timer=setInterval(un_btn_display,50);
	}


	//鼠标离开弹窗
	box.onmouseleave=function(){
		clearInterval(timer2);
		timer2=setInterval(moveRight,50);
		btn.style.display="inline-block";
	};

	//鼠标点击其他位置
	document.onmouseup = function(e) {
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if (!(target == box) && !box.contains(target)) {
			// 点击了mini_box元素外的区域
			if (btn.style.display == "none"){  
				clearInterval(timer2);
				timer2=setInterval(moveRight,50);
				btn.style.display="inline-block";
			}
		}
	}


	//按钮加深
	function btn_display(){
		var arl=btn.style.opacity;
		if(arl>=1){
			clearInterval(timer);
		}else{
			btn.style.opacity=Number(arl)+0.2;
		}
	}

	//按钮复原
	function un_btn_display(){
		var arl=btn.style.opacity;
		if(arl<=0.2){
			clearInterval(timer);
		}else{
			btn.style.opacity=Number(arl)-0.2;
		}
	}

	//向左移动
	function moveLeft(){	
		var r=document.documentElement.clientWidth-box.offsetLeft;//右边距		
		var arl=box.style.opacity;	
		if(r>=320){
			clearInterval(timer2);
		}else{
			box.style.right=r-300+speed+'px';
			box.style.opacity=Number(arl)+0.1;
		}
	}

	//滑块移动
	function moveRight(){
		var r=document.documentElement.clientWidth-box.offsetLeft;//边距
		var arl=box.style.opacity;
		if(r<=0){
			clearInterval(timer2);//停止
		}else{
			box.style.right=r-300-speed+'px';	//移动
			box.style.opacity=Number(arl)-0.1;
		}
		
	}

	function ios13grant(){
		var ua = navigator.userAgent.toLowerCase();
		// alert('UA：'+ua);
		if(ua.indexOf("mac os x") > 0)
		{
			var reg = /os [\d._]*/gi ;
			var verinfo = ua.match(reg) ;
			var version = (verinfo+"").replace(/[^0-9|_.]/ig,"").replace(/_/ig,".");
			// alert('版本：'+version);
			if (Number(version)>=13.3) 
			{
				if (typeof (DeviceMotionEvent) !== 'undefined' && typeof (DeviceMotionEvent.requestPermission) === 'function') {
					window.DeviceOrientationEvent.requestPermission().then(state => {
						if (state === "granted") { 
							// 监听传感器运动事件
							if (window.DeviceMotionEvent) {
								// alert("授权成功")
							} else {
								// alert('手机不支持陀螺仪功能');
							}
						} else if (state === "denied") { 
							// alert("拒绝授权")
						} else if (state === "prompt") {
							// alert("你对手机做了啥")
						}
					})
				} 
				// DeviceMotionEvent.requestPermission()
				// .then(permissionState => {                
				// 	if (permissionState == 'granted') {
				// 		console.log('ios授权成功！')
				// 	}
				// }).catch((err)=>
				// {
				// 	// $("#fkIOS").css("display","block");
				// 	$("#fkIOS").style.setProperty('display','block');
				// })
			}
		}
	}

	if(window.DeviceMotionEvent) {  
		var speed = 10;  
		var x = y = z = lastX = lastY = lastZ = 0;  
		window.addEventListener('devicemotion', function(){  
			var acceleration =event.accelerationIncludingGravity;  
			x = acceleration.x;  
			y = acceleration.y;  
			if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed) {
				if (btn.style.display == "none"){  
					clearInterval(timer2);
					timer2=setInterval(moveRight,50);
					btn.style.display="inline-block";
				} else {
					clearInterval(timer2);//清除定时器
					timer2=setInterval(moveLeft,50);
					btn.style.display="none";
				}
			}  
			lastX = x;  
			lastY = y;  
		}, false);  
	}  
    set_TOC(abc);//如果文章是异步加载，须让此函数在文章加载后执行
}
