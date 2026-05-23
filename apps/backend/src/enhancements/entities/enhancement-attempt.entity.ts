import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('enhancement_attempts')
export class EnhancementAttempt extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  swordId: number;

  @Column()
  userId: number;

  @Column()
  targetLevel: number;

  @Column()
  success: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  attemptedAt: Date;
}
