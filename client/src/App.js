import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import styles from "./App.module.css";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div>
      <h1 className={styles.title}>Henry Pokemon</h1>
      <Router>
        <div>
          <nav>
            <ul className={styles.navUl}>
              <li className={styles.navLi}>
                <Link className={styles.navLink} to="/home">
                  Pokemons
                </Link>
              </li>
              <li className={styles.navLi}>
                <Link className={styles.navLink} to="/form">
                  Crear
                </Link>
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
            <Route path="/detail/:origin/:id">
              <Detail />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
