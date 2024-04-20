import { StudentModel } from '../../../../../domain/models/student/student.model'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity('students')
export class StudentEntity implements StudentModel {
  @PrimaryGeneratedColumn('identity')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column({ update: false })
  cpf: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
