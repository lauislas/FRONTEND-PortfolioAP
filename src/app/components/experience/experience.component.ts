import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experience } from 'src/app/models/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  title = "Experiencia";
  experiencesList: Experience[];
  experienceForm: FormGroup;
  experienceFormEdit: FormGroup;

  constructor(private service: ExperienceService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.experienceForm = this.formBuilder.group({
      id: [''],
      empresa: [''],
      puesto: [''],
      inicio: [''],
      fin: [''],
      img: [''],
      resumen: ['']
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.editForm();
  }

  private editForm() {
    this.experienceFormEdit = this.formBuilder.group({
      id: [''],
      empresa: [''],
      puesto: [''],
      inicio: [''],
      fin: [''],
      img: [''],
      resumen: ['']
    });
  }

  public getAll(): void {
    this.service.getExperience().subscribe(data => {
      this.experiencesList = data.reverse();
    });
  }

  public openModal(content: any): void {
    this.modalService.open(content);
  }

  public onSubmit(): void {
    this.service.addExperience(this.experienceForm.value).subscribe(data => {
      this.getAll();
      this.experienceForm.reset();
    });
  }

  public openModalEdit(experience: Experience, contentEdit: any): void {
    this.modalService.open(contentEdit);
    this.experienceFormEdit.patchValue(experience);
  }

  public updateSelected(): void {
    this.service.updateExperience(this.experienceFormEdit.value).subscribe(data => {
      this.getAll();
    });
  }

  public deleteSelected(id: number): void {
    Swal.fire({
      text: "¿Desea eliminar esta experiencia laboral?",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })
      .then(result => {
        if (result.value) {
          this.service.deleteExperience(id).subscribe(data => {
            this.getAll();
          });

        }
      });
  }
}
