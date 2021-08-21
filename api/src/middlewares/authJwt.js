export const verifyToken = async (req, res, next) => {
    const token = req.headers["token"]
    console.log(token)
    next()
}