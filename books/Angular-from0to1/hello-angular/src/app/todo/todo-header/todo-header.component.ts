import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {
  inputValue: string;
  @Input() placeholder = 'What needs to be done?';
  @Input() delay = 300;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onTextChanges = new EventEmitter<string>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onEnterUp = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    const event$ = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue)
      .debounceTime(this.delay)
      .distinctUntilChanged();

    event$.subscribe(input => this.onTextChanges.emit(input));
  }

  ngOnInit() {}

  enterUp() {
    this.onEnterUp.emit(true);
    this.inputValue = '';
  }
}
