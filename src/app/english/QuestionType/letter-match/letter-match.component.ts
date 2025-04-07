import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-letter-match',
  templateUrl: './letter-match.component.html',
  styleUrls: ['./letter-match.component.scss']
})
export class LetterMatchComponent implements AfterViewInit {
  @ViewChild('matchCanvas', { static: true }) canvasRef!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private start = { x: 0, y: 0 };
  private current = { x: 0, y: 0 };
  private positions: { left: any[], right: any[] } = { left: [], right: [] };
  private matches: { x1: number, y1: number, x2: number, y2: number, correct: boolean }[] = [];

  leftItems = ['Pin', 'Gun', 'Pot', 'Man', 'Ten'];
  rightItems = ['Pot', 'Pin', 'Gun', 'Ten', 'Man'];

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')!;
    this.drawLetters();
  }

  drawLetters() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.font = '20px Arial';
    this.ctx.lineWidth = 2;
    this.positions = { left: [], right: [] };

    for (let i = 0; i < this.leftItems.length; i++) {
      const y = 50 + i * 60;
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.leftItems[i], 50, y);
      this.ctx.beginPath();
      this.ctx.arc(150, y - 5, 5, 0, Math.PI * 2);
      this.ctx.fill();
      this.positions.left.push({ word: this.leftItems[i], x: 150, y: y - 5 });

      this.ctx.fillStyle = 'black';
      this.ctx.fillText(this.rightItems[i], 700, y);
      this.ctx.beginPath();
      this.ctx.arc(670, y - 5, 5, 0, Math.PI * 2);
      this.ctx.fill();
      this.positions.right.push({ word: this.rightItems[i], x: 670, y: y - 5 });
    }

    this.drawStoredLines();
  }

  drawStoredLines() {
    for (let line of this.matches) {
      this.ctx.beginPath();
      this.ctx.moveTo(line.x1, line.y1);
      this.ctx.lineTo(line.x2, line.y2);
      this.ctx.strokeStyle = line.correct ? 'green' : 'red';
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
  }

  getCoordinates(event: MouseEvent | TouchEvent) {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    let clientX = 0, clientY = 0;

    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDrawing = true;
    this.start = this.getCoordinates(event);
    this.current = { ...this.start };
  }

  drawTempLine(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    this.current = this.getCoordinates(event);
    this.drawLetters();
    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.lineTo(this.current.x, this.current.y);
    this.ctx.strokeStyle = 'gray';
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }

  endDrawing(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
  
    // Use last known position (this.current) for touch as touchend has no touches
    const end = event instanceof TouchEvent ? this.current : this.getCoordinates(event);
  
    const startBullet = this.findClosestBullet(this.start, this.positions.left);
    const endBullet = this.findClosestBullet(end, this.positions.right);
  
    if (startBullet && endBullet) {
      const correct = startBullet.word === endBullet.word;
      this.matches.push({
        x1: startBullet.x,
        y1: startBullet.y,
        x2: endBullet.x,
        y2: endBullet.y,
        correct
      });
    }
  
    this.drawLetters(); // redraw including lines
  }
  

  findClosestBullet(point: { x: number, y: number }, options: any[]) {
    for (let opt of options) {
      const dist = Math.hypot(point.x - opt.x, point.y - opt.y);
      if (dist < 15) return opt;
    }
    return null;
  }

  clearCanvas() {
    this.matches = [];
    this.drawLetters();
  }
}
