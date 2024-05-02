import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Board from "./Board";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { fetchHighscore, setUser } from "./redux/slices/userSlice";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Welcome from "./Welcome";
import Navbar from "./components/Navbar";
// import { fetchTodos } from './redux/Counter';
const PUBLISHABLE_KEY =
  "pk_test_bGl2aW5nLWRyYWdvbi0zNi5jbGVyay5hY2NvdW50cy5kZXYk";
const ClerkWithRoutes = () => {
  const [start,setStart] = useState(false)
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <div className="App">
        <Routes>
          {/* <Route path="/" element={} /> */}
          <Route
            path="/"
            element={
              <div className="start_page">
                <SignedIn>
                  <Board />
                </SignedIn>
                <SignedOut>
                  <Welcome />
                </SignedOut>
              </div>
            }
          />
          <Route
            path="/sign-in"
            element={
              <SignIn
                redirectUrl={"/"}
                routing="path"
                path="/sign-in"
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignUp
                redirectUrl={"/"}
                routing="path"
                path="/sign-up"
              />
            }
          />
        </Routes>
      </div>
    </ClerkProvider>
  );
};
function App() {
  // const [gameStart, setGameStart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    const userJson = JSON.parse(localStorageUser);
    if (userJson) {
      dispatch(setUser(userJson));
    }
  }, []);

  useEffect(() => {
    // dispatch(fetchHighscore());
  }, []);

  // const state = useSelector(state => state)
  const user = useSelector((state) => state.user.user);

  return <ClerkWithRoutes />;
}

export default App;
