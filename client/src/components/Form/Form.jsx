import styles from "./Form.module.css";
import { useState } from "react";
import { savePokemon } from "../../redux/actions/action";
import { useDispatch } from "react-redux";

const Form = () => {
  const dispatch = useDispatch();
  //states
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  //handlers
  const onNameChange = (evento) => {
    setName(evento.target.value);
  };
  const onImageChange = (evento) => {
    setImage(evento.target.value);
  };
  const onHpChange = (evento) => {
    setHp(evento.target.value);
  };
  const onAttackChange = (evento) => {
    setAttack(evento.target.value);
  };
  const onDefenseChange = (evento) => {
    setDefense(evento.target.value);
  };
  const onSpeedChange = (evento) => {
    setSpeed(evento.target.value);
  };
  const onHeightChange = (evento) => {
    setHeight(evento.target.value);
  };
  const onWeightChange = (evento) => {
    setWeight(evento.target.value);
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();
    if (
      !name ||
      !image ||
      !hp ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weight
    )
      alert("algunos datos estan incompletos");

    dispatch(
      savePokemon({ name, image, hp, attack, defense, speed, height, weight })
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="">Nombre</label>
          <input
            onChange={onNameChange}
            name="name"
            placeholder="Ingrese el nombre"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Imagen</label>
          <input
            onChange={onImageChange}
            name="image"
            placeholder="Ingrese la url de la imagen"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Vida</label>
          <input
            onChange={onHpChange}
            type="number"
            name="hp"
            placeholder="Ingrese sus vidas"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Ataque</label>
          <input
            onChange={onAttackChange}
            type="number"
            name="attack"
            placeholder="Ingrese su ataque"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Defensa</label>
          <input
            onChange={onDefenseChange}
            type="number"
            name="defense"
            placeholder="Ingrese su defensa"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Velocidad</label>
          <input
            onChange={onSpeedChange}
            type="number"
            name="speed"
            placeholder="Ingrese la velocidad"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Altura</label>
          <input
            onChange={onHeightChange}
            type="number"
            name="height"
            placeholder="Ingrese la altura"
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="">Peso</label>
          <input
            onChange={onWeightChange}
            type="number"
            name="weight"
            placeholder="Ingrese el peso"
          />
        </div>

        <button type="submit">Crear pokemon</button>
      </form>
    </div>
  );
};

export default Form;