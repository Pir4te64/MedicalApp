export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  observation?: string;
}

export interface ContactosComponentProps {
  afiliadoData: {
    nombre: string;
    documento: string;
    tipoUsuario: string;
    id: number;
  };
}
