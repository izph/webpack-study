import tpl from './info.tpl';

const root = document.getElementById('root');

const info = tpl({
    name: 'izph',
    age: '22',
    career: '前端开发',
    workingYears: 1
})

root.innerHTML = info;