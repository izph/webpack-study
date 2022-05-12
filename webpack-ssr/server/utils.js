const fs = require('fs');
const path = require('path');
const HTML_PLACEHOLDER = '<!--HTML_PLACEHOLDER-->';
const INITIAL_DATA_PLACEHOLDER = '<!--INITIAL_DATA_PLACEHOLDER-->';

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8');

function renderMarkup(str, data) {
    const dataStr = JSON.stringify(data);
    return template.replace(/\<\!\-\-HTML_PLACEHOLDER\-\-\>/g, str)
        .replace(/\<\!\-\-INITIAL_DATA_PLACEHOLDER\-\-\>/g, `<script>window.__initial_data=${dataStr}</script>`);
}

module.exports = renderMarkup;