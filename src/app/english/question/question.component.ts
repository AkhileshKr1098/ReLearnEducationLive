import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { ConfirmDialogComponent } from '../QuestionType/confirm-dialog/confirm-dialog.component';
import { CorrectBoxComponent } from '../correct-box/correct-box.component';
import { OppsBoxComponent } from '../opps-box/opps-box.component';

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
  isDrawing = false;
  paintedArea = new Set<string>();
  letterBoundingBox!: { x: number; y: number; width: number; height: number };
  paintedPixels = 0;
  colors = ['#FF5733', '#33FF57', '#3357FF', '#F0FF33', '#9B33FF', '#FF33B5', '#33FFF7'];
  isSaveVisible = false;


  QuestionType: string = ''
  AllQuestion: any = []
  CurrentQuestion: any
  base_url: string = ''
  filledWord: string = '';
  audio: HTMLAudioElement | null = null;

  constructor(
    private _crud: CRUDService,
    private dialog: MatDialog
  ) {
    this._crud.img_base_url.subscribe(
      (res) => {
        this.base_url = res
      }
    )
    this._crud.getQuestion().subscribe(
      (res) => {
        this.AllQuestion = res
        this.NextQuestion()
      }
    )
  }

  i = 0


  selectOption(option: string) {
    this.filledWord = option;
    console.log(this.filledWord)
  }

  resetSelection() {
    this.filledWord = '';
  }




  NextQuestion() {
    this.filledWord = ''
    if (this.i < this.AllQuestion.length - 1) {
      this.i++;
    } else {
      this.i = 0;
    }
    this.CurrentQuestion = this.AllQuestion[this.i];
    this.QuestionType = this.CurrentQuestion.question_type
    console.log(this.CurrentQuestion)
  }

  CheckCorrect() {
    if (this.QuestionType == 'BlendWords') {
      if (this.CurrentQuestion?.Answer == this.filledWord) {
        this.onCorrect()
      } else {
        this.onOops()
      }
    }



  }

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.startPainting();
    this.setupCanvasEvents();
  }

  startPainting(): void {
    this.paintedPixels = 0;
    this.paintedArea.clear();
    this.drawLetter(this.currentLetter);
    this.isSaveVisible = false;
  }

  drawLetter(letter: string): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.font = '200px bold Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
    this.calculateBoundingBox();
  }

  calculateBoundingBox(): void {
    const canvas = this.canvasRef.nativeElement;
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const idx = (y * canvas.width + x) * 4;
        if (imageData.data[idx + 3] > 0) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    this.letterBoundingBox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
  }

  paintLetter(event: MouseEvent | TouchEvent): void {
    if (!this.isDrawing) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mouseX = ('touches' in event ? event.touches[0].clientX : event.clientX) - rect.left;
    const mouseY = ('touches' in event ? event.touches[0].clientY : event.clientY) - rect.top;

    if (
      mouseX >= this.letterBoundingBox.x && mouseX <= this.letterBoundingBox.x + this.letterBoundingBox.width &&
      mouseY >= this.letterBoundingBox.y && mouseY <= this.letterBoundingBox.y + this.letterBoundingBox.height
    ) {
      const position = `${Math.floor(mouseX)},${Math.floor(mouseY)}`;
      if (!this.paintedArea.has(position)) {
        this.paintedArea.add(position);
        this.paintedPixels++;
        this.ctx.beginPath();
        this.ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.ctx.fill();
      }
    }

    if (this.paintedPixels >= 50) {
      this.isSaveVisible = true;
    }
  }

  setupCanvasEvents(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.addEventListener('mousedown', () => this.isDrawing = true);
    canvas.addEventListener('mouseup', () => this.isDrawing = false);
    canvas.addEventListener('mousemove', (event) => this.paintLetter(event));
    canvas.addEventListener('touchstart', () => this.isDrawing = true);
    canvas.addEventListener('touchend', () => this.isDrawing = false);
    canvas.addEventListener('touchmove', (event) => this.paintLetter(event));
  }

  saveCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${this.currentLetter}-painting.png`;
    link.click();
  }


  onMouseUp() {

  }

  onPlayRec(rec: string) {
    console.log(rec)
    const fullUrl = this.base_url + rec
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio(fullUrl);
    this.audio.play();

    this.isSaveVisible = true
  }

  onCorrect() {
    const dilogclosed = this.dialog.open(CorrectBoxComponent, {
      disableClose: true,
      width: "40vw",
      height: "90vh"
    });

    dilogclosed.afterClosed().subscribe(
      (res) => {
        console.log(res)
        if (res == 'next') {
          this.NextQuestion()
        }
      }
    )
  }

  onOops() {
    const oopsDilog = this.dialog.open(OppsBoxComponent, {
      disableClose: true,
      width: "40vw",
      height: "90vh"
    });
    oopsDilog.afterClosed().subscribe(
      (res) => {
        console.log(res)

      }
    )

  }



}
