import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { Class, ClassRes, Day, Sections, SubTopic, Topics, TopicsRes, Week } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  questionIMG: any = '../../../../assets/icon/questionimg.jpg'
  questionFile: any
  sections: Sections[] = []
  Classes: Class[] = []
  weeks: Week[] = []
  days: Day[] = []
  topics: Topics[] = []
  subTopics: SubTopic[] = []
  units: any[] = []

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
      class: ['', Validators.required],
      week: ['', Validators.required],
      day: ['', Validators.required],
      sections: ['', Validators.required],
      topics: ['', Validators.required],
      sub_topics: ['', Validators.required],
      unit: ['', Validators.required],
      question_type: ['', Validators.required],
      Question: ['', Validators.required],
      OptionA: [''],
      OptionB: [''],
      OptionC: [''],
      OptionD: [''],
      Answer: [''],
      incomplete_word: [''],
      id: [''],
      listen_word: [''],
      listen_rec: [],
      LetterMatch: this._fb.array([this.createOptionRow()])

    });
  }

  ngOnInit() {
    this.getClass()
    this.getWeeks()
    this.getDayS()
    this.getTopics()
    this.getSubTopics()
    this.getSection()
    this.getUnit()

    if (this.edit_data) {
      this.questionType = this.edit_data.question_type;
      if (this.edit_data.question_type === 'MCQ') {
        console.log(this.edit_data)
        this.QuestionForm.patchValue(this.edit_data);

      }

      if (this.edit_data.question_type === "LetterMatch") {
        console.log(this.edit_data);
        this.options.clear();

        const optionAValues = this.edit_data.OptionA.split(', ');
        const optionBValues = this.edit_data.OptionB.split(', ');
        const answerValues = this.edit_data.Answer.split(', ');

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

      if (this.edit_data.question_type === "ListenWords") {
        console.log(this.edit_data);
        this.QuestionForm.patchValue(this.edit_data)
        this.questionIMG = this._crud.base_url + this.edit_data.question_Img
        this.audioURL = this._crud.base_url + this.edit_data.listen_rec
      }

    }
  }


  // for defult type 
  getClass() {
    this._crud.getClass().subscribe(
      (res: ClassRes) => {
        if (Array.isArray(res.data)) {
          this.Classes = res.data
        }
      }
    )
  }

  getWeeks() {
    this._crud.getWeek().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.weeks = res.data
        }
      }
    )
  }

  getDayS() {
    this._crud.getDays().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.days = res.data
        }
      }
    )
  }

  getSection() {
    this._crud.getsections().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.sections = res.data
        }
      }
    )
  }

  getTopics() {
    this._crud.getTopics().subscribe(
      (res: TopicsRes) => {
        if (Array.isArray(res.data)) {
          this.topics = res.data
        }
      }
    )
  }

  getSubTopics() {
    this._crud.getSubTopics().subscribe(
      (res) => {
        if (Array.isArray(res.data)) {
          this.subTopics = res.data
        }
      }
    )
  }

  getUnit() {
    this._crud.getUnit().subscribe(
      (res) => {
        this.units = Array.isArray(res.data) ? res.data : [];
      }
    )
  }

  onQuestionTypeChange(event: any) {
    this.questionType = event.target.value;
    this.cdr.detectChanges();
  }


  submitForm() {
    if (this.QuestionForm.invalid) {
      alert('Please fill all the requred filds ..!')
      return
    }

    if (this.questionType == 'MCQ') {
      this._crud.addQuestion(this.QuestionForm.value).subscribe(
        (res) => {
          alert(res.message);
          if (res.success == 1) {
            // this.matref.close(1);
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
      fromdata.append('class', this.QuestionForm.get('class')?.value)
      fromdata.append('week', this.QuestionForm.get('week')?.value)
      fromdata.append('day', this.QuestionForm.get('day')?.value)
      fromdata.append('sections', this.QuestionForm.get('sections')?.value)
      fromdata.append('topics', this.QuestionForm.get('topics')?.value)
      fromdata.append('sub_topics', this.QuestionForm.get('sub_topics')?.value)
      fromdata.append('unit', this.QuestionForm.get('unit')?.value)
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
          alert(res.message);

        }
      )
    }


    if (this.questionType == 'ListenWords') {
      const fromdata = new FormData()
      fromdata.append('class', this.QuestionForm.get('class')?.value)
      fromdata.append('week', this.QuestionForm.get('week')?.value)
      fromdata.append('day', this.QuestionForm.get('day')?.value)
      fromdata.append('sections', this.QuestionForm.get('sections')?.value)
      fromdata.append('topics', this.QuestionForm.get('topics')?.value)
      fromdata.append('sub_topics', this.QuestionForm.get('sub_topics')?.value)
      fromdata.append('unit', this.QuestionForm.get('unit')?.value)
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

    if (this.questionType == 'LetterTracing') {
      const formData = {
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



  }

  updateForm() {

    if (this.questionType == 'MCQ') {
      console.log(this.QuestionForm.value);
      const data = {
        "id": this.QuestionForm.get('id')?.value,
        "question_type": this.QuestionForm.get('question_type')?.value,
        "Question": this.QuestionForm.get('Question')?.value,
        "OptionA": this.QuestionForm.get('OptionA')?.value,
        "OptionB": this.QuestionForm.get('OptionB')?.value,
        "OptionC": this.QuestionForm.get('OptionC')?.value,
        "OptionD": this.QuestionForm.get('OptionD')?.value,
        "Answer": this.QuestionForm.get('Answer')?.value,
        "class": this.QuestionForm.get('class')?.value,
        "week": this.QuestionForm.get('week')?.value,
        "day": this.QuestionForm.get('day')?.value,
        "sections": this.QuestionForm.get('sections')?.value,
        "topics": this.QuestionForm.get('topics')?.value,
        "sub_topics": this.QuestionForm.get('sub_topics')?.value,
        "unit": this.QuestionForm.get('unit')?.value,
        "incomplete_word": this.QuestionForm.get('incomplete_word')?.value,
        "listen_rec": this.QuestionForm.get('listen_rec')?.value,
        "listen_word": this.QuestionForm.get('listen_word')?.value
      };

      this._crud.QuestionUpdate(data).subscribe(
        (res) => {
          alert(res.message);
          if (res.success == 1) {
            // this.matref.close(1);
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

      fromdata.append('id', this.QuestionForm.get('id')?.value)
      fromdata.append('class', this.QuestionForm.get('class')?.value)
      fromdata.append('week', this.QuestionForm.get('week')?.value)
      fromdata.append('day', this.QuestionForm.get('day')?.value)
      fromdata.append('sections', this.QuestionForm.get('sections')?.value)
      fromdata.append('topics', this.QuestionForm.get('topics')?.value)
      fromdata.append('sub_topics', this.QuestionForm.get('sub_topics')?.value)
      fromdata.append('unit', this.QuestionForm.get('unit')?.value)
      fromdata.append('question_type', this.QuestionForm.get('question_type')?.value)
      fromdata.append('Question', this.QuestionForm.get('Question')?.value)
      fromdata.append('OptionA', this.QuestionForm.get('OptionA')?.value)
      fromdata.append('OptionB', this.QuestionForm.get('OptionB')?.value)
      fromdata.append('OptionC', this.QuestionForm.get('OptionC')?.value)
      fromdata.append('OptionD', this.QuestionForm.get('OptionD')?.value)
      fromdata.append('Answer', this.QuestionForm.get('Answer')?.value)
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


    if (this.questionType == 'ListenWords') {
      const fromdata = new FormData()
      fromdata.append('id', this.QuestionForm.get('id')?.value)
      fromdata.append('class', this.QuestionForm.get('class')?.value)
      fromdata.append('week', this.QuestionForm.get('week')?.value)
      fromdata.append('day', this.QuestionForm.get('day')?.value)
      fromdata.append('sections', this.QuestionForm.get('sections')?.value)
      fromdata.append('topics', this.QuestionForm.get('topics')?.value)
      fromdata.append('sub_topics', this.QuestionForm.get('sub_topics')?.value)
      fromdata.append('unit', this.QuestionForm.get('unit')?.value)
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
