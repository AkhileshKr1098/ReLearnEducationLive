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
    this.ctx.font = 'bold 200px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
    this.letterPath = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  paintLetter(x: number, y: number): void {
    const index = (Math.floor(y) * this.canvasRef.nativeElement.width + Math.floor(x)) * 4;
    const pixelData = this.letterPath.data.slice(index, index + 4);

    if (pixelData[3] > 0) {
      const position = `${x},${y}`;
      if (!this.paintedArea.has(position)) {
        this.paintedArea.add(position);
        this.totalArea++;

        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.ctx.fill();
      }
    }

    if (this.totalArea > 150) {
      this.isSaveVisible = true;
    }
  }

  handleMouseMove(event: MouseEvent): void {
    if (!this.isMousePressed) return;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    this.paintLetter(mouseX, mouseY);
  }

  handleTouchMove(event: TouchEvent): void {
    event.preventDefault();
    requestAnimationFrame(() => {
      const rect = this.canvasRef.nativeElement.getBoundingClientRect();
      for (let i = 0; i < event.touches.length; i++) {
        const touch = event.touches[i];
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
        this.paintLetter(touchX, touchY);
      }
    });
  }

  setupCanvasEvents(): void {
    const canvas = this.canvasRef.nativeElement;

    // Mouse Events
    canvas.addEventListener('mousedown', () => { this.isMousePressed = true; });
    canvas.addEventListener('mouseup', () => { this.isMousePressed = false; });
    canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));

    // Touch Events (Smooth)
    canvas.addEventListener('touchstart', (event) => {
      event.preventDefault(); // Prevents scrolling
      this.isMousePressed = true;
    });
    canvas.addEventListener('touchend', () => { this.isMousePressed = false; });
    canvas.addEventListener('touchmove', (event) => this.handleTouchMove(event));
  }

  saveCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${this.currentLetter}-painting.png`;
    link.click();
  }
}
