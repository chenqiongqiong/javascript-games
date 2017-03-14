var myGamePiece;//设置玩家	
		var frameNo=0;//存储游戏帧

		var boxes=[];//存储不断出现的物体

		

		//游戏开始
		function startGame(){
			myGamePiece=new box(100, 100, 200, 0,"rgb(0,255,255)");
			myGameArea.start();
		}

		function stopGame(){
			clearInterval(myGameArea.interval);  // 停止动画
		}


		// 设置游戏区域
		var myGameArea={
			canvas:document.createElement("canvas"),//生成canvas
			start:function(){
				this.canvas.width=1200;
				this.canvas.height=800;
				this.context=this.canvas.getContext("2d");
				document.body.insertBefore(this.canvas,document.body.childNodes[0]);
								
				this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
				this.interval=setInterval(updateGame,20);//动画
			},
			clear:function(){
				this.context.fillStyle="#aaaaaa";//清屏
				this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
				// this.canvas.getContext("2d").clearRect(0,0,this.canvas.width,this.canvas.height);
			}
		}


		function box(width,height,x,y,color){    //方格生成
			this.x=x;
			this.y=y;
			this.height=height;
			this.width=width;
			this.gravity=0.09;
			this.speedY=0;
			this.speedX=3;

			this.update=function(){             //更新位置
				ctx=myGameArea.context;
				ctx.fillStyle=color;
				this.speedY+=this.gravity;
				this.y+=this.speedY;
				this.x+=this.speedX;
				ctx.fillRect(this.x,this.y,this.width,this.height);
				
				if(this.y>(myGameArea.canvas.height-this.height)){    //检测碰地
					this.speedY*=-1;
				}

				if(this.x>(myGameArea.canvas.width-this.width)||this.x<0){   // 检测撞到边墙
					this.speedX*=-1;
				}

			}
		}

		function updateGame(){   //游戏运行
			
			frameNo++;
			// console.log(frameNo);
			myGameArea.clear();
			if(frameNo%500==0){     // 每隔500帧生成新的方格
				var red=Math.random()*255;
				var blue=Math.random()*255;
				var green=Math.random()*255;    //随机三原色
				var alpha=Math.random();
				// var col=rgb(red,green,blue);
				// console.log(col);
				// 
				boxes.push(new box(50,50,Math.random()*myGameArea.canvas.width,0,"rgb("+red+","+green+","+blue+")"));
			}

			for (var i = boxes.length - 1; i >= 0; i--) {    方格更新位置
				boxes[i].update();
			}
			
			myGamePiece.update();   // 玩家更新位置
		}