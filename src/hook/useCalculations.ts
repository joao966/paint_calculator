import { useState } from "react";
import { ERROR, INITIAL_CANS, INITIAL_PAREDES } from "../constants";

const useCalculator = () => {
  const [inputValues, setInputValues] = useState<any>(INITIAL_PAREDES);
  const [error, setError] = useState<any>(ERROR);
  const [currentWall, setCurrentWall] = useState<any>('parede_0');
  const [currentProperty, setCurrentProperty] = useState<any>(null);
  const [cansPaint, setCansPaint] = useState<any>(INITIAL_CANS);
  const [reset, setReset] = useState<any>(false);

  const onClickResult = () => {
    console.log('reset: ', reset);
    if(reset) {
      console.log('if: ');
      setError(ERROR);
      setInputValues(INITIAL_PAREDES); 
      setReset(false);
      return;
    }

    let resultadoTotalParedeM2;
    let lata05 = 0, lata25 = 0, lata36 = 0, lata18 = 0;

    if ((inputValues.parede_0.height.length > 0 && inputValues.parede_0.width.length > 0) ||
        (inputValues.parede_1.height.length > 0 && inputValues.parede_1.width.length > 0) ||
        (inputValues.parede_2.height.length > 0 && inputValues.parede_2.width.length > 0) ||
        (inputValues.parede_3.height.length > 0 && inputValues.parede_3.width.length > 0)) {
      
      const parede1 = (inputValues.parede_0.height * inputValues.parede_0.width) - ( 1.52 * inputValues.parede_0.door) - (2.4 * inputValues.parede_0.window);

      const parede2 = (inputValues.parede_1.height * inputValues.parede_1.width) - ( 1.52 * inputValues.parede_1.door) - (2.4 * inputValues.parede_1.window);

      const parede3 = (inputValues.parede_2.height * inputValues.parede_2.width) - ( 1.52 * inputValues.parede_2.door) - (2.4 * inputValues.parede_2.window);

      const parede4 = (inputValues.parede_3.height * inputValues.parede_3.width) - ( 1.52 * inputValues.parede_3.door) - (2.4 * inputValues.parede_3.window);

      resultadoTotalParedeM2 = parede1 + parede2 + parede3 + parede4;


      let litroTintas = resultadoTotalParedeM2 / 5;
      while (litroTintas > 0) {
        if (litroTintas >= 18) {
          litroTintas = litroTintas - 18
          lata18 += 1;
        } else if (litroTintas >= 3.6) {
          litroTintas = litroTintas - 3.6;
          lata36 += 1;
        } else if (litroTintas >= 2.5) {
          litroTintas = litroTintas - 2.5;
          lata25 += 1;
        } else {
          litroTintas = litroTintas - 0.5;
          lata05 += 1;
        }
      }

      setCansPaint({
        lata05,
        lata25,
        lata36,
        lata18
      })
      setReset(true);
      return;
    } else {
      setError((prevState: any) => {
        return {
          ...prevState,
          [currentWall] : {...prevState[currentWall], space: 'Defina as medidas da parede!'}
        }
      });
    }
  };
  
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
    currentProperty,
    onClickResult,
    cansPaint,
    reset
  }
};

export default useCalculator;
