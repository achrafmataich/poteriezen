import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss'
})
export class ToggleButtonComponent {
  @Input() value!: boolean; // initial state of the button
  @Input() onLabel = 'On'; // label for the on state
  @Input() offLabel = 'Off'; // label for the off state
  @Input() disabled = false; // whether the button is disabled or not
  @Output() valueChange = new EventEmitter<boolean>(); // event emitter for the value change

  toggle() {
    // toggle the value and emit the event
    this.value = !this.value;
    this.valueChange.emit(this.value);
  }
}
