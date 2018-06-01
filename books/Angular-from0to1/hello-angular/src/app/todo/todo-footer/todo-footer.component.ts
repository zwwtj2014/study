import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {
  @Input() itemCount: number;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClear = new EventEmitter<boolean>();

  onClick() {
    this.onClear.emit(true);
  }

  constructor() {}

  ngOnInit() {}
}
