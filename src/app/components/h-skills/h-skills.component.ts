import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hskills } from 'src/app/models/h-skills';
import { HSkillsService } from 'src/app/services/h-skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-h-skills',
  templateUrl: './h-skills.component.html',
  styleUrls: ['./h-skills.component.css']
})
export class HSkillsComponent implements OnInit {

  title = "Conocimientos";
  hSkillsList: Hskills[];
  hSkillForm: FormGroup;
  hSkillFormEdit: FormGroup;

  constructor(private service: HSkillsService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.hSkillForm = this.formBuilder.group({
      id: [''],
      conocimiento: [''],
      porcentaje: [''],

    });
  }

  ngOnInit(): void {
    this.getAll();
    this.editForm();
  }

  private editForm() {
    this.hSkillFormEdit = this.formBuilder.group({
      id: [''],
      conocimiento: [''],
      porcentaje: [''],
    });
  }

  public getAll(): void {
    this.service.getHSkill().subscribe(data => {
      this.hSkillsList = data.reverse();
    });
  }

  public openModal(content: any): void {
    this.modalService.open(content);
  }

  public onSubmit(): void {
    this.service.addHSkill(this.hSkillForm.value).subscribe(data => {
      this.getAll();
      this.hSkillForm.reset();
    });
  }

  public openModalEdit(hskill: Hskills, contentEdit: any): void {
    this.modalService.open(contentEdit);
    this.hSkillFormEdit.patchValue(hskill);
  }

  public updateSelected(): void {
    this.service.updateHSkill(this.hSkillFormEdit.value).subscribe(data => {
      this.getAll();
    });
  }

  public deleteSelected(id: number): void {
    Swal.fire({
      text: "¿Desea eliminar este conocimiento?",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        this.service.deleteHSkill(id).subscribe(data => {
          this.getAll();
        });
      }
    })
  }
}
