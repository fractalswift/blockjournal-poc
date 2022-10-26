import { Routes, Route } from 'react-router-dom';
import CreateNewOutput from './containers/CreateNewOutput';
import Home from './containers/Home';
import MyOutputs from './containers/MyOutputs';
import MyReviews from './containers/MyReviews';
import PublicOutputs from './containers/PublicOutputs';
import Sandbox from './containers/Sandbox';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/new-output" element={Login} />
      <Route path="/my-reviews" element={ForgotPassword} />
      */}

      <Route path="/sandbox" element={<Sandbox />} />

      <Route path="/new-output" element={<CreateNewOutput />} />

      <Route path="/my-outputs" element={<MyOutputs />} />

      <Route path="/my-reviews" element={<MyReviews />} />

      <Route path="/read-public-outputs" element={<PublicOutputs />} />

      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
