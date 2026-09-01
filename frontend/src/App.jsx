import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AlertDetails from "./pages/AlertDetails";
function App() {
  return (
    <div className="flex min-h-screen bg-[#080a0d]">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex-1 p-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alert/:id" element={<AlertDetails />} />
          </Routes>
        </div>

      </div>

    </div>
  );
}

export default App;