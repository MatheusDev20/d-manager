type PendingTask = {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  priority: string;
  customer: string | null;
  developerId: number;
};

export type Developer = {
  id: number;
  name: string;
  picture: string;
  status: string;
  tasks: PendingTask[];
};
