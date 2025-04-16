import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CRUDService } from 'src/app/crud.service';
import { QuestionData } from 'src/app/interface/Question.interface';
import { CorrectBoxComponent } from '../../correct-box/correct-box.component';
import { MatDialog } from '@angular/material/dialog';
import { OppsBoxComponent } from '../../opps-box/opps-box.component';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-letter-tracking',
  templateUrl: './letter-tracking.component.html',
  styleUrls: ['./letter-tracking.component.scss']
})
export class LetterTrackingComponent implements AfterViewInit {
  @Input() CurrentQyt!: QuestionData;
  @ViewChild('letterCanvas', { static: false }) canvasRef!: ElementRef;
  currentCharacter = new BehaviorSubject<string>('A');
  ctx!: CanvasRenderingContext2D;
  characters: string[] = [];
  colors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#F0FF33', '#9B33FF', '#FF33B5', '#33FFF7'];
  isDrawing: boolean = false;
  paintedArea: Set<string> = new Set();
  paintedPixels = 0;
  isSaveVisible = false;
  QuestionType: string = 'LetterTracing';
  AllQuestion: QuestionData[] = [];
  base_url: string = '';
  filledWord: string = '';
  audio: HTMLAudioElement | null = null;
  imageData: string = '';
  i = 0;

  constructor(
    private _crud: CRUDService,
    private dialog: MatDialog,
    private _shared: SharedService
  ) { }

  ngOnInit() {
    this.populateCharacters();
  }

  ngAfterViewInit() {
    this.startPainting();
    this.currentCharacter.next(String(this.CurrentQyt.OptionA))
  }

  populateCharacters() {
    for (let i = 65; i <= 90; i++) this.characters.push(String.fromCharCode(i));
    for (let i = 97; i <= 122; i++) this.characters.push(String.fromCharCode(i));
    for (let i = 48; i <= 57; i++) this.characters.push(String.fromCharCode(i));
  }

  startPainting() {
    this.paintedPixels = 0;
    this.paintedArea.clear();
    this.drawCharacter();
    this.isSaveVisible = false;
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
    event.preventDefault();
    this.isDrawing = true;
    this.paintCharacter(event);
  }

  stopDrawing(event?: MouseEvent | TouchEvent) {
    if (event) event.preventDefault();
    this.isDrawing = false;
  }

  paintCharacter(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing) return;
    event.preventDefault();

    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const mouseX = 'touches' in event ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
    const mouseY = 'touches' in event ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
    const position = `${Math.floor(mouseX)},${Math.floor(mouseY)}`;

    if (!this.paintedArea.has(position)) {
      this.paintedArea.add(position);
      this.paintedPixels++;
      this.ctx.beginPath();
      this.ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2);
      this.ctx.fillStyle = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.ctx.fill();
    }

    if (this.paintedPixels >= 100) {
      this.isSaveVisible = true;
    }
  }

  saveCanvas() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.imageData = canvas.toDataURL("image/png");
    this.uploadToServer(this.imageData);
    this.onCorrect();
  }

  uploadToServer(imageBase64: string) {
    const byteCharacters = atob(imageBase64.split(',')[1]);
    const byteNumbers = Array.from(byteCharacters).map(c => c.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const imageBlob = new Blob([byteArray], { type: 'image/png' });
    const file = new File([imageBlob], 'uploaded_image.png', { type: 'image/png' });

    const formData = new FormData();
    formData.append('std_id', '123');
    formData.append('question_id', '456');
    formData.append('answer_status', '1');
    formData.append('answer_image', file);

    this._crud.Add_answers_api(formData).subscribe(
      (res) => console.log(res),
      (error) => console.error('Error uploading the image:', error)
    );
  }

  selectOption(option: string) {
    this.filledWord = option;
    this.isSaveVisible = true;
  }

  resetSelection() {
    this.filledWord = '';
  }

  CheckCorrect() {
    this.isSaveVisible = false;
  }

  onCorrect() {
    const dilogclosed = this.dialog.open(CorrectBoxComponent, {
      disableClose: true,
      width: "40vw",
      height: "90vh"
    });

    dilogclosed.afterClosed().subscribe((res) => {
      if (res == 'next') {
        this._shared.CurrentQuestionStatus.next(true)
      }
    });
  }

  onOops() {
    const oopsDilog = this.dialog.open(OppsBoxComponent, {
      disableClose: true,
      width: "40vw",
      height: "90vh"
    });

    oopsDilog.afterClosed().subscribe((res) => {
      if (res == 'next') {
        // this.NextQuestion();
      }
    });
  }
}
