//Aqui sobrescrevemos a biblioteca do express e adicionamos a propriedade user ao request
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}