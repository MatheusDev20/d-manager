type PendingTask = {
  id: string;
  description: string;
  status: string;
  priority: string;
  customer?: string;
};

export type Developer = {
  id: number;
  name: string;
  picture: string;
  status: "ativo" | "inativo";
  pendencies: PendingTask[];
};
