import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent {
  constructor(
    private _router: Router,
    private _crud: CRUDService
  ) {

    this.ongetTopics()
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
    this._router.navigate(['/english/unit'])
  }
}
