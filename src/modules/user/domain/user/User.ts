import { Entity } from "../../../../core/domain/Entity";

import { Email } from "./Email";
import { Name } from "./Name";
import { Password } from "./Password";

export interface IUserProps {
  name: Name
  email: Email
  password: Password
}

export class User extends Entity<IUserProps> {

  get name () {
    return this.props.name
  }
  
  get email () {
    return this.props.email
  }

  get password () {
    return this.props.password
  }

  private constructor (props: IUserProps, id?: string) {
    super(props, id)
  }

  static create (props: IUserProps, id?: string) {
    
    const user = new User(props, id)
    return user
  }
}
