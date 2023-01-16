import { Route, Routes, Outlet} from "react-router-dom";
import "./App.css";
import ItemList from "./pages/ItemList"
import Home from "./pages/Home";

function App() {
  return (
    <>
    <header
    className='sticky top-0 bg-primary px-6 py-8 lg:py-8 lg:px-48 shadow-lg z-auto'
>
    <h1 className='text-2xl font-bold text-white'
        data-cy="header-title" >
        TO DO LIST APP
    </h1 >
</header >
<main className='flex flex-col gap px-6 py-11 lg:px-48'>
    <Outlet />
</main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="detail/:id" element={<ItemList />} />
    </Routes>
    </>
  );
}

export default App;
