import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/navbar";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AddAdministrator from "./pages/admin/AddAdminstrator";
import AddInstructor from "./pages/admin/AddInstructor";
import AddCorporate from "./pages/admin/AddCorporate";
import CreateExam from "./pages/instructor/CreateExam";
import SolveExam from "./pages/Exam";
import ForgetPw from "./pages/ForgetPw";
import ChangePasswordForm from "./pages/instructor/ChangePassword";
import EditBio from "./pages/instructor/editBio";
import Contract from "./pages/contract";
import CreateCourse from "./pages/instructor/CreateCourses";
import GetCourses from "./pages/GetCourses";
import Admin from "./pages/admin//Admin";
import Instructor from "./pages/instructor/instructor";
import Filtersubject from "./pages/instructor/filtersubject"
import Filterprice from "./pages/instructor/filterprice"
import Mycourses from "./pages/instructor/mycourse";
import Course from "./pages/instructor/course";
import CourseRequests from "./pages/admin//courseRequests";
import ReportedProblems from "./pages/admin/reportedProblems";
import InstructorRating from "./pages/instructor/InstructorRating";
import ViewCourse from "./pages/instructor/viewcourse";
import Sorted from "./pages/instructor/Sorted";
import Trainee from "./pages/trainee/Trainee";
import FilterMCoursePrice from "./pages/instructor/FilterMCoursePrice";
import FilterMCourseSubject from "./pages/instructor/FilterMCourseSubject";
import ViewTrainee from "./pages/trainee/viewTrainee"
import ChangePasswordTrainee from "./pages/trainee/ChangePassword"
import RateInstructorTrainee from "./pages/trainee/RateInstructor";
import RateCourseTrainee from "./pages/trainee/RateCourse"
import CourseTrainee from "./pages/trainee/course";
import MycoursesTrainee from "./pages/trainee/mycourse";
import Subtitle from "./pages/trainee/subtitle";
import Excercise from "./pages/trainee/Excercise";
import PreviouseProblems from "./pages/trainee/previouseProblems";
import ReportProblem from "./pages/trainee/Report"
import Corporate from "./pages/corprate/corprate";
import ViewCourporate from "./pages/corprate/viewCorporate";
import ChangePasswordCorp from "./pages/corprate/ChangePassword"
import CourseCorp from "./pages/corprate/course"
import ExcerciseCorp from "./pages/corprate/Excercise";
import FilterMCoursePricecorp from "./pages/corprate/FilterMCoursePrice";
import FilterMCourseSubjectcorp from "./pages/corprate/FilterMCourseSubject";
import MycoursesCorp from "./pages/corprate/mycourse"
import PreviouseProblemscorp from "./pages/corprate/previouseProblems";
import RateCourseCorp from "./pages/corprate/RateCourse"
import RateInstructorCorp from "./pages/corprate/RateInstructor";
import ReportCorp from "./pages/corprate/Report";
import SubtitleCorp from "./pages/corprate/subtitle";
import Forgetpassword from "./pages/Forgetpassword";
import ChangeForgotCorp from "./pages/corprate/changeforgot"
import ChangeForgotInst from "./pages/instructor/changeforgot"
import ChangeForgotInd from "./pages/trainee/changeforgot"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createExam" element={<CreateExam />} />
            <Route path="/editbio" element={<EditBio />} />
            <Route path="/changePw" element={<ChangePasswordForm />} />
            <Route path="/forgetpw" element={<ForgetPw />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/addadministrator" element={<AddAdministrator />} />
            <Route path="/addinstructor" element={<AddInstructor />} />
            <Route path="/addcorporate" element={<AddCorporate />} />
            <Route path="/solveExam" element={<SolveExam />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/createcourse" element={<CreateCourse />} />
            <Route path="/getcourses" element={<GetCourses />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/instructor" element={<Instructor />} />
            <Route path="/filterprice" element={<Filterprice />} />
            <Route path="/filtersubject" element={<Filtersubject />} />
            <Route path="/mycourses" element={<Mycourses />} />
            <Route path="/course" element={<Course />} />
            <Route path="/courseRequests" element={<CourseRequests />} />
            <Route path="/problems" element={<ReportedProblems />} />
            <Route path="/myRating" element={<InstructorRating />} />
            <Route path="/viewcourse" element={<ViewCourse />} />
            <Route path="/sorted" element={<Sorted />} />
            <Route path="/trainee" element={<Trainee />} />
            <Route path="/filterpriceMinstructor" element={<FilterMCoursePrice />} />
            <Route path="/filtersubjectminstructor" element={<FilterMCourseSubject />} />
            <Route path="/viewtrainee" element={<ViewTrainee />} />
            <Route path="/trainee/changePassword" element={<ChangePasswordTrainee />} />
            <Route path="/trainee/rateinstructor" element={<RateInstructorTrainee />} />
            <Route path="/trainee/rateCourse" element={<RateCourseTrainee />} />
            <Route path="/trainee/Course" element={<CourseTrainee />} />
            <Route path="/trainee/mycourses" element={<MycoursesTrainee />} />
            <Route path="/trainee/subtitle" element={<Subtitle />} />
            <Route path="/trainee/excersice" element={<Excercise />} />
            <Route path="/trainee/previousproblems" element={<PreviouseProblems />} />
            <Route path="/trainee/reportproblem" element={<ReportProblem />} />
            <Route path="/corprate" element={<Corporate />} />
            <Route path="/corprate/viewCorprate" element={<ViewCourporate />} />
            <Route path="/corprate/changePassword" element={<ChangePasswordCorp />} />
            <Route path="/corprate/course" element={<CourseCorp />} />
            <Route path="/corprate/excercise" element={<ExcerciseCorp />} />
            <Route path="/corprate/filterprice" element={<FilterMCoursePricecorp />} />
            <Route path="/corprate/filtersubject" element={<FilterMCourseSubjectcorp />} />
            <Route path="/corprate/mycourses" element={<MycoursesCorp />} />
            <Route path="/corprate/previouseproblems" element={<PreviouseProblemscorp />} />
            <Route path="/corprate/ratecourse" element={<RateCourseCorp />} />
            <Route path="/corprate/report" element={<ReportCorp />} />
            <Route path="/corprate/subtitle" element={<SubtitleCorp />} />
            <Route path="/corprate/rateinstructor" element={<RateInstructorCorp />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/corporate/changeforgot" element={<ChangeForgotCorp />} />
            <Route path="/instructor/changeforgot" element={<ChangeForgotInst />} />
            <Route path="/individualetrainee/changeforgot" element={<ChangeForgotInd />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
