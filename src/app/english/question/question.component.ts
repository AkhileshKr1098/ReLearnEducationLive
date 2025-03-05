import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  constructor() {
    console.log('question loades')
  }

  question = 'What is the capital of France?';
  options = ['Berlin', 'Madrid', 'Paris', 'Rome'];
  correctAnswer = 'Paris';
  selectedOption: string | null = null;
  result: boolean | null = null;

  selectOption(option: string) {
    this.selectedOption = option;
  }

  submitAnswer() {
    this.result = this.selectedOption === this.correctAnswer;
  }
}
