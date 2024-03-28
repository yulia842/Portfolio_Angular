import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog } from '@angular/material/dialog';

import { ApiServicePortfolio } from '../api-portfolio.service';

import { Project, Skill } from 'src/app/portfolio/portfolio-models';
import { PortfolioFormsComponent } from '../portfolio-forms/portfolio-forms.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  selectedProject: { [projectId: number]: number } = {};
  projects: Array<Project> = [];
  skills: Array<Skill> = [];

  @Output() chosenProject = new EventEmitter<Project>();

  constructor(
    private apiService: ApiServicePortfolio,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.apiService.get_projects().subscribe(
      (data: any) => {
        this.projects = data;
      },
      (error) => console.log(error)
    );
  }

  rateHover(rate: number, projectId: number) {
    this.selectedProject[projectId] = rate;
  }

  rateEnter(rate: number, projectId: number) {
    this.selectedProject[projectId] = projectId;
    this.apiService
      .rate_project(rate, this.selectedProject[projectId])
      .subscribe(
        (updatedProject: Project) => {
          this.apiService
            .get_project(this.selectedProject[projectId])
            .subscribe(
              (fetchedProject: Project) => {
                const index = this.projects.findIndex(
                  (p) => p.id === fetchedProject.id
                );
                this.projects[index] = fetchedProject;
              },
              (error) => console.log(error)
            );
        },
        (error) => console.log(error)
      );
  }

  getSkillName(skillIds: any[]) {
    return skillIds
      .map((skillId) => {
        const skill = this.skills.find((s: any) => s.id === skillId);
        return skill ? skill.name : 'None';
      })
      .join(', ');
  }

  openModalForms(project: Project) {
    console.log(project);
    const dialogRef = this.dialog.open(PortfolioFormsComponent, {
      data: { project: this.chosenProject.emit(project) },
      height: '400px',
      width: '600px',
    });
  }
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   this.chosenProject.emit(project) = result;
  // });
}
