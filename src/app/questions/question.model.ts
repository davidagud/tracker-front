export interface Question {
  userId?: string;
  id: string;
  title: string;
  content: string;
  category: string;
  type: string;
  choices: object;
  answer?: any;
}
