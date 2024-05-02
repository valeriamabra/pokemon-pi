import { Link } from "react-router-dom"; // Importar Link de react-router-dom si estás utilizando React Router

import styles from "./Card.module.css";

const Card = ({ id, name, image, types }) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.container}>
        <img className={styles.image} src={image} alt={name} />
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.types}>
          {types.map((type, index) => (
            <span key={index} className={styles.type}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;

// import styles from "./Card.module.css";

// const Card = () => {
//   return (
//     <div className={styles.container} key={props.id}>
//       <img
//         className={styles.imagen}
//         src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/151.png"
//       />

//       <h2>NOMBRE</h2>
//       <h3 className={styles.cardName}> nombre pokemon</h3>

//       <h2>TIPO</h2>
//       <h3>agua fuego tierra</h3>
//     </div>
//   );
// };

// export default Card;
