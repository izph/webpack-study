/**
 * 验证Spritesmith合并雪碧图是否正常，验证成功
 */

// Load in dependencies
var Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');


// Generate our spritesheet
var sprites = [
    './loaders/images/yolo-1.png',
    './loaders/images/yolo-2.png',
    './loaders/images/yolo-3.png',
    './loaders/images/yolo-4.png'
];

Spritesmith.run({ src: sprites }, (err, result) => {
    // 合成后的图片，是一个buffer
    console.log(result.image); // Buffer representation of image  
    // 合成前的信息
    console.log(result.coordinates); // Object mapping filename to {x, y, width, height} of image
    // 合成后的宽高
    console.log(result.properties); // Object with metadata about spritesheet {width, height}

    fs.writeFileSync(path.join(__dirname, 'dist/sprite.png'), result.image);
});