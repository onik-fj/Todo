type Todo = {
    id: string;
    title: string;
    description: string;
    categories?: string | undefined;
};
type TodoCategories = {
    id: string;
    title: string;
    description: string;
};


type ChangeTodoItem = (e: boolean)=> void;

type DeleteTodo=(selectedTodo: Todo, ListDB: boolean)=> void;

type Selector = (categories: string) => void;

type AddTodoItem = (title: string, description: string, categories: string)=>void;
type AddTodoCategories = (title: string, description: string)=>void;
type EditTodo = (id:string, title: string, description: string, categories: string)=> void;