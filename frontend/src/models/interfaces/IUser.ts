export interface IUser {
  _id: string,
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}