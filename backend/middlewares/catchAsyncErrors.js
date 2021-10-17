module.exports = func => (req, res, next) => {
    // promise that returns the error in this case
    Promise.resolve(func(req, res, next))
        .catch(next)
}