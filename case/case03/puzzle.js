

//获取画布
var background = document.getElementById("background");
var context = background.getContext('2d');


//设置图片参数
var padding = 0; // 图片边距
var column = 3; // 列数
var imageWidth, imageHeight;
var imageIndexForPosition = [];
var isFinish = false;
var imageUrl = "";




//获取图片，设置画布大小,
document.getElementById("startGame").onclick = function () {
    imageUrl = document.getElementById("imageSelect").value;
    if (imageUrl) {
        var img = new Image();
        img.src = imageUrl;
        img.onload = function () {
            imageWidth = this.width;
            imageHeight = this.height;
            // 设置 canvas 大小
            background.width = imageWidth + padding * (column + 1);
            background.height = imageHeight + padding * (column + 1);
            // 显示参考图片
            var referenceImage = document.getElementById("referenceImage");
            referenceImage.src = imageUrl;
            referenceImage.style.display = "block";
            
            setupRandomPosition();
            drawAllImage();
        };
    } else {
        alert("请输入有效的图片URL");
    }
};

//点击画布计算位置 
background.onclick = function (e) {
    if (isFinish) return;

    var x = parseInt(e.offsetX / (padding + imageWidth / column));
    var y = parseInt(e.offsetY / (padding + imageHeight / column));

    var position = y * column + x;
    var target = moveImageIfCanAtPosition(position);
    if (target >= 0) {
        refreshImagePositions(position, target);
    }
    if (checkIfFinish()) {
        drawImageItem(imageIndexForPosition[lastIndex()], lastIndex());
        isFinish = true;


    }
};

document.body.onkeydown = function (event) {
    if (isFinish) return;

    var position = -1;
    if (event.keyCode == '37') position = rightOfPosition(background.emptyPosition);
    else if (event.keyCode == '38') position = bottomOfPosition(background.emptyPosition);
    else if (event.keyCode == '39') position = leftOfPosition(background.emptyPosition);
    else if (event.keyCode == '40') position = topOfPosition(background.emptyPosition);

    if (position < 0 || position > lastIndex()) return;

    var target = moveImageIfCanAtPosition(position);
    if (target >= 0) {
        refreshImagePositions(position, target);
    }
    if (checkIfFinish()) {
        drawImageItem(imageIndexForPosition[lastIndex()], lastIndex());
        isFinish = true;
    }
};

var drawImageItem = function (index, position) {
    var img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        var rect = rectForPosition(position);
        var srcX = (index % column) * (imageWidth / column);
        var srcY = Math.floor(index / column) * (imageHeight / column);
        context.drawImage(img, srcX, srcY, imageWidth / column, imageHeight / column, rect[0], rect[1], rect[2], rect[3]);
    }
};

//清除当前的，在目标处绘画
var refreshImagePositions = function (origin, target) {
    var originRect = rectForPosition(origin);
    context.clearRect(originRect[0], originRect[1], originRect[2], originRect[3]);
    drawImageItem(imageIndexForPosition[target], target);
};
//画图
var drawAllImage = function () {
    for (var position = 0; position < column * column; position++) {
        var index = imageIndexForPosition[position];
        if (index == lastIndex()) continue;
        drawImageItem(index, position);
    }
};

var moveImageIfCanAtPosition = function (position) {
    var top = topOfPosition(position);
    var left = leftOfPosition(position);
    var bottom = bottomOfPosition(position);
    var right = rightOfPosition(position);

    var targetPosition = -1;
    if (isPositionEmpty(top)) targetPosition = top;
    else if (isPositionEmpty(left)) targetPosition = left;
    else if (isPositionEmpty(bottom)) targetPosition = bottom;
    else if (isPositionEmpty(right)) targetPosition = right;

    if (targetPosition >= 0) {
        imageIndexForPosition[targetPosition] = imageIndexForPosition[position];
        imageIndexForPosition[position] = lastIndex();
        background.emptyPosition = position;
        return targetPosition;
    }
    return -1;
};

var isPositionEmpty = function (position) {
    return position >= 0 && position <= lastIndex() && imageIndexForPosition[position] == lastIndex();
};

var lastIndex = function () {
    return column * column - 1;
};


//计算四个角点的坐标
var rectForPosition = function (position) {
    if (position < 0 || position > lastIndex()) return [0, 0, 0, 0];
    var x = (position % column) * (padding + imageWidth / column) + padding;
    var y = Math.floor(position / column) * (padding + imageHeight / column) + padding;
    return [x, y, imageWidth / column, imageHeight / column];
};

//检测是否结束游戏
var checkIfFinish = function () {
    for (var index = 0; index < imageIndexForPosition.length; index++) {
        if (index != imageIndexForPosition[index]) return false;
    }
    return true;
};

var leftOfPosition = function (position) {
    return (position % column) == 0 ? -1 : position - 1;
};

var rightOfPosition = function (position) {
    return (position % column) == (column - 1) ? -1 : position + 1;
};

var topOfPosition = function (position) {
    return position - column;
};

var bottomOfPosition = function (position) {
    return position + column;
};

//获得图片各位置序号，空位置默认9号
var setupRandomPosition = function () {
    var lists = [
        [4, 3, 2, 8, 0, 7, 5, 6, 1],
        [2, 0, 5, 6, 8, 7, 3, 1, 4],
        [3, 7, 2, 4, 1, 6, 8, 0, 5],
        [3, 2, 4, 1, 7, 6, 5, 0, 8]
    ];

    imageIndexForPosition = lists[Math.floor(Math.random() * 4)];
    background.emptyPosition = 9;

}

//完成游戏彩蛋

let slideIndex = 0; // 当前幻灯片索引
const slides = document.querySelectorAll(".slide"); // 获取所有幻灯片

function showSlides() {
    slides.forEach(slide => {
        slide.style.display = "none";
    });
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000); // 每 2 秒切换幻灯片
}

// 模拟胜利并启动幻灯片
function handleVictory(isVictory) {
    if (isVictory === 1) {
        
        const modal = document.getElementById("victory-slideshow");
        modal.style.display = "block"; // 显示幻灯片
        showSlides(); // 启动幻灯片播放
        const audio = document.getElementById("victory-audio");
        audio.play();
    }
}

// 点击按钮模拟胜利
document.getElementById("simulate-victory").onclick = function () {
    handleVictory(1); // 传入参数 1 来播放幻灯片
};

// 点击窗外区域关闭幻灯片
window.onclick = function (event) {
    const modal = document.getElementById("victory-slideshow");
    if (event.target == modal) {
        modal.style.display = "none"; // 隐藏幻灯片
    }
};
setInterval(() => {
    if (isFinish== 1) {

        const modal = document.getElementById("victory-slideshow");
        modal.style.display = "block"; // 显示幻灯片
        showSlides(); // 启动幻灯片播放
        const audio = document.getElementById("victory-audio");
        audio.play();
    }
    
}, 500);
