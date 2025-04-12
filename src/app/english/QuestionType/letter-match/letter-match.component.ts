import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface Point {
  x: number;
  y: number;
}

interface Match {
  start: Point;
  end: Point;
  correct?: boolean;
  leftIndex: number;
  rightIndex: number;
  leftElement: HTMLElement;
  rightElement: HTMLElement;
}

@Component({
  selector: 'app-letter-match',
  templateUrl: './letter-match.component.html',
  styleUrls: ['./letter-match.component.scss']
})
export class LetterMatchComponent implements AfterViewInit {
  rightvalue = ['ball', 'sun', 'water', 'fly', 'elephant'];
  leftValue = ['ball', 'sun', 'water', 'fly', 'elephant'];
  leftWords: any[] = [];
  rightWords: any[] = [];
  matchedPairs: Match[] = [];

  isDragging = false;
  dragLine = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } };

  selectedItem: { side: 'left' | 'right', item: any, element: HTMLElement } | null = null;
  outputMessage: number = 0
  constructor(private dialog: MatDialog) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resetWords();
    });
  }

  shuffleArray(array: any[]) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  resetWords() {
    this.leftWords = this.shuffleArray(this.leftValue.map(word => ({ word })));
    this.rightWords = this.shuffleArray(this.rightvalue.map(word => ({ word })));
    this.clearMatches();
  }

  clearMatches() {
    this.matchedPairs = [];
    document.querySelectorAll('.word-item[data-side="left"], .word-item[data-side="right"]').forEach(el => {
      (el as HTMLElement).style.backgroundColor = '#f8f8f8';
      (el as HTMLElement).style.color = '#000';
    });
  }

  getElementAnchor(el: HTMLElement, side: 'left' | 'right'): Point {
    const rect = el.getBoundingClientRect();
    const container = document.querySelector('.word-match-wrapper') as HTMLElement;
    const containerRect = container.getBoundingClientRect();

    return {
      x: side === 'left' ? rect.right - containerRect.left : rect.left - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top
    };
  }

  startDrag(item: any, side: 'left' | 'right', event: MouseEvent | TouchEvent) {
    if (this.isDragging) return;

    const target = event.currentTarget as HTMLElement;
    const index = Number(target.getAttribute('data-id'));

    this.selectedItem = { side, item, element: target };
    this.isDragging = true;

    const touch = (event instanceof TouchEvent) ? event.touches[0] : event;
    const anchor = this.getElementAnchor(target, side);
    this.dragLine.start = { ...anchor };
    this.dragLine.end = { x: touch.pageX, y: touch.pageY };

    event.stopPropagation();
    event.preventDefault();
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const container = document.querySelector('.word-match-wrapper') as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      this.dragLine.end = {
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top
      };
    }
  }

  onTouchMove(event: TouchEvent) {
    if (this.isDragging && event.touches.length > 0) {
      const touch = event.touches[0];
      const container = document.querySelector('.word-match-wrapper') as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      this.dragLine.end = {
        x: touch.clientX - containerRect.left,
        y: touch.clientY - containerRect.top
      };
    }
  }

  onMouseUp(event: MouseEvent) {
    this.completeDrag(event.target as HTMLElement);
  }

  onTouchEnd(event: TouchEvent) {
    if (!this.isDragging || !this.selectedItem) return;
    const touch = event.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
    this.completeDrag(target);
  }

  completeDrag(target: HTMLElement) {
    if (!this.isDragging || !this.selectedItem || !target || !target.classList.contains('word-item')) return;
    this.playAudio('../../../../assets/audio/linematchtime.wav');

    const selectedItem = this.selectedItem;
    const targetSide = target.getAttribute('data-side') as 'left' | 'right';
    const targetIndex = Number(target.getAttribute('data-id'));
    const selectedIndex = Number(selectedItem.element.getAttribute('data-id'));

    if (targetSide && targetSide !== selectedItem.side) {
      this.matchedPairs = this.matchedPairs.filter(match =>
        !(match.leftIndex === (selectedItem.side === 'left' ? selectedIndex : targetIndex) ||
          match.rightIndex === (selectedItem.side === 'right' ? selectedIndex : targetIndex))
      );

      const leftEl = selectedItem.side === 'left' ? selectedItem.element : target;
      const rightEl = selectedItem.side === 'right' ? selectedItem.element : target;

      this.matchedPairs.push({
        start: this.getElementAnchor(leftEl, 'left'),
        end: this.getElementAnchor(rightEl, 'right'),
        leftIndex: selectedItem.side === 'left' ? selectedIndex : targetIndex,
        rightIndex: selectedItem.side === 'right' ? selectedIndex : targetIndex,
        leftElement: leftEl,
        rightElement: rightEl
      });
    }

    this.resetDrag();
  }

  resetDrag() {
    this.isDragging = false;
    this.selectedItem = null;
  }

  isSave: boolean = false;
  TotalPercentage = 0;

  saveMatches(type: string) {
    if (type === 'submit') {
      this.isSave = false;
      if (this.TotalPercentage === 100) {
        this.outputMessage = 100
        console.log(this.outputMessage);

      } else if (this.TotalPercentage > 75) {
        this.outputMessage = 75
      } else if (this.TotalPercentage > 50) {
        this.outputMessage = 50
      } else if (this.TotalPercentage > 0) {
        this.outputMessage = 0
      } else {
        alert('No correct matches. Try again!');
      }
    }

    if (type === 'save') {
      this.isSave = true;
      this.playAudio('../../../../assets/audio/answersavetime.wav');

      let correctCount = 0;
      let incorrectCount = 0;

      for (const match of this.matchedPairs) {
        const leftWord = this.leftWords[match.leftIndex].word.trim().toLowerCase();
        const rightWord = this.rightWords[match.rightIndex].word.trim().toLowerCase();
        const correct = leftWord === rightWord;
        match.correct = correct;

        if (correct) {
          correctCount++;
          match.leftElement.style.backgroundColor = '#affab0';
          match.leftElement.style.color = '#000';
          match.rightElement.style.backgroundColor = '#affab0';
          match.rightElement.style.color = '#000';
        } else {
          incorrectCount++;
          match.leftElement.style.backgroundColor = '#fcb1b1';
          match.leftElement.style.color = '#000';
          match.rightElement.style.backgroundColor = '#fcb1b1';
          match.rightElement.style.color = '#000';
        }
      }

      const total = correctCount + incorrectCount;
      this.TotalPercentage = total > 0 ? (correctCount / total) * 100 : 0;
    }
  }

  playAudio(url: string): void {
    const audio = new Audio(url);
    audio.play().catch(err => console.error('Failed to play audio:', err));
  }

  onCheck() {
    alert('Check feature not implemented yet.');
  }
}
