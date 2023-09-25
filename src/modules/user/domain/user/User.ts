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
    return this.props.name.value
  }
  
  get email () {
    return this.props.email.value
  }

  get password () {
    return this.props.password
  }

  set name (name: string) {
    this.props.name = Name.create(name)
  }
  
  set email (email: string) {
    this.props.email = Email.create(email)
  }

  private constructor (props: IUserProps, id?: string) {
    super(props, id)
  }

  static create (props: IUserProps, id?: string) {
    
    const user = new User(props, id)
    return user
  }
}
