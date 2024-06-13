

const logger = function (req, res, next){
    console.log('Post Request');
    next();
}

module.exports=logger;