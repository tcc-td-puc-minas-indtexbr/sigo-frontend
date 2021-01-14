module.exports = (req, res, next) =>  {
    res.header('Content-Range', 'standard 0-20/20')
    next()
}