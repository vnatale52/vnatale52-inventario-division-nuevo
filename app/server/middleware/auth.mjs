import jwt from "jsonwebtoken";
export function authMiddleware(req,res,next){
  const h=req.headers.authorization;
  if(!h) return res.status(401).json({error:"Falta token"});
  try{
    req.user=jwt.verify(h.replace("Bearer ",""),process.env.JWT_SECRET);
    next();
  }catch(e){res.status(401).json({error:"Token inválido"});}
}
