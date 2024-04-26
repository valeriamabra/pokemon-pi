import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
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
              <li>
                <Link to="/form">Form</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/form">
              <Form />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
