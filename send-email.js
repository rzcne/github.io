const fs = require('fs');
const nodemailer = require('nodemailer');

// 1. 配置发件箱 (使用 GitHub Secrets 注入的变量)
const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",   // 明确指定邮件的 SMTP 服务器
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
    subject: `冰书精选周刊：${new Date().toLocaleDateString()}`,
    html: `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2>📅 冰书精选周刊</h2>
            <p>感谢订阅，因网站合规要求，我们已经对网站进行改版。 </p>
</hr>
<p>新版网站地址为: bingbook.cn </p>
</hr>
<p>请访问官网阅读完整内容，我们即日起不再提供邮件订阅。可点击链接 https://bingbook.cn  使用微信公众号进行关注订阅，非常感谢您对我们的支持。 </p>
</hr>

<p>不想收到邮件？请回复退订。 </p>
</div>
    `
};

// 4. 发送邮件
async function sendAll() {
    console.log(`准备给 ${subscribers.length} 人发送邮件...`);
    
    // 为了防被封号，建议把所有人放在 Bcc (密送) 里，这样大家互看不到邮箱
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
