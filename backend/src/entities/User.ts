import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "Users" })
export default class User extends BaseEntity {
  @PrimaryColumn({ type: "int", name: "Album" })
  album: number;

  @Column({ type: "varchar", length: 50, name: "FirstName" })
  firstName: string;

  @Column({ type: "varchar", length: 50, name: "LastName" })
  lastName: string;

  @Column({ type: "varchar", length: 128, name: "Password"})
  password: string;

  @Column({ type: "varchar", length: 8, name: "PasswordSalt"})
  passwordSalt: string;

  @Column({ type: "varchar", unique: true, length: 320, name: "Email" })
  email: string;

  @Column({ type: "text", name: "Photo", nullable: true })
  photo: string;

  @Column({ type: "boolean", name: "IsAdmin", default: false })
  isAdmin: boolean;

  @Column({ type: "boolean", name: "IsActive", default: true })
  isActive: boolean;

  @Column({ type: "datetime", name: "CreatedOn", default: () => "CURRENT_TIMESTAMP" })
  createdOn: Date;
}
