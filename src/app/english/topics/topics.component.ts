import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  base_url: string = ''

  constructor(
    private _router: Router,
    private _crud: CRUDService
  ) {

    this.ongetTopics()
    this._crud.img_base_url.subscribe(
      (res) => (
        this.base_url = res
      )
    )
  }

  topics_list: any


  ongetTopics() {
    this._crud.getTopics().subscribe(
      (res) => {
        console.log(res.data)
        this.topics_list = res.data
      }
    )
  }

  onQuestion(day: any) {
    console.log(day)
    this._router.navigate(['/english/question'])
  }
}
