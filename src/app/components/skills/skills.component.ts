import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skills } from 'src/app/models/skills';
import { SkillsService } from 'src/app/services/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  title: string = "Habilidades";
  skillsList: Skills[];
  skillForm: FormGroup;
  skillFormEdit: FormGroup;

  constructor(private service: SkillsService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.skillForm = this.formBuilder.group({
      id: [''],
      img: [''],
      informacion: [''],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.editForm();
  }

  private editForm() {
    this.skillFormEdit = this.formBuilder.group({
      id: [''],
      img: [''],
      informacion: [''],
    });
  }

  public getAll(): void {
    this.service.getSkills().subscribe(data => {
      this.skillsList = data.reverse();
    });
  }

  public openModal(content: any): void {
    this.modalService.open(content);
  }

  public onSubmit(): void {
    this.service.addSkill(this.skillForm.value).subscribe(data => {
      this.getAll();
      this.skillForm.reset();
    });
  }

  public openModalEdit(skill: Skills, contentEdit: any): void {
    this.modalService.open(contentEdit);
    this.skillFormEdit.patchValue(skill);
  }

  public updateSelected(): void {
    this.service.updateSkill(this.skillFormEdit.value).subscribe(data => {
      this.getAll();
    });
  }

  public deleteSelected(id: number): void {
    Swal.fire({
      text: "¿Desea eliminar esta habilidad?",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        this.service.deleteSkill(id).subscribe(data => {
          this.getAll();
        });
      }
    })
  }
}
