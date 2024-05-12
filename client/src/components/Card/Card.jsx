import { Link } from "react-router-dom";

import styles from "./Card.module.css";

const Card = ({ id, origin, name, image, types }) => {
  return (
    <Link to={`/detail/${origin}/${id}`}>
      <div className={styles.container}>
        <img className={styles.image} src={image} alt={name} />
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.types}>
          {/* itera sobre los tipos del Pokémon y para cada tipo, crea un elemento
          span que muestra el nombre del tipo */}
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
