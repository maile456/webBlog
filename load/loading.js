document.addEventListener('DOMContentLoaded', function () {
    var loader = document.getElementById('loader');
    var progressBar = document.getElementById('progress-bar');
    var progress = 0; // 初始化进度为 0
    var maxProgress = 100; // 最大进度（100%）
    var duration = 3000; // 总加载时间（3 秒）
    var startTime = Date.now(); // 记录开始时间;
    function updateProgress() {
        var elapsedTime = Date.now() - startTime; // 计算已过时间
        progress = (elapsedTime / duration) * maxProgress; // 根据时间计算进度

        if (progress >= maxProgress) {
            progress = maxProgress; // 确保进度不超过最大值
            progressBar.style.width = progress + '%'; // 更新进度条宽度
            setTimeout(function () {
                loader.style.display = 'none'; // 隐藏加载动画
                window.location.replace('web/blog.html'); // 跳转到目标页面
            }, 500); // 可选：在隐藏加载动画后，等待 500 毫秒
        } else {
            progressBar.style.width = progress + '%'; // 更新进度条宽度
            requestAnimationFrame(updateProgress); // 继续更新进度
        }
    }

    requestAnimationFrame(updateProgress); // 启动进度更新
});
