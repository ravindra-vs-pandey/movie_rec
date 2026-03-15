import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Wishlist from "./pages/Wishlist"
import MovieDetails from "./pages/MovieDetails"
import "./App.css"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/home" element={<Home/>}/>
<Route path="/wishlist" element={<Wishlist/>}/>
<Route path="/movie/:id" element={<MovieDetails/>}/>

</Routes>

</BrowserRouter>

)

}

export default App