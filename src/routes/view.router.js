import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/chat",(req,res)=>{
  res.render("chat");
})

router.get("/index",(req,res)=>{
  res.render("index");
})

export default router;
