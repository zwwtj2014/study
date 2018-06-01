import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() isChecked = false;
  @Input() todoDesc = '';
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onToggleTriggered = new EventEmitter<boolean>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRemoveTriggered = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.onToggleTriggered.emit(true);
  }

  remove() {
    this.onRemoveTriggered.emit(true);
  }
}
