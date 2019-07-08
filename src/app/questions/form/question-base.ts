export class QuestionBase<T> {
  id: string;
  title: string;
  content: string;
  category: string;
  type: string;
  choices: object;
  answer?: any;

  constructor(options: {
    id?: string,
    title?: string,
    content?: string,
    category?: string,
    type?: string,
    choices?: object,
    answer?: any
  } = {}) {
    // this.value = options.value;
    this.id = options.id || '';
    this.title = options.title || '';
    this.content = options.content || '';
    this.category = options.category || '';
    this.type = options.type || '';
    this.choices = options.choices || {};
    this.answer = options.answer;
  }
}
