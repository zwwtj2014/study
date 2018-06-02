import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../domain/entities';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  _todos: Todo[] = [];

  @Input()
  set todos(todos: Todo[]) {
    this._todos = [...todos];
  }

  get todos() {
    return this._todos;
  }

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRemoveTodo = new EventEmitter<Todo>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onToggleTodo = new EventEmitter<Todo>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onToggleAll = new EventEmitter<boolean>();
  onRemoveTriggered(todo: Todo) {
    this.onRemoveTodo.emit(todo);
  }

  onToggleTriggered(todo: Todo) {
    this.onToggleTodo.emit(todo);
  }

  onToggleAllTriggered() {
    this.onToggleAll.emit(true);
  }

  constructor() {}

  ngOnInit() {}
}
