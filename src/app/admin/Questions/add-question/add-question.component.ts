import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  questionIMG: any = '../../../../assets/icon/questionimg.jpg'
  questionFile: any
  classe: any[] = [];
  units: any[] = [];
  Topics: any[] = [];
  QuestionForm!: FormGroup;
  questionType: string = '';

  audioURL: string | null = null;
  audio: HTMLAudioElement | null = null;
  listen_rec: any
  constructor(
    private _fb: FormBuilder,
    private _crud: CRUDService,
    private matref: MatDialogRef<AddQuestionComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public edit_data: any
  ) {
    this.QuestionForm = this._fb.group({
      class_id_fk: ['', Validators.required],
      unit_id_fk: ['', Validators.required],
      topics_id_fk: ['', Validators.required],
      question_type: ['', Validators.required],
      Question: ['', Validators.required],
      OptionA: ['', Validators.required],
      OptionB: ['', Validators.required],
      OptionC: ['', Validators.required],
      OptionD: ['', Validators.required],
      Answer: ['', Validators.required],
      incomplete_word: ['', Validators.required],
      id: ['', Validators.required],
      listen_word: ['', Validators.required],
      listen_rec: [],
      LetterMatch: this._fb.array([this.createOptionRow()])

    });
  }

  ngOnInit() {
    if (this.edit_data) {

      this.GetUnit(this.edit_data.class_id_fk);
      this.getTopics(this.edit_data.unit_id_fk);
      this.questionType = this.edit_data.question_type;

      if (this.edit_data.question_type === 'MCQ') {
        console.log(this.edit_data)
        this.QuestionForm.patchValue(this.edit_data);

      }

      if (this.edit_data.question_type === "LetterMatch") {
        console.log(this.edit_data);

        // Clear existing form array data
        this.options.clear();

        // Split data into arrays
        const optionAValues = this.edit_data.OptionA.split(', '); // "A, C, D, B"
        const optionBValues = this.edit_data.OptionB.split(', '); // "Dog, Ball, Apple, Cat"
        const answerValues = this.edit_data.Answer.split(', ');   // "Apple, Cat, Dog, Ball"

        // Loop through data and push into form array
        optionAValues.forEach((optionA: any, index: any) => {
          this.options.push(
            this._fb.group({
              OptionA: [optionA],
              OptionB: [optionBValues[index] || ''],
              Answer: [answerValues[index] || '']
            })
          );
        });
      }

      if (this.edit_data.question_type === "BlendWords") {
        console.log(this.edit_data);
        this.QuestionForm.patchValue(this.edit_data)
        this.questionIMG = this._crud.base_url + this.edit_data.question_Img
      }

    }
    this.onGetClass();
  }

  onQuestionTypeChange(event: any) {
    this.questionType = event.target.value;
    this.cdr.detectChanges(); // Ensures UI updates
  }

  onGetClass() {
    this._crud.getClass().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.classe = res.data;
        }
      }
    );
  }

  onGetUnit(event: any) {
    const class_id = event.target.value;
    this.GetUnit(class_id);
  }

  GetUnit(cls: string) {
    this._crud.getUnitByClass(cls).subscribe(
      (res: any) => {
        this.units = Array.isArray(res.data) ? res.data : [];
      }
    );
  }

  onGetTopics(event: any) {
    const unit = event.target.value;
    this.getTopics(unit);
  }

  getTopics(unit: any) {
    this._crud.getTopicsByunit(unit).subscribe(
      (res: any) => {
        this.Topics = Array.isArray(res.data) ? res.data : [];
      }
    );
  }

  submitForm() {
    if (this.questionType == 'MCQ') {
      this._crud.addQuestion(this.QuestionForm.value).subscribe(
        (res) => {
          alert(res.message);
          if (res.success == 1) {
            this.matref.close(1);
          }
        }
      );
    }

    if (this.questionType == 'LetterMatch') {
      const formData = {
        OptionA: this.options.value.map((row: any) => row.OptionA).join(', '),
        OptionB: this.options.value.map((row: any) => row.OptionB).join(', '),
        Answer: this.options.value.map((row: any) => row.Answer).join(', '),
        Question: this.QuestionForm.get('Question')?.value,
        class_id_fk: this.QuestionForm.get('class_id_fk')?.value,
        unit_id_fk: this.QuestionForm.get('class_id_fk')?.value,
        topics_id_fk: this.QuestionForm.get('topics_id_fk')?.value,
        question_type: this.QuestionForm.get('question_type')?.value,
      };

      console.log(formData)

      this._crud.addQuestion(formData).subscribe(
        (res) => {
          console.log(res)
        }
      );
    }


    if (this.questionType == 'BlendWords') {

      const fromdata = new FormData()
      fromdata.append('class_id_fk', this.QuestionForm.get('class_id_fk')?.value)
      fromdata.append('unit_id_fk', this.QuestionForm.get('unit_id_fk')?.value)
      fromdata.append('topics_id_fk', this.QuestionForm.get('topics_id_fk')?.value)
      fromdata.append('question_type', this.QuestionForm.get('question_type')?.value)
      fromdata.append('Question', this.QuestionForm.get('Question')?.value)
      fromdata.append('OptionA', this.QuestionForm.get('OptionA')?.value)
      fromdata.append('OptionB', this.QuestionForm.get('OptionB')?.value)
      fromdata.append('OptionC', this.QuestionForm.get('OptionC')?.value)
      fromdata.append('OptionD', this.QuestionForm.get('OptionD')?.value)
      fromdata.append('Answer', this.QuestionForm.get('Answer')?.value)
      fromdata.append('incomplete_word', this.QuestionForm.get('incomplete_word')?.value)
      fromdata.append('question_Img', this.questionFile)

      this._crud.addQuestion_picktheblend(fromdata).subscribe(
        (res: any) => {
          console.log(res)
        }
      )
    }
    if (this.questionType == 'BlendWords') {

      const fromdata = new FormData()
      fromdata.append('class_id_fk', this.QuestionForm.get('class_id_fk')?.value)
      fromdata.append('unit_id_fk', this.QuestionForm.get('unit_id_fk')?.value)
      fromdata.append('topics_id_fk', this.QuestionForm.get('topics_id_fk')?.value)
      fromdata.append('question_type', this.QuestionForm.get('question_type')?.value)
      fromdata.append('Question', this.QuestionForm.get('Question')?.value)
      fromdata.append('OptionA', this.QuestionForm.get('OptionA')?.value)
      fromdata.append('OptionB', this.QuestionForm.get('OptionB')?.value)
      fromdata.append('OptionC', this.QuestionForm.get('OptionC')?.value)
      fromdata.append('OptionD', this.QuestionForm.get('OptionD')?.value)
      fromdata.append('Answer', this.QuestionForm.get('Answer')?.value)
      fromdata.append('incomplete_word', this.QuestionForm.get('incomplete_word')?.value)
      fromdata.append('question_Img', this.questionFile)

      this._crud.addQuestion_picktheblend(fromdata).subscribe(
        (res: any) => {
          console.log(res)
        }
      )
    }

    if (this.questionType == 'ListenWords') {

      const fromdata = new FormData()
      fromdata.append('class_id_fk', this.QuestionForm.get('class_id_fk')?.value)
      fromdata.append('unit_id_fk', this.QuestionForm.get('unit_id_fk')?.value)
      fromdata.append('topics_id_fk', this.QuestionForm.get('topics_id_fk')?.value)
      fromdata.append('question_type', this.QuestionForm.get('question_type')?.value)
      fromdata.append('Question', this.QuestionForm.get('Question')?.value)
      fromdata.append('Answer', this.QuestionForm.get('Answer')?.value)
      fromdata.append('listen_word', this.QuestionForm.get('listen_word')?.value)
      fromdata.append('listen_rec', this.listen_rec)
      fromdata.append('question_Img', this.questionFile)

      this._crud.addQuestion_listen(fromdata).subscribe(
        (res: any) => {
          console.log(res)
          alert(res.message)
        }
      )
    }


  }

  updateForm() {
    if (this.questionType == 'MCQ') {
      const data = { ...this.QuestionForm.value };
      this._crud.QuestionUpdate(data).subscribe(
        (res) => {
          alert(res.message);
          if (res.success == 1) {
            this.matref.close(1);
          }
        }
      );
    }

    if (this.questionType == 'LetterMatch') {
      const formData = {
        OptionA: this.options.value.map((row: any) => row.OptionA).join(', '),
        OptionB: this.options.value.map((row: any) => row.OptionB).join(', '),
        Answer: this.options.value.map((row: any) => row.Answer).join(', '),
        Question: this.QuestionForm.get('Question')?.value,
        class_id_fk: this.QuestionForm.get('class_id_fk')?.value,
        unit_id_fk: this.QuestionForm.get('class_id_fk')?.value,
        topics_id_fk: this.QuestionForm.get('topics_id_fk')?.value,
        question_type: this.QuestionForm.get('question_type')?.value,
        OptionC: ".",
        OptionD: ".",
        id: this.QuestionForm.get('id')?.value,
      };

      console.log(formData)

      this._crud.QuestionUpdate(formData).subscribe(
        (res) => {
          console.log(res)
        }
      );
    }

    if (this.questionType == 'BlendWords') {
      const fromdata = new FormData()
      fromdata.append('class_id_fk', this.QuestionForm.get('class_id_fk')?.value)
      fromdata.append('unit_id_fk', this.QuestionForm.get('unit_id_fk')?.value)
      fromdata.append('topics_id_fk', this.QuestionForm.get('topics_id_fk')?.value)
      fromdata.append('question_type', this.QuestionForm.get('question_type')?.value)
      fromdata.append('Question', this.QuestionForm.get('Question')?.value)
      fromdata.append('OptionA', this.QuestionForm.get('OptionA')?.value)
      fromdata.append('OptionB', this.QuestionForm.get('OptionB')?.value)
      fromdata.append('OptionC', this.QuestionForm.get('OptionC')?.value)
      fromdata.append('OptionD', this.QuestionForm.get('OptionD')?.value)
      fromdata.append('Answer', this.QuestionForm.get('Answer')?.value)
      fromdata.append('id', this.QuestionForm.get('id')?.value)
      fromdata.append('incomplete_word', this.QuestionForm.get('incomplete_word')?.value)
      if (this.questionFile) {
        fromdata.append('question_Img', this.questionFile)
      }

      this._crud.QuestionUpdat_picktheblend(fromdata).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status == 'success') {
            alert(res.message)
            this.matref.close()
          }
        }
      )
    }

  }

  get options() {
    return this.QuestionForm.get('LetterMatch') as FormArray;
  }

  createOptionRow(): FormGroup {
    return this._fb.group({
      OptionA: [''],
      OptionB: [''],
      Answer: ['']
    });
  }

  addRow() {
    if (this.options.length < 5) {
      this.options.push(this.createOptionRow());
    }
  }

  onFileChange(event: any) {
    this.questionFile = event.target.files[0];
    if (this.questionFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.questionIMG = reader.result;
      };
      reader.readAsDataURL(this.questionFile);
    }
  }

  onAudioChange(event: any) {
    this.listen_rec = event.target.files[0];
    if (this.listen_rec) {
      const reader = new FileReader();
      reader.onload = () => {
        this.audioURL = reader.result as string;
      };
      reader.readAsDataURL(this.listen_rec);
    }
  }

  playAudio() {
    if (this.audioURL) {
      if (this.audio) {
        this.audio.pause();
      }
      this.audio = new Audio(this.audioURL);
      this.audio.play();
    }
  }

}
