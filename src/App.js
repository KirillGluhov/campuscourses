import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from "./components/MainPage/MainPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import AuthorizationPage from "./components/AuthorizationPage/AuthorizationPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import GroupCampusPage from "./components/GroupsCampusPage/GroupsCampusPage";
import MyCoursesPage from "./components/MyCoursesPage/MyCoursesPage";
import TeachingCoursesPage from "./components/TeachingCoursesPage/TeachingCoursesPage";
import GroupIdPage from "./components/GroupIdPage/GroupIdPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";

function App()
{
  return (
      <Routes>
        <Route path='*' element={<Navigate to="/login" />}/>
        <Route path="/" element={<MainPage/>} />

        <Route path='/profile/' element={<ProfilePage/>}/>
        <Route path='/groups/' element={<GroupCampusPage/>}/>
        <Route path='/groups/:id' element={<GroupIdPage/>}/>
        <Route path='/courses/:id' element={<DetailsPage/>}/>

        <Route path='/courses/my/' element={<MyCoursesPage/>}/>
        <Route path='/courses/teaching/' element={<TeachingCoursesPage/>}/>

        <Route path='/registration/' element={<RegistrationPage/>}/>
        <Route path='/login/' element={<AuthorizationPage/>}/>
      </Routes>
  );
}

export default App;
