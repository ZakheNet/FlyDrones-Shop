import Header from "./Components/header";
import Home from "./Pages/Home";
import { Routes, Route, Router, Link, BrowserRouter } from "react-router";
import { RouterProvider } from "react-router";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/FlyDrones-Shop/" element={<Home/>}>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
