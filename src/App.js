import { AnimatePresence } from "framer-motion";
import { Header } from "./components";
import {
  Home,
  OrderHome,
  Logger,
  SignUp,
  SignIn,
  ProtectedRoute,
} from "./components";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen scrollbar-hide h-auto flex flex-col relative">
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute Children={<Home />} />} />
          <Route path="/order" element={<OrderHome />} />
          <Route path="/log" element={<Logger />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
