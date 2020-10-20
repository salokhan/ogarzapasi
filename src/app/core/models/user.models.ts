export interface Roles {
  admin?: boolean;
  srviceProvider?: boolean;
  client?: boolean;
}

export class FirebaseUserModel {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Roles;
  image: string;
  provider: string;


  constructor() {
    this.uid = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.roles = { client: false };
    this.image = '';
    this.provider = '';

  }
}
