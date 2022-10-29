import { Routes, Route } from 'react-router-dom';
import CreateNewOutput from './containers/CreateNewOutput';
import Home from './containers/Home';
import MyOutputs from './containers/MyOutputs';
import MyReviews from './containers/MyReviews';
import PublicOutputs from './containers/PublicOutputs';
import Sandbox from './containers/Sandbox';

const AppRoutes = ({ isMetamaskConnected }: any) => {
  return (
    <Routes>
      {/* <Route path="/new-output" element={Login} />
      <Route path="/my-reviews" element={ForgotPassword} />
      */}

      <Route path="/sandbox" element={<Sandbox />} />

      <Route
        path="/new-output"
        element={isMetamaskConnected ? <CreateNewOutput /> : <Home />}
      />

      <Route
        path="/my-outputs"
        element={isMetamaskConnected ? <MyOutputs /> : <Home />}
      />

      <Route
        path="/my-reviews"
        element={isMetamaskConnected ? <MyReviews /> : <Home />}
      />

      <Route path="/read-public-outputs" element={<PublicOutputs />} />

      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
