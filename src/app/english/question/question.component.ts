import { Component, ElementRef, ViewChild, AfterViewInit, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { ConfirmDialogComponent } from '../QuestionType/confirm-dialog/confirm-dialog.component';
import { CorrectBoxComponent } from '../correct-box/correct-box.component';
import { OppsBoxComponent } from '../opps-box/opps-box.component';
import { BehaviorSubject } from 'rxjs';
import { QuestionData } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, AfterViewInit {
  @ViewChild('letterCanvas', { static: false }) canvasRef!: ElementRef;
  currentCharacter = new BehaviorSubject<string>('A')
  ctx!: CanvasRenderingContext2D;
  characters: string[] = [];
  colors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F0FF33', '#9B33FF', '#FF33B5', '#33FFF7'];
  isDrawing: boolean = false;
  paintedArea: Set<string> = new Set();
  paintedPixels = 0;
  showSaveButton = false;

  // for Matching start
  @ViewChild('matchCanvas', { static: true }) McanvasRef!: ElementRef;
  private ctxM!: CanvasRenderingContext2D;
  private isDrawingM = false;
  private startX = 0;
  private startY = 0;
  private lines: { x1: number, y1: number, x2: number, y2: number }[] = [];
  leftItems: Array<string> = [];
  rightItems: Array<string> = [];
  private positions: { left: { x: number, y: number }, right: { x: number, y: number } }[] = [];

  // for Matching end


  isSaveVisible = false;
  QuestionType: string = ''
  AllQuestion: QuestionData[] = []
  CurrentQuestion: any
  base_url: string = ''
  filledWord: string = '';
  audio: HTMLAudioElement | null = null;


  // for report 
  topicsRightPro: number = 0
  topicsWorngPro: number = 0

  constructor(
    private _crud: CRUDService,
    private dialog: MatDialog
  ) {
    this._crud.img_base_url.subscribe(
      (res) => {
        this.base_url = res
      }
    )
  }

  ngOnInit() {
    this._crud.getQuestion().subscribe(
      (res: QuestionData) => {
        console.log(res);
        if (Array.isArray(res)) {
          this.AllQuestion = res
          this.NextQuestion()
        }
      }
    )

    this.startPainting()

  }


  ngAfterViewInit() {
    console.log('question type', this.QuestionType);

    if (this.QuestionType == "LetterTracing") {
      this.populateCharacters();
      this.startPainting();
    }

    if (this.QuestionType == "LetterMatch") {
      const canvas = this.McanvasRef.nativeElement as HTMLCanvasElement;
      this.ctxM = canvas.getContext('2d') as CanvasRenderingContext2D;
      this.drawLettersM();
    }


  }

  i = 0


  selectOption(option: string) {
    this.filledWord = option;
    console.log(this.filledWord)
    this.isSaveVisible = true
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
    this.currentCharacter.next(this.CurrentQuestion.OptionA)
    this.startPainting()
    this.leftItems.push(this.CurrentQuestion.OptionA)
    this.rightItems.push(this.CurrentQuestion.OptionB)
  }

  CheckCorrect() {
    this.isSaveVisible = false
    if (this.QuestionType == 'BlendWords') {
      if (this.CurrentQuestion?.Answer == this.filledWord) {
        this.onCorrect()
      } else {
        this.onOops()
      }
    }

    if (this.QuestionType == 'MCQ') {
      if (this.CurrentQuestion?.Answer == this.filledWord) {
        this.onCorrect()
      } else {
        this.onOops()
      }
    }

  }


  // for letter tracking 
  populateCharacters() {
    for (let i = 65; i <= 90; i++) this.characters.push(String.fromCharCode(i));
    for (let i = 97; i <= 122; i++) this.characters.push(String.fromCharCode(i));
    for (let i = 48; i <= 57; i++) this.characters.push(String.fromCharCode(i));
  }

  startPainting() {
    this.paintedPixels = 0;
    this.paintedArea.clear();
    this.drawCharacter();
    this.showSaveButton = false;
  }

  drawCharacter() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.font = "200px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.currentCharacter.getValue(), canvas.width / 2, canvas.height / 2);
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    this.isDrawing = true;
    this.paintCharacter(event);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  paintCharacter(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;

    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = 'touches' in event ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    const mouseY = 'touches' in event ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

    const position = `${mouseX},${mouseY}`;
    if (!this.paintedArea.has(position)) {
      this.paintedArea.add(position);
      this.paintedPixels++;
      this.ctx.beginPath();
      this.ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
      this.ctx.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.ctx.fill();
    }

    if (this.paintedPixels >= 100) this.isSaveVisible = true;
  }

  imageData: string = ''
  saveCanvas() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.imageData = canvas.toDataURL("image/png");

    console.log("Captured Image:", this.imageData);

    this.uploadToServer(this.imageData);
    this.onCorrect();
  }

  uploadToServer(imageBase64: string) {
    const payload = {
      character: this.currentCharacter,
      image: imageBase64
    };

    const byteCharacters = atob(imageBase64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const imageBlob = new Blob([byteArray], { type: 'image/png' }); // Adjust type if necessary
    const file = new File([imageBlob], 'uploaded_image.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('std_id', '123');
    formData.append('question_id', '456');
    formData.append('answer_status', '1');
    formData.append('answer_image', file); // Attach as a file

    this._crud.Add_answers_api(formData).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error('Error uploading the image:', error);
      }
    );
  }

  // for letter tracking  stop


  // for DrawingMatching
  drawLettersM() {
    const canvas = this.McanvasRef.nativeElement as HTMLCanvasElement;
    this.ctxM.clearRect(0, 0, canvas.width, canvas.height);
    this.ctxM.font = '24px Arial';
    this.ctxM.fillStyle = 'blue';
    this.positions = [];
    for (let i = 0; i < this.leftItems.length; i++) {
      let y = 50 + i * 60;
      this.ctxM.fillText(this.leftItems[i], 50, y);
      this.ctxM.fillText(this.rightItems[i], 700, y);
      this.positions.push({ left: { x: 50, y: y - 10 }, right: { x: 700, y: y - 10 } });
    }
  }

  startDrawingM(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDrawingM = true;
    const { offsetX, offsetY } = this.getCoordinates(event);
    this.startX = offsetX;
    this.startY = offsetY;
  }

  stopDrawingM(event: MouseEvent | TouchEvent) {
    if (!this.isDrawingM) return;
    this.isDrawingM = false;
    const { offsetX, offsetY } = this.getCoordinates(event);
    this.lines.push({ x1: this.startX, y1: this.startY, x2: offsetX, y2: offsetY });
    this.drawLine(this.startX, this.startY, offsetX, offsetY);
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.ctxM.beginPath();
    this.ctxM.moveTo(x1, y1);
    this.ctxM.lineTo(x2, y2);
    this.ctxM.strokeStyle = 'black';
    this.ctxM.lineWidth = 2;
    this.ctxM.stroke();
  }

  clearCanvasM() {
    const canvas = this.McanvasRef.nativeElement as HTMLCanvasElement;
    this.ctxM.clearRect(0, 0, canvas.width, canvas.height);
    this.lines = [];
    this.drawLettersM();
  }

  private getCoordinates(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      return { offsetX: event.offsetX, offsetY: event.offsetY };
    } else {
      const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
      const touch = event.touches[0];
      return { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top };
    }
  }

  paintCharacterM(event: MouseEvent | TouchEvent) {
    if (!this.isDrawingM) return;
    const { offsetX, offsetY } = this.getCoordinates(event);
    this.drawLine(this.startX, this.startY, offsetX, offsetY);
    this.startX = offsetX;
    this.startY = offsetY;
  }


  // for DrawingMatching stop

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
        if (res == 'next') {
          this.NextQuestion()
        }

      }
    )

  }



}
