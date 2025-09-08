import logo from "./logo.svg";
import "./App.css";
import GuestLayout from "./components/GuestLAyout/GuestLayout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/GuestLAyout/Login";
import Register from "./components/GuestLAyout/Register";
import UserLayout from "./components/UserLayout/UserLayout";
import Profile from "./components/UserLayout/Profile";
import ChangePassword from "./components/UserLayout/ChangePassword";
import ForgotPassword from "./components/UserLayout/ForgotPassword";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import ManageExam from "./components/AdminLayout/ManageExam";
import Home from "./components/GuestLAyout/Home";
import AttendExam from "./components/UserLayout/AttendExam";
import ExamHistory from "./components/UserLayout/ExamHistory";
import AdminExamAttempts from "./components/AdminLayout/AdminExamAttempts";
import MyNotes from "./components/UserLayout/MyNotes";
import Chapter4 from "./components/UserLayout/Chapter4";
import Chapter5 from "./components/UserLayout/Chapter5";
import Chapter3 from "./components/UserLayout/Chapter3";
import Chapter6 from "./components/UserLayout/Chapter6";
import Notes from "./components/UserLayout/Notes";
import AdminNotesControl from "./components/AdminLayout/AdminNotesControl";
import ServerSetup from "./components/UserLayout/ServerSetup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<AttendExam />} />
          <Route path="/user/notes" element={<Notes/>}/>
          <Route path="/user/clientsetup" element={<MyNotes/>}/>
          <Route path="/user/BootstrapinReact" element={<Chapter4/>}/>
          <Route path="/user/CommonLayouts" element={<Chapter5/>}/>
          <Route path="/user/LandingPages" element={<Chapter6/>}/>
          <Route path="/user/IntroductiontoMERNStack" element={<Chapter3/>}/>
          <Route path="/user/ServerSetup" element={<ServerSetup/>}/>
          <Route path="history" element={<ExamHistory/>}/>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/changepassword" element={<ChangePassword />} />
          
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<ManageExam />} />
          <Route path="/admin/exam" element={<ManageExam />} />
          <Route path="/admin/notescontroll" element={<AdminNotesControl />} />
          <Route path="/admin/history" element={<AdminExamAttempts/>} />
          <Route path="/admin/changepassword" element={<ChangePassword />} />
        </Route>

      
      </Routes>
    </div>
  );
}

export default App;
