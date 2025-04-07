import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-letter-match',
  templateUrl: './letter-match.component.html',
  styleUrls: ['./letter-match.component.scss']
})
export class LetterMatchComponent implements AfterViewInit {
  @ViewChild('matchCanvas', { static: true }) McanvasRef!: ElementRef;
  private ctxM!: CanvasRenderingContext2D;
  private startPoint: { x: number; y: number; index: number; side: 'left' | 'right' } | null = null;
  private currentMousePos: { x: number; y: number } | null = null;
  private isDragging = false;

  leftItems = ['Pin', 'Gun', 'Pot', 'Man', 'Ten'];
  rightItems = ['Pot', 'Pin', 'Gun', 'Ten', 'Man'];
  bulletRadius = 6;

  positions: {
    left: { x: number; y: number };
    right: { x: number; y: number };
  }[] = [];

  lines: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    color: string;
  }[] = [];

  ngAfterViewInit() {
    const canvas = this.McanvasRef.nativeElement as HTMLCanvasElement;
    this.ctxM = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.drawLettersM();
  }

  drawLettersM() {
    const canvas = this.McanvasRef.nativeElement as HTMLCanvasElement;
    this.ctxM.clearRect(0, 0, canvas.width, canvas.height);
    this.ctxM.font = '20px Arial';
    this.ctxM.fillStyle = 'black';
    this.ctxM.textBaseline = 'middle';
    this.positions = [];

    for (let i = 0; i < this.leftItems.length; i++) {
      const y = 50 + i * 60;

      this.ctxM.fillStyle = '#ADD8E6';
      this.ctxM.fillRect(40, y - 20, 120, 40);
      this.ctxM.fillStyle = 'black';
      this.ctxM.fillText(this.leftItems[i], 50, y);
      this.drawBullet(150, y);

      this.ctxM.fillStyle = '#90EE90';
      this.ctxM.fillRect(640, y - 20, 120, 40);
      this.ctxM.fillStyle = 'black';
      this.drawBullet(640, y);
      this.ctxM.fillText(this.rightItems[i], 660, y);

      this.positions.push({ left: { x: 150, y }, right: { x: 640, y } });
    }

    for (const line of this.lines) {
      this.ctxM.beginPath();
      this.ctxM.moveTo(line.start.x, line.start.y);
      this.ctxM.lineTo(line.end.x, line.end.y);
      this.ctxM.strokeStyle = line.color;
      this.ctxM.lineWidth = 2;
      this.ctxM.stroke();
    }

    // Live dragging line
    if (this.startPoint && this.currentMousePos) {
      this.ctxM.beginPath();
      this.ctxM.moveTo(this.startPoint.x, this.startPoint.y);
      this.ctxM.lineTo(this.currentMousePos.x, this.currentMousePos.y);
      this.ctxM.strokeStyle = 'gray';
      this.ctxM.lineWidth = 2;
      this.ctxM.stroke();
    }
  }

  drawBullet(x: number, y: number) {
    this.ctxM.beginPath();
    this.ctxM.arc(x, y, this.bulletRadius, 0, Math.PI * 2);
    this.ctxM.fillStyle = 'black';
    this.ctxM.fill();
  }

  getMousePosition(event: MouseEvent): { x: number; y: number } {
    const canvas = this.McanvasRef.nativeElement as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  onCanvasDown(event: MouseEvent) {
    const pos = this.getMousePosition(event);

    for (let i = 0; i < this.positions.length; i++) {
      const left = this.positions[i].left;
      const right = this.positions[i].right;

      if (this.isNear(pos, left)) {
        this.startPoint = { x: left.x, y: left.y, index: i, side: 'left' };
        this.isDragging = true;
        return;
      } else if (this.isNear(pos, right)) {
        this.startPoint = { x: right.x, y: right.y, index: i, side: 'right' };
        this.isDragging = true;
        return;
      }
    }
  }

  onCanvasMove(event: MouseEvent) {
    if (!this.isDragging || !this.startPoint) return;
    this.currentMousePos = this.getMousePosition(event);
    this.drawLettersM();
  }

  onCanvasUp(event: MouseEvent) {
    if (!this.startPoint) return;
    const pos = this.getMousePosition(event);

    for (let i = 0; i < this.positions.length; i++) {
      const left = this.positions[i].left;
      const right = this.positions[i].right;

      const oppositeSide = this.startPoint.side === 'left' ? right : left;
      const oppositeIndex = i;

      if (this.isNear(pos, oppositeSide)) {
        const leftIndex = this.startPoint.side === 'left' ? this.startPoint.index : oppositeIndex;
        const rightIndex = this.startPoint.side === 'right' ? this.startPoint.index : oppositeIndex;

        const isCorrect = this.leftItems[leftIndex] === this.rightItems[rightIndex];

        this.lines.push({
          start: { x: this.startPoint.x, y: this.startPoint.y },
          end: { x: oppositeSide.x, y: oppositeSide.y },
          color: isCorrect ? 'green' : 'red'
        });

        this.startPoint = null;
        this.currentMousePos = null;
        this.isDragging = false;
        this.drawLettersM();
        return;
      }
    }

    // No match made
    this.startPoint = null;
    this.currentMousePos = null;
    this.isDragging = false;
    this.drawLettersM();
  }

  isNear(p1: { x: number; y: number }, p2: { x: number; y: number }) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y) <= this.bulletRadius + 5;
  }

  clearCanvasM() {
    this.lines = [];
    this.startPoint = null;
    this.currentMousePos = null;
    this.isDragging = false;
    this.drawLettersM();
  }

  drawLettersMAgain() {
    this.clearCanvasM();
  }
}
