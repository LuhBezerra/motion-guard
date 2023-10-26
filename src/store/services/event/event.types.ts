export interface UserDto {
  id?: string
  name: string
  email: string
  cpf: string
  card: string
  type?: string
  createdAt?: string
  picture: string
  eventId?: string
  enteredAt?: string
  exitedAt?: string
  enabled?: boolean
  accountNonExpired?: boolean
  accountNonLocked?: boolean
  credentialsNonExpired?: boolean
  username?: string
  authorities?: unknown
}

export interface EventDto {
  id?: string;
  name: string;
  description: string;
  users?: UserDto[];
}

export interface OptionalEventDto extends Partial<EventDto> {}

export interface OptionalUserDto extends Partial<UserDto> {}