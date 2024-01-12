  import {User} from './user.model'
  export interface evenement {
      id: number;
      title: string;
      description: string;
      date: Date;
      longitude: number;
      latitude: number;
      address: string;
      user: User;
    }