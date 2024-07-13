// App.jsx


import { BrowserRouter,Routes,Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AdminLogin from "./Pages/AdminLogin";
import FindTrain from "./Pages/FindTrain";
import Reservation from "./Pages/Reservation";
import ContactSection from "./Components/ContactSection";
import BookingForm from "./Pages/BookingForm";


import AddTrain from "./Pages/Admin/AddTrain";
import AddRoute from "./Pages/Admin/AddRoute";
import UserApp from "./Pages/UserApp";
import AdminD from "./Pages/AdminD";
import TrainTable from "./Pages/TrainTable";
import Bill from "./Pages/Bill";

const App = () => {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/admin" element={<AdminLogin/>}/>
  <Route path="/findtrain" element={<FindTrain/>}/>
  <Route path="/reservation" element={<Reservation/>}/>
  <Route path="/contact" element={<ContactSection/>}/>
  <Route path="/login" element={<AdminLogin/>}/>
  <Route path="/booking" element={<BookingForm/>}/> 
  <Route path="/admin-dashboard"  element={<AdminD/>}/>
  <Route path="/user" element={<UserApp/>}/>
  <Route path="/adminlogin" element={<AdminLogin/>}/>
  <Route path="/addtrain" element={<AddTrain/>}/>
  <Route path="/addroute" element={<AddRoute/>}/>
  <Route path="/viewtrains" element={<TrainTable/>}/>
  <Route path="/bill" element={<Bill/>}/>
</Routes>
</BrowserRouter>
  );
}

export default App;
