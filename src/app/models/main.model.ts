export interface MainData {
  id: number;
  name: string;
  fullName?: string;
  dName?: string;
  sName?: string;
  isSelect?: boolean;
}

export enum Status {
  Start,
  Main,
  Selection,
  Result
}

export enum Gender {
  Boy,
  Girl
}
