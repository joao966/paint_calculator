export interface Parede0 {
  height: number;
  width: number;
  window: number;
  door: number;
}

export interface Parede1 {
  height: number;
  width: number;
  window: number;
  door: number;
}

export interface Parede2 {
  height: number;
  width: number;
  window: number;
  door: number;
}

export interface Parede3 {
  height: number;
  width: number;
  window: number;
  door: number;
}

export interface WALL_MODEL {
  parede_0: Parede0;
  parede_1: Parede1;
  parede_2: Parede2;
  parede_3: Parede3;
}

//

export interface Parede00 {
  height: string;
  width: string;
  wallWithDoor: string;
  space: string;
}

export interface Parede11 {
  height: string;
  width: string;
  wallWithDoor: string;
  space: string;
}

export interface Parede22 {
  height: string;
  width: string;
  wallWithDoor: string;
  space: string;
}

export interface Parede33 {
  height: string;
  width: string;
  wallWithDoor: string;
  space: string;
}

export interface ERROR_MODEL {
  parede_0: Parede00;
  parede_1: Parede11;
  parede_2: Parede22;
  parede_3: Parede33;
}

//

export interface CANS_MODEL {
  lata05: number;
  lata25: number;
  lata36: number;
  lata18: number;
};
