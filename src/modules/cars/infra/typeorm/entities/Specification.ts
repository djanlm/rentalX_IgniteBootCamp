import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

import { v4 as uuidV4 } from "uuid";

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) { //when id doesn't exist, it will create a new id
      this.id = uuidV4();
    }
  }
}

export { Specification }