import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Todo } from '../domain/entities';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';

  constructor(@Inject('todoService') private todoService, private route: ActivatedRoute, private router: Router) {
    console.log(123);
  }

  ngOnInit() {
    this.route.params.forEach(params => {
      const filter = params['filter'];
      console.log(filter);
      this.filterTodos(filter);
    });
  }

  filterTodos(filter: string) {
    this.todoService.filterTodos(filter).then(todos => {
      this.todos = [...todos];
    });
  }

  onTextChanges(value) {
    this.desc = value;
  }

  addTodo() {
    this.todoService.addTodo(this.desc).then(todo => {
      this.todos = [...this.todos, todo];
      this.desc = '';
    });
  }

  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    return this.todoService.toggleTodo(todo).then(t => {
      this.todos = [...this.todos.slice(0, i), t, ...this.todos.slice(i + 1)];
      return null;
    });
  }

  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    return this.todoService.deleteTodoById(todo.id).then(() => {
      this.todos = [...this.todos.slice(0, i), ...this.todos.slice(i + 1)];
      return null;
    });
  }

  getTodos(): void {
    this.todoService.getTodos().then(todos => {
      this.todos = [...todos];
    });
  }

  toggleAll() {
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
  }

  clearCompleted(): void {
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.todoService.deleteTodoById(todo.id))).then(() => (this.todos = [...active_todos]));
  }
}
