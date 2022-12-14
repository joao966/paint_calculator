import { useState } from "react";
import { ERROR, INITIAL_CANS, INITIAL_PAREDES } from "../constants";
import { CANS_MODEL, ERROR_MODEL, WALL_MODEL } from "../models";

const useCalculator = () => {
  const [inputValues, setInputValues] = useState<WALL_MODEL | any>(INITIAL_PAREDES);
  const [error, setError] = useState<ERROR_MODEL>(ERROR);
  const [currentWall, setCurrentWall] = useState<string>('parede_0');
  const [currentProperty, setCurrentProperty] = useState<string>('');
  const [cansPaint, setCansPaint] = useState<CANS_MODEL>(INITIAL_CANS);
  const [reset, setReset] = useState<boolean>(false);
  const [viewMeter, setViewMeter] = useState<string>('');

  const onClickResult = () => {
    validateHeight(currentWall, currentProperty)
    validateWidth(currentWall, currentProperty);
    validateDoor(currentWall, currentProperty);
    validateSpaceTotalWithDoorAndWindow(currentWall, currentProperty);

    if(reset) resetChange();

    if (Object.values(inputValues).some(({height, width}: any) => height > 0 || width > 0)) {
      const resultadoTotalParedeM2 = calulateMeters();
      setViewMeter(String(resultadoTotalParedeM2));
      const { lata05, lata25, lata36, lata18 } = calculateCans(resultadoTotalParedeM2);
      setCansPaint({
        lata05,
        lata25,
        lata36,
        lata18
      })
      setReset(true);
      return;
    } else {
      setError((prevState: ERROR_MODEL | any) => {
        return {
          ...prevState,
          [currentWall] : {...prevState[currentWall], space: 'Defina as medidas da parede!'}
        }
      });
    }
  };
  
  const validateSpaceTotalWithDoorAndWindow = (currentWall: string, fildError: string | undefined) => {
    if (inputValues[currentWall].window > 0 || inputValues[currentWall].door > 0) {
      const resultAlturaLargura = (inputValues[currentWall].height * inputValues[currentWall].width) / 2;
      const resultPortaJanela = ( 1.52 * inputValues[currentWall].door) + (2.4 * inputValues[currentWall].window);
      if (resultPortaJanela <= resultAlturaLargura) {
        //passou por todas as valid????es!
        return;
      }
      setError((prevState: any) => {
        return {
          ...prevState,
          [currentWall] : {...prevState[currentWall], [fildError === 'door' ? 'wallWithDoor' : '']: 'O total de ??rea das portas e janelas deve ser no m??ximo 50% da ??rea de parede'}
        }
      });
    }
  };

  const validateDoor = (currentWall: string, fildError?: string | undefined) => {
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
        [currentWall] : {...prevState[currentWall], [fildError === 'door'?'wallWithDoor':'']: 'A altura de paredes com porta deve ser, no m??nimo, 30 cent??metros maior que a altura da porta'}
      }
    });
  };

  const validateWidth = (currentWall: string, fildError?: string | any) => {
    if ((inputValues[currentWall].width > 0) && (inputValues[currentWall].width) <= 15) {
      validateDoor(currentWall, fildError);
      setError(ERROR);
      return;
    }
    setError((prevState: any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [fildError]: `valor de entrada para o campo ${fildError} est?? inv??lido`}
      }
    });
  };

  const validateHeight = (currentWall: string, fildError?: string | any) => {
    if ((inputValues[currentWall].height > 0) && (inputValues[currentWall].height) <= 15) {
      validateDoor(currentWall, fildError);
      return;
    } 
    setError((prevState: ERROR_MODEL | any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [fildError]: `valor de entrada para o campo ${fildError} est?? inv??lido`}
      }
    });
  };
  
  const  onChange = (event: React.FormEvent<HTMLInputElement> | any) => {
    let currentWall = event.target.id;
    let currentProperty = event.target.name;
    setCurrentWall(currentWall);
    setCurrentProperty(currentProperty);
    setInputValues((prevState: WALL_MODEL | any) => {
      return {
        ...prevState,
        [currentWall] : {...prevState[currentWall], [event.target.name]: event.target.value}
      }
    });
  }

  const resetChange = () => {
    setError(ERROR);
    setInputValues(INITIAL_PAREDES); 
    setReset(false);
    return;
  };

  const calulateMeters = () => {
    const parede1 = (inputValues.parede_0.height * inputValues.parede_0.width) - ( 1.52 *   inputValues.parede_0.door) - (2.4 * inputValues.parede_0.window);

    const parede2 = (inputValues.parede_1.height * inputValues.parede_1.width) - ( 1.52 * inputValues.parede_1.door) - (2.4 * inputValues.parede_1.window);

    const parede3 = (inputValues.parede_2.height * inputValues.parede_2.width) - ( 1.52 * inputValues.parede_2.door) - (2.4 * inputValues.parede_2.window);

    const parede4 = (inputValues.parede_3.height * inputValues.parede_3.width) - ( 1.52 * inputValues.parede_3.door) - (2.4 * inputValues.parede_3.window);

    return parede1 + parede2 + parede3 + parede4;
  };

  const calculateCans = (resultadoTotalParedeM2: number) => {
    let litroTintas = resultadoTotalParedeM2 / 5;
    let lata05 = 0, lata25 = 0, lata36 = 0, lata18 = 0;
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
    return { lata05, lata25, lata36, lata18 }
  };

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
    reset,
    viewMeter
  }
};

export default useCalculator;
