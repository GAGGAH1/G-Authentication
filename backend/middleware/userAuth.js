import jwt from "jsonwebtoken"

const userAuth = async (req, res, next ) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.id) {
            // req.body.userId = decoded.id;
            req.user = { id: decoded.id };
           return next();
        } else {
            
            return res.status(401).json({ message: "Invalid token" });
        }

        
    } catch (error) {
        console.error("JWT verification error:", error);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}

export default userAuth;