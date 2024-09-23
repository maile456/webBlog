let time = 25; // 初始速度
let map = document.getElementById('map');
let timer;
let socre = 0;
//蛇的构造函数
function Snake() {

    //一个格子的大小，头部移动方向
    this.width = 10;
    this.height = 10;
    this.direction = 'right'; 

    //默认位置
    this.body = [
        { x: 2, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 0 }
    ];
    
    //在坐标处画一个格子
    this.display = function () {
        for (var i = 0; i < this.body.length; i++) {
            if (this.body[i].x != null) {
                var s = document.createElement('div');
                this.body[i].flag = s;
                s.style.width = this.width + 'px';
                s.style.height = this.height + 'px';
                s.style.backgroundColor = 'yellow';
                s.style.position = 'absolute';
                s.style.left = this.body[i].x * this.width + 'px';
                s.style.top = this.body[i].y * this.height + 'px';
                map.appendChild(s);
            }
        }
        this.body[0].flag.style.backgroundColor = 'orange'; 
    };


    //移动逻辑，根据方向使头部移动，尾部跟随
    this.run = function () {
        //尾部跟随
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //头部移动
        switch (this.direction) {
            case "left":
                this.body[0].x -= 1;
                break;
            case "right":
                this.body[0].x += 1;
                break;
            case "up":
                this.body[0].y -= 1;
                break;
            case "down":
                this.body[0].y += 1;
                break;
        }
        //头部碰撞检查
        if (this.body[0].x < 0 || this.body[0].x > 150 || this.body[0].y < 0 || this.body[0].y > 60)
        {
            clearInterval(timer);
            alert("Over Map, Over Game!");
            document.getElementById('beginBox').style.display = 'block';

            for (var i = 0; i < this.body.length; i++) {
                if (this.body[i].flag != null) {
                    map.removeChild(this.body[i].flag);
                }
            }

            this.body = [
                { x: 2, y: 0 },
                { x: 1, y: 0 },
                { x: 0, y: 0 }
            ];
            this.direction = 'right';
            this.display();
            return false;
        }

        // 判断是否吃到食物，坐标重叠，增加蛇的长度，食物刷新
        if (this.body[0].x == food.x && this.body[0].y == food.y) {
            this.body.push({ x: null, y: null, flag: null });
            var len = this.body.length;
            time = time - (len - 3) * 5; 
            if (time < 40) {
                time = 40;
            }
            refresh();
            map.removeChild(food.flag);
            food.display();
        }

        //撞到自己结束游戏判定
        for (var i = 4; i < this.body.length; i++) {
            if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                alert('You hit yourself!');
                document.getElementById('beginBox').style.display = 'block'; // 修正 dispaly 错误
                for (var j = 0; j < this.body.length; j++) {
                    if (this.body[j].flag != null) {
                        map.removeChild(this.body[j].flag);
                    }
                }
                this.body = [
                    { x: 2, y: 0 },
                    { x: 1, y: 0 },
                    { x: 0, y: 0 }
                ];
                this.direction = 'right';
                this.display();
                return false;
            }
        }



        for (var i = 0; i < this.body.length; i++) {
            if (this.body[i].flag != null) {
                map.removeChild(this.body[i].flag);
            }
        }
        this.display();
    };
}

//食物的构造函数
function Food() {
    this.width = 10;
    this.height = 10;
    this.display = function () {

            var f = document.createElement('div');
            this.flag = f;
            f.style.width = this.width + 'px';
            f.style.height = this.height + 'px';
            f.style.background = 'red';
            f.style.position = 'absolute';
            this.x = Math.floor(Math.random() * 80);
            this.y = Math.floor(Math.random() * 40);
            f.style.left = this.x * this.width + 'px';
            f.style.top = this.y * this.height + 'px';
            map.appendChild(f);
        
    };
}

var snake = new Snake();
var food = new Food();
snake.display();
food.display();

//键盘输入控制
document.body.onkeydown = function (e) {
    var ev = e || window.Event;
    switch (ev.keyCode) {
        case 38:
            if (snake.direction != 'down') {
                snake.direction = "up";
            }
            break;
        case 40:
            if (snake.direction != "up") {
                snake.direction = "down";
            }
            break;
        case 37:
            if (snake.direction != "right") {
                snake.direction = "left";
            }
            break;
        case 39:
            if (snake.direction != "left") {
                snake.direction = "right";
            }
            break;
        // WASD 键
        case 87:
            if (snake.direction != "down") {
                snake.direction = "up";
            }
            break;
        case 83:
            if (snake.direction != "up") {
                snake.direction = "down";
            }
            break;
        case 65:
            if (snake.direction != "right") {
                snake.direction = "left";
            }
            break;
        case 68:
            if (snake.direction != "left") {
                snake.direction = "right";
            }
            break;
    }
};

var btn = document.getElementById('begin');
//游戏主要逻辑启动器
btn.onclick = function () {
    var parent = this.parentNode;
    parent.style.display = 'none';
    timer = setInterval(function () {
        snake.run();
    }, time);
};

function refresh() {
    clearInterval(timer);
    timer = setInterval(function () {
        snake.run();
    }, time);
}
