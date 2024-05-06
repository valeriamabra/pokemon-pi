import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Trabajo individual de Valeria Mabragaña</h1>
        <h1>Henry</h1>
        <h2>Stack de tecnologias</h2>
        <h3>FRONT-END</h3>
        <p className={styles.tech}>React</p>
        <p className={styles.tech}>Redux</p>
        <p className={styles.tech}>React Router Dom</p>

        <h3>BACKEND</h3>
        <p className={styles.tech}>Express </p>
        <p className={styles.tech}>Postgresql</p>
        <p className={styles.tech}>Sequelize</p>
      </div>
    </>
  );
};

export default Home;
