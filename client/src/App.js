import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Pokemons from "./components/Pokemons/Pokemons";
import Form from "./components/Form/Form";
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";

import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1 className={styles.title}>Henry Pokemon</h1>
      <Router>
        <div>
          <nav>
            <ul className={styles.navUl}>
              <li className={styles.navLi}>
                <Link className={styles.navLink} to="/">
                  Home
                </Link>
              </li>
              <li className={styles.navLi}>
                <Link className={styles.navLink} to="/pokemons">
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
            <Route path="/pokemons">
              <Pokemons />
            </Route>
            <Route path="/form">
              <Form />
            </Route>
            <Route path="/detail/:origin/:id">
              <Detail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
