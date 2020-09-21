// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export interface IToken {
  token:string;
  user:{
    username:string;
    email:string;
    admin:boolean;
    id:string;
  }
}

export interface INote {
  title:string;
  description:string;
  author?:string;
  id:string
}

interface INoteParams { 
  handleDelete:() => {};
  note:INote
}

