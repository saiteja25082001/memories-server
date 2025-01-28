import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET || 'test'); // Use environment variable for the secret
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; // `sub` is the unique identifier for OAuth tokens
    }

    next();
  } catch (error) {
    console.error('Error in auth middleware:', error.message);
    res.status(403).json({ message: 'Unauthorized access' });
  }
};
