import { Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  newTodo = { title: '', description: '', completed: false };
  editingTodo: any = null;
  completedTodos: any[] = [];

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todosService.getTodos().subscribe(data => {
      this.todos = data.content.filter((todo: Todo) => !todo.completed);
      this.completedTodos = data.content.filter((todo: Todo) => todo.completed);
    });
  }


  addTodo() {
    this.todosService.createTodo(this.newTodo).subscribe(() => {
      this.loadTodos();
      this.newTodo = { title: '', description: '', completed: false };
    });
  }

  editTodo(todo: any) {
    this.editingTodo = { ...todo };
  }

  updateTodo() {
    this.todosService.updateTodo(this.editingTodo.id, this.editingTodo).subscribe(() => {
      this.loadTodos();
      this.editingTodo = null;
    });
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
     this.updateTodoStatus(todo);
  }

  updateTodoStatus(todo: any) {
    this.todosService.updateTodo(todo.id, todo)
      .subscribe(() => {
        this.loadTodos();
      });
  }

  cancelEdit() {
    this.editingTodo = null;
  }

}
