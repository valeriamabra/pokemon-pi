import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import { savePokemon, fetchTypes } from "../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);

  let history = useHistory();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");

  const [hp, setHp] = useState("");
  const [hpError, setHpError] = useState("");

  const [attack, setAttack] = useState("");
  const [attackError, setAttackError] = useState("");

  const [defense, setDefense] = useState("");
  const [defenseError, setDefenseError] = useState("");

  const [speed, setSpeed] = useState("");
  const [speedError, setSpeedError] = useState("");

  const [height, setHeight] = useState("");
  const [heightError, setHeightError] = useState("");

  const [weight, setWeight] = useState("");
  const [weightError, setWeightError] = useState("");

  const [checkedTypes, setCheckedTypes] = useState({});
  const [checkedTypesError, setCheckedTypesError] = useState("");

  useEffect(() => {
    dispatch(fetchTypes());
  }, []);

  const onNameChange = (evento) => {
    const newName = evento.target.value;
    let error = ""; //esta vacio xq asumimos q no hay error

    if (newName.length > 0) {
      if (newName.length < 5 || newName.length > 20) {
        error = "El nombre debe tener entre 5 y 20 caracteres";
      }

      if (newName.match(/\d+/g)) {
        error = "El nombre no debe contener numeros";
      }

      if (newName.match(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
        error = "El nombre no debe contener símbolos";
      }
    }
    setNameError(error); //guarda el error q tiene el nombre
    setName(newName);
  };

  const onImageChange = (evento) => {
    const newImage = evento.target.value;
    let error = "";
    if (newImage.length > 0) {
      if (!newImage.match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
        error = "Debe ser una url a un png o jpg";
      }
    }

    setImageError(error);
    setImage(newImage);
  };

  const onHpChange = (evento) => {
    const newHp = evento.target.value;
    let error = "";

    if (newHp < 0) {
      error = "Las vidas no pueden ser negativas";
    }

    setHpError(error);
    setHp(newHp);
  };

  const onAttackChange = (evento) => {
    const newAttack = evento.target.value;
    let error = "";

    if (newAttack < 0) {
      error = "Los ataques no pueden ser negativos";
    }

    setAttackError(error);
    setAttack(newAttack);
  };

  const onDefenseChange = (evento) => {
    const newDefense = evento.target.value;
    let error = "";

    if (newDefense < 0) {
      error = "Las defensas no pueden ser negativas";
    }

    setDefenseError(error);
    setDefense(newDefense);
  };

  const onSpeedChange = (evento) => {
    const newSpeed = evento.target.value;
    let error = "";

    if (newSpeed < 0) {
      error = "La velocidad no puede ser negativa";
    }

    setSpeedError(error);
    setSpeed(newSpeed);
  };

  const onHeightChange = (evento) => {
    const newHeight = evento.target.value;
    let error = "";

    if (newHeight < 0) {
      error = "La altura no puede ser negativa";
    }

    setHeightError(error);
    setHeight(newHeight);
  };

  const onWeightChange = (evento) => {
    const newWeight = evento.target.value;
    let error = "";

    if (newWeight < 0) {
      error = "El peso no puede ser negativo";
    }

    setWeightError(error);
    setWeight(newWeight);
  };

  const onCheckTypeChange = (event) => {
    setCheckedTypes({
      ...checkedTypes,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    const checkeds = Object.entries(checkedTypes).filter(
      (item) => item[1]
    ).length;
    if (checkeds !== 0 && (checkeds > 2 || checkeds < 1)) {
      setCheckedTypesError("El pokemon debe tener 1 o 2 types");
    } else {
      setCheckedTypesError("");
    }
  }, [checkedTypes]);

  const handleSubmit = (evento) => {
    evento.preventDefault();

    let error = false;

    if (
      nameError ||
      imageError ||
      hpError ||
      attackError ||
      defenseError ||
      weightError ||
      heightError ||
      speedError ||
      checkedTypesError
    ) {
      error = true;
    }

    if (!name) {
      error = true;
      setNameError("El nombre es obligatorio");
    }
    if (!image) {
      error = true;
      setImageError("La imagen es obligatoria");
    }
    if (!hp) {
      error = true;
      setHpError("Las vidas son obligatorias");
    }
    if (!attack) {
      error = true;
      setAttackError("Los ataques son obligatorios");
    }
    if (!defense) {
      error = true;
      setDefenseError("Las defensas son obligatorias");
    }

    const checkeds = Object.entries(checkedTypes).filter(
      (item) => item[1]
    ).length;
    if (checkeds === 0) {
      error = true;
      setCheckedTypesError("Debe elegir al menos un tipo");
    }

    if (error) {
      return;
    }

    const typesToSend = [];
    for (const [typeName, checked] of Object.entries(checkedTypes)) {
      if (checked) typesToSend.push(typeName);
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
        types: typesToSend,
      })
    );

    alert("El pokemon se ha guardado correctamente");

    history.push("/pokemons");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Nombre
            </label>
            <input
              onChange={onNameChange}
              name="name"
              placeholder="Ingrese el nombre"
              className={styles.input}
            />
          </div>
          {nameError && <p className={styles.inputError}>{nameError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Imagen
            </label>
            <input
              onChange={onImageChange}
              name="image"
              placeholder="Ingrese la url de la imagen"
              className={styles.input}
            />
          </div>
          {imageError && <p className={styles.inputError}>{imageError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Vida
            </label>
            <input
              onChange={onHpChange}
              type="number"
              name="hp"
              placeholder="Ingrese sus vidas"
              className={styles.input}
            />
          </div>
          {hpError && <p className={styles.inputError}>{hpError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Ataque
            </label>
            <input
              onChange={onAttackChange}
              type="number"
              name="attack"
              placeholder="Ingrese su ataque"
              className={styles.input}
            />
          </div>
          {attackError && <p className={styles.inputError}>{attackError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Defensa
            </label>
            <input
              onChange={onDefenseChange}
              type="number"
              name="defense"
              placeholder="Ingrese su defensa"
              className={styles.input}
            />
          </div>
          {defenseError && <p className={styles.inputError}>{defenseError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Velocidad
            </label>
            <input
              onChange={onSpeedChange}
              type="number"
              name="speed"
              placeholder="Ingrese la velocidad"
              className={styles.input}
            />
          </div>
          {speedError && <p className={styles.inputError}>{speedError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Altura
            </label>
            <input
              onChange={onHeightChange}
              type="number"
              name="height"
              placeholder="Ingrese la altura"
              className={styles.input}
            />
          </div>
          {heightError && <p className={styles.inputError}>{heightError}</p>}
        </div>

        <div className={styles.inputContainer}>
          <div>
            <label className={styles.label} htmlFor="">
              Peso
            </label>
            <input
              onChange={onWeightChange}
              type="number"
              name="weight"
              placeholder="Ingrese el peso"
              className={styles.input}
            />
          </div>
          {weightError && <p className={styles.inputError}>{weightError}</p>}
        </div>

        <div className={styles.typesContainer}>
          <label className={styles.label} htmlFor="">
            Tipos
          </label>
          <div className={styles.typesCheckboxesContainer}>
            {types?.map((item) => (
              <span key={item.name} className={styles.spanCheckbox}>
                <input
                  type="checkbox"
                  name={item.name}
                  checked={!!checkedTypes[item.name]}
                  onChange={onCheckTypeChange}
                />
                <label className={styles.labelCheckbox}>{item?.name}</label>
              </span>
            ))}
            {checkedTypesError && (
              <p className={styles.inputError}>{checkedTypesError}</p>
            )}
          </div>
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
