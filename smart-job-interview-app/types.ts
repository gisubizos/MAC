
export interface UserInfo {
  name: string;
  location: string;
  company: string;
  language: 'English' | 'French' | 'Kinyarwanda';
}

export type Sender = 'user' | 'ai';

export interface Message {
  id: number;
  text: string;
  sender: Sender;
}
