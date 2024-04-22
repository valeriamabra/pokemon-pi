import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1 className={styles.title}>Henry Pokemon</h1>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
