const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())

const SECRET = "cinevault_secret"

// MongoDB
mongoose.connect("mongodb+srv://luvpandey903_db_user:slmvzJDxNz5XkQcN@cluster0.bu5kbet.mongodb.net/cinevault")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  displayName: String,
  wishlist: [
    {
      imdbID: String,
      Title: String,
      Year: String,
      Poster: String,
      rating: Number,
      note: String
    }
  ]
})

const User = mongoose.model("User", userSchema)


// 🔐 AUTH MIDDLEWARE (IMPROVED)
const auth = (req,res,next)=>{
  const header = req.headers.authorization

  if(!header){
    return res.status(401).json({msg:"No token"})
  }

  // Support "Bearer token"
  const token = header.startsWith("Bearer ")
    ? header.split(" ")[1]
    : header

  try{
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  }catch{
    return res.status(401).json({msg:"Invalid token"})
  }
}

app.post("/signup", async (req,res)=>{
  try{

    console.log("BODY RECEIVED:", req.body)

    let {username,password,displayName} = req.body || {}

    if(!username || !password || !displayName){
      console.log("❌ Missing fields")
      return res.status(400).json({msg:"Missing fields"})
    }

    username = username.trim()

    console.log("Checking user...")

    const exists = await User.findOne({username})

    if(exists){
      console.log("❌ User already exists")
      return res.json({msg:"User exists"})
    }

    console.log("Hashing password...")

    const hashedPassword = await bcrypt.hash(String(password), 10)

    console.log("Creating user...")

    const user = new User({
      username,
      password: hashedPassword,
      displayName,
      wishlist:[]
    })

    await user.save()

    console.log("✅ User saved successfully")

    res.json({msg:"User created"})

  }catch(err){

    console.log("🔥🔥 FULL SIGNUP ERROR:", err)

    res.status(500).json({
      msg:"Error",
      error: err.message
    })
  }
})



// ✅ LOGIN
app.post("/login", async (req,res)=>{
  try{
    const {username,password} = req.body

    const user = await User.findOne({username})
    if(!user) return res.json({msg:"User not found"})

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.json({msg:"Wrong password"})

    const token = jwt.sign(
      {username:user.username},
      SECRET,
      {expiresIn:"1d"}
    )

    res.json({
      msg:"Login success",
      token,
      user
    })

  }catch(err){
    console.log("Login error:", err)
    res.status(500).json({msg:"Error"})
  }
})


// ✅ ADD
app.post("/wishlist/add", auth, async (req,res)=>{
  try{
    const {username, movie} = req.body

    const user = await User.findOne({username})
    if(!user) return res.json({msg:"User not found"})

    const exists = user.wishlist.find(m=>m.imdbID===movie.imdbID)
    if(exists) return res.json({msg:"Already added"})

    user.wishlist.push({
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      rating: 0,
      note: ""
    })

    await user.save()

    res.json({msg:"Added"})

  }catch(err){
    console.log(err)
    res.status(500).json({msg:"Error"})
  }
})


// ✅ GET
app.get("/wishlist/:username", auth, async (req,res)=>{
  try{
    const user = await User.findOne({username:req.params.username})
    if(!user) return res.json([])

    res.json(user.wishlist)

  }catch(err){
    console.log(err)
    res.status(500).json([])
  }
})


// ✅ REMOVE
app.post("/wishlist/remove", auth, async (req,res)=>{
  try{
    const {username,id} = req.body

    const user = await User.findOne({username})
    if(!user) return res.json({msg:"User not found"})

    user.wishlist = user.wishlist.filter(
      m => m.imdbID !== id
    )

    await user.save()

    res.json({msg:"Removed"})

  }catch(err){
    console.log(err)
    res.status(500).json({msg:"Error"})
  }
})


// ✅ UPDATE
app.post("/wishlist/update", auth, async (req,res)=>{
  try{
    const {username,id,rating,note} = req.body

    const user = await User.findOne({username})
    if(!user) return res.json({msg:"User not found"})

    const movie = user.wishlist.find(m=>m.imdbID===id)

    if(movie){
      movie.rating = rating
      movie.note = note
    }

    await user.save()

    res.json({msg:"Updated"})

  }catch(err){
    console.log(err)
    res.status(500).json({msg:"Error"})
  }
})


// 🚀 SERVER
app.listen(5000,()=>{
  console.log("Server running on port 5000")
})