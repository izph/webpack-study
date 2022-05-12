
const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

// 合同需要有__sprite的后缀

module.exports = function (source) {
    // 合并图片是 一个异步场景，需要this.async(error对象，处理结果);
    const callback = this.async();
    // ['url(./images/yolo-1.png?__sprite', 'url(./images/yolo-2.png?__sprite', ...]
    const imgs = source.match(/url\((\S*)\?__sprite/g);
    // console.log(imgs)
    const matchedImgs = [];

    // 把图片的路径提取出来，放到matchedImgs
    for (let i = 0; i < imgs.length; i++) {
        // ./images/yolo-i.png
        const img = imgs[i].match(/url\((\S*)\?__sprite/)[1];
        // console.log(img)
        matchedImgs.push(path.join(__dirname, img));
    }
    // matchedImgs作为参数传递给 Spritesmith，调用run方法
    Spritesmith.run({ src: matchedImgs }, (err, result) => {
        // 将资源输出的dist目录下，正常来说是调用loader的emit方法将文件生成出来，但是loader-runner是没有的
        fs.writeFileSync(path.join(process.cwd(), 'dist/sprite.png'), result.image);
        // 把样式替换成雪碧图图片
        source = source.replace(/url\((\S*)\?__sprite/g, (match) => {
            return `url("dist/sprite.png"`;
        })
        fs.writeFileSync(path.join(process.cwd(), 'dist/index.css'), source);
        // 将source返回
        callback(null, source); // err, source
    });

}