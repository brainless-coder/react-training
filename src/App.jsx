import { useEffect, useState } from "react";
import Login from "./views/Login";
import Projects from "./views/Projects";

function App() {
  // ye jo hai showLoginPage ke saath hook kar liya hai
  // yhape apne ko ek var, aur ek setter fn milta hai uss var ke liye
  const [showLoginPage, setShowLoginPage] = useState(true);
  // let title = showLoginPage && "Login";

  const togglePage = () => setShowLoginPage(!showLoginPage);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) setShowLoginPage(false);
  }, []);

  const onLoginSuccess = () => {
    setShowLoginPage(false);
    localStorage.setItem("isLoggedIn", true);
  };

  return (
    <>
      <button onClick={() => togglePage()}>Toggle Page</button>
      {showLoginPage ? <Login onLoginSuccess={onLoginSuccess} /> : <Projects />}
    </>
  );
}

export default App;
