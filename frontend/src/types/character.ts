export interface ICharacter {
  external_id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  origin: {
    id: string;
    name: string;
  };
}
