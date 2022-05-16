function tplReplace(template, data) {

    return template.replace(/\{(.+?)\}/g, (match, key) => {
        // { name } name
        return data[key];
    });
}

module.exports = {
    tplReplace
};