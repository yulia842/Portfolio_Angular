import {
  Component,
  EventEmitter,
  Input,
  ViewChild,
  OnInit,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiServicePortfolio } from '../api-portfolio.service';
import { Project, Skill } from '../portfolio-models';

@Component({
  selector: 'app-portfolio-forms',
  templateUrl: './portfolio-forms.component.html',
  styleUrls: ['./portfolio-forms.component.css'],
})
export class PortfolioFormsComponent implements OnInit {
  @Input() project: any;

  skills: Skill[] = [];

  constructor(private apiServicePortfolio: ApiServicePortfolio) {}

  ngOnInit() {
    this.apiServicePortfolio.get_skills().subscribe((data: Skill[]) => {
      this.skills = data;
    });
  }

  ngOnChanges() {
    console.log(this.project); // This will log 'Data from Sibling 1' when updated from sibling1
  }

  closeModal() {
    const modalDiv = document.getElementById('projectAddModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
  }
}
