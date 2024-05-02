import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { savePokemon, fetchTypes } from "../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "multiselect-react-dropdown";
import { useHistory } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  let history = useHistory();

  //states
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [type, setType] = useState([]);

  useEffect(() => {
    dispatch(fetchTypes());
  }, []);

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
    if (!name || !image || !hp || !attack || !defense || type.length < 2) {
      alert("algunos datos estan incompletos");
      return;
    }

    dispatch(
      savePokemon({
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types: type.map((t) => t.name),
      })
    );

    alert("El pokemon se ha guardado correctamente");

    history.push("/home");
  };
  console.log(types);
  const onTypeChange = (list, item) => {
    setType(list);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Nombre
          </label>
          <input
            onChange={onNameChange}
            name="name"
            placeholder="Ingrese el nombre"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Imagen
          </label>
          <input
            onChange={onImageChange}
            name="image"
            placeholder="Ingrese la url de la imagen"
          />
        </div>
        <div className={styles.multiselectContainer}>
          <label className={styles.label} htmlFor="">
            Tipo
          </label>
          <div className={styles.multiselect}>
            <Multiselect
              onSelect={onTypeChange}
              options={types}
              displayValue="name"
              className={styles.multiselect}
            ></Multiselect>
          </div>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Vida
          </label>
          <input
            onChange={onHpChange}
            type="number"
            name="hp"
            placeholder="Ingrese sus vidas"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Ataque
          </label>
          <input
            onChange={onAttackChange}
            type="number"
            name="attack"
            placeholder="Ingrese su ataque"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Defensa
          </label>
          <input
            onChange={onDefenseChange}
            type="number"
            name="defense"
            placeholder="Ingrese su defensa"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Velocidad
          </label>
          <input
            onChange={onSpeedChange}
            type="number"
            name="speed"
            placeholder="Ingrese la velocidad"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Altura
          </label>
          <input
            onChange={onHeightChange}
            type="number"
            name="height"
            placeholder="Ingrese la altura"
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="">
            Peso
          </label>
          <input
            onChange={onWeightChange}
            type="number"
            name="weight"
            placeholder="Ingrese el peso"
          />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">
            Crear pokemon
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
