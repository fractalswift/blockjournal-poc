import { Routes, Route } from 'react-router-dom';
import Home from './containers/Home';
import MyOutputs from './containers/MyOutputs';
import PublicOutputs from './containers/PublicOutputs';

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/new-output" element={Login} />
      <Route path="/my-reviews" element={ForgotPassword} />
      */}
      <Route path="/my-outputs" element={<MyOutputs />} />

      <Route path="/read-public-outputs" element={<PublicOutputs />} />

      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
