import { useState } from "react";
import { ERROR, INITIAL_PAREDES } from "../constants";

const useCalculator = () => {
  const [inputValues, setInputValues] = useState<any>(INITIAL_PAREDES);
  const [error, setError] = useState<any>(ERROR);
  const [currentWall, setCurrentWall] = useState<any>('parede_0');
  const [currentProperty, setCurrentProperty] = useState<any>(null);
  
  const validateSpaceTotalWithDoorAndWindow = (currentWall: any, fildError: any) => {
    if (inputValues[currentWall].window > 0 || inputValues[currentWall].door > 0) {
      const resultAlturaLargura = (inputValues[currentWall].height * inputValues[currentWall].width) / 2;
      const resultPortaJanela = ( 1.52 * inputValues[currentWall].door) + (2.4 * inputValues[currentWall].window);
      if (resultPortaJanela <= resultAlturaLargura) {
        return;
      }
      setError((prevState: any) => {
        return {
          ...prevState,
          [currentWall] : {...prevState[currentWall], [fildError === 'door' ? 'wallWithDoor' : '']: 'O total de área das portas e janelas deve ser no máximo 50% da área de parede'}
        }
      });
    }
  };

  const validateDoor = (currentWall: any, fildError?: any) => {
    if (inputValues[currentWall].door > 0 && inputValues[currentWall].height > 2.2) {
      validateSpaceTotalWithDoorAndWindow(currentWall, fildError);
      return;
    } 

    if (inputValues[currentWall].door === 0) {
      validateSpaceTotalWithDoorAndWindow(currentWall, fildError);
      return;
    } 

    setError((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [fildError === 'door' ? 'wallWithDoor' : '']: 'A altura de paredes com porta deve ser, no mínimo, 30 centímetros maior que a altura da porta'}
      }
    });
  };

  const validateWidth = (currentWall: any, fildError?: any) => {
    if ((inputValues[currentWall].width > 0) && (inputValues[currentWall].width) <= 15) {
      validateDoor(currentWall, fildError);
      return;
    }
    setError((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [fildError]: `valor de entrada para o campo ${fildError} está inválido`}
      }
    });
  };

  const validateHeight = (currentWall: any, fildError?: any) => {
    if ((inputValues[currentWall].height > 0) && (inputValues[currentWall].height) <= 15) {
      validateDoor(currentWall, fildError);
      return;
    } 
    setError((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [fildError]: `valor de entrada para o campo ${fildError} está inválido`}
      }
    });
  };
  
  const  onChange = (event: any) => {
    let currentWall = event.target.id;
    let currentProperty = event.target.name;
    setCurrentWall(currentWall);
    setCurrentProperty(currentProperty);
    setInputValues((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [event.target.name]: event.target.value}
      }
    });
  }

  return {
    onChange,
    validateHeight,
    validateWidth,
    error,
    setError,
    inputValues,
    currentWall,
    currentProperty
  }
};

export default useCalculator;
