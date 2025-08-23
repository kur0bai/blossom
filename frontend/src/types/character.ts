export interface IComment {
  content: string;
  createdAt: number;
}

export interface ICharacter {
  external_id: string;
  name: string;
  image: string;
  comments: IComment[];
  species: string;
  status: string;
  origin: {
    id: string;
    name: string;
  };
}
