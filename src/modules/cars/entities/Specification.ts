import { v4 as uuidV4 } from "uuid";


class Specification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) { //when id doesn't exist, it will create a new id
      this.id = uuidV4();
    }
  }
}

export { Specification }