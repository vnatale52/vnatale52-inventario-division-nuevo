import jwt from "jsonwebtoken";
//  import bcrypt from "bcrypt";  // no funciona
import bcrypt from "bcryptjs";


import { query } from "../database.mjs";

const SALT_ROUNDS = 10;

export async function login(req, res) {
  const { username, password } = req.body;
  const result = await query("SELECT * FROM usuarios WHERE username=$1",[username]);
  if (!result.rows.length) return res.status(401).json({error:"Usuario incorrecto"});
  const user = result.rows[0];
  const isHash = user.password.startsWith("$2");
  const ok = isHash ? await bcrypt.compare(password,user.password) : user.password===password;
  if(!ok) return res.status(401).json({error:"Contraseña incorrecta"});
  const token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn:"12h"});
  res.json({token});
}
export async function register(req,res){
  const {username,password}=req.body;
  const hashed=await bcrypt.hash(password,SALT_ROUNDS);
  const r=await query("INSERT INTO usuarios(username,password) VALUES($1,$2) RETURNING id,username",[username,hashed]);
  res.json(r.rows[0]);
}
