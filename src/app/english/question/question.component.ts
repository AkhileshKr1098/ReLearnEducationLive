import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements AfterViewInit {
  @ViewChild('letterCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  currentLetter: string = 'A';
  isMousePressed = false;
  paintedArea = new Set<string>();
  totalArea = 0;
  letterPath!: ImageData;
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F0FF33', '#9B33FF', '#FF33B5', '#33FFF7'];
  isSaveVisible = false;

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.startPainting();
    this.setupCanvasEvents();
  }

  startPainting(): void {
    this.totalArea = 0;
    this.paintedArea.clear();
    this.drawLetter(this.currentLetter);
    this.isSaveVisible = false;
  }

  drawLetter(letter: string): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.font = '150px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
    this.letterPath = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  paintLetter(event: MouseEvent | TouchEvent): void {
    let mouseX: number, mouseY: number;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();

    if (event instanceof MouseEvent) {
      if (!this.isMousePressed) return;
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    } else if (event instanceof TouchEvent) {
      event.preventDefault();
      const touch = event.touches[0];
      mouseX = touch.clientX - rect.left;
      mouseY = touch.clientY - rect.top;
    } else {
      return;
    }

    const index = (Math.floor(mouseY) * this.canvasRef.nativeElement.width + Math.floor(mouseX)) * 4;
    const pixelData = this.letterPath.data.slice(index, index + 4);

    if (pixelData[3] > 0) {
      const position = `${mouseX},${mouseY}`;
      if (!this.paintedArea.has(position)) {
        this.paintedArea.add(position);
        this.totalArea++;
        this.ctx.beginPath();
        this.ctx.arc(mouseX, mouseY, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.ctx.fill();
      }
    }

    if (this.totalArea > 150) {
      this.isSaveVisible = true;
    }
  }

  saveCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${this.currentLetter}-painting.png`;
    link.click();
  }

  setupCanvasEvents(): void {
    const canvas = this.canvasRef.nativeElement;

    // Mouse Events
    canvas.addEventListener('mousedown', () => { this.isMousePressed = true; });
    canvas.addEventListener('mouseup', () => { this.isMousePressed = false; });
    canvas.addEventListener('mousemove', (event) => this.paintLetter(event));

    // Touch Events
    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault(); // Prevents scrolling while painting
      this.isMousePressed = true;
    });
    canvas.addEventListener('touchend', () => {
      this.isMousePressed = false;
    });
    canvas.addEventListener('touchmove', (event) => this.paintLetter(event));
  }
}
