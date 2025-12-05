const fs = require('fs');
const nodemailer = require('nodemailer');

// 1. 配置发件箱 (使用 GitHub Secrets 注入的变量)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",   // 明确指定邮件的 SMTP 服务器
    port: 465,             // 明确指定 SSL 端口
    secure: true,          // 开启安全连接
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 2. 读取订阅者列表
const subscribers = fs.readFileSync('subscribers.txt', 'utf-8')
    .split('\n')
    .map(email => email.trim())
    .filter(email => email.length > 0);

// 3. 邮件内容 (你可以每次手动改这里，或者搞更高级的自动抓取)
const mailOptions = {
    from: `"冰书 BingBook" <${process.env.EMAIL_USER}>`,
    subject: `冰书周刊精选：${new Date().toLocaleDateString()}`,
    html: `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>📅 冰书周刊精选</h2>
            <p>感谢订阅，这是周刊的精选文章：</p>
            <hr>
            <h3><a href="https://bingbook.cn">1. 点击查看周刊更新的4篇文章</a></h3>
            <p>请访问官网阅读完整内容。</p>
            <hr>
            <p style="font-size: 12px; color: #888;">不想收到邮件？请回复退订。</p>
        </div>
    `
};

// 4. 发送邮件
async function sendAll() {
    console.log(`准备给 ${subscribers.length} 人发送邮件...`);
    
    // 为了防止被封号，建议把所有人放在 Bcc (密送) 里，这样大家互看不到邮箱
    // 或者循环发送 (适合人数少)
    
    // 方案 A: 密送群发 (简单，省资源)
    const options = { ...mailOptions, bcc: subscribers };
    try {
        await transporter.sendMail(options);
        console.log('✅ 邮件发送成功！');
    } catch (error) {
        console.error('❌ 发送失败:', error);
        process.exit(1); // 让 GitHub Action 报错
    }
}

sendAll();
