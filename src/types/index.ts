export type Client = {
  id: number;
  name: string;
  phone: string;
  vehicles?: Vehicle[];
};

export type Vehicle = {
  id: number;
  plate: string;
  model: string;
  clientId: number;
};
