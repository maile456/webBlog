// 获取 DOM 元素
const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

// 初始化留言
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// 显示留言
function renderComments() {
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.innerHTML = `
      <p><strong>${comment.name}</strong> (${comment.email})</p>
      <p>${comment.message}</p>
      <small>留言时间：${new Date(comment.date).toLocaleString()}</small>
    `;
        commentList.appendChild(li);
    });
}

// 处理表单提交
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newComment = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
        date: new Date()
    };

    comments.push(newComment);

    // 保存留言到 localStorage
    localStorage.setItem('comments', JSON.stringify(comments));

    // 清空表单
    e.target.reset();

    // 重新渲染留言
    renderComments();
});

// 初始化显示留言
renderComments();
