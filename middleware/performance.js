module.exports = (req, res, next) => {
    // gviv
    let start = Date.now();

    res.once('finish', () => {
        console.log('hey de request is klaar');
        let end = Date.now();
        console.log(`request duurde ${end-start}ms`);
    });

    next();
};