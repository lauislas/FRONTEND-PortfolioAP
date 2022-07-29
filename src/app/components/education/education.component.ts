import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  title = "Educación";
  educationsList: Education[];
  educationForm: FormGroup;
  educationFormEdit: FormGroup;

  constructor(private service: EducationService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.educationForm = this.formBuilder.group({
      id: [''],
      institucion: [''],
      titulo: [''],
      inicio: [''],
      fin: [''],
      img: ['']
    });
  }

  ngOnInit(): void {
   this.getAll();
   this.editForm();

  }

  private editForm(): void {
    this.educationFormEdit = this.formBuilder.group({
      id: [''],
      institucion: [''],
      titulo: [''],
      inicio: [''],
      fin: [''],
      img: ['']
    });
  }

  public getAll(): void {
    this.service.getEducation().subscribe(data => {
      this.educationsList = data.reverse();
    });
  }
 
  public openModal(content: any): void {
    this.modalService.open(content);
  }
 
  public onSubmit(): void {
    this.service.addEducation(this.educationForm.value).subscribe(data => {
      this.getAll();
      this.educationForm.reset();
    });
  }

  public openModalEdit(education: Education, contentEdit: any): void {
    this.modalService.open(contentEdit);
    this.educationFormEdit.patchValue(education);
  }

  public updateSelected(): void {
    this.service.updateEducation(this.educationFormEdit.value).subscribe(data => {
      this.getAll();
    });
  }

  public deleteSelected(id: number): void {
    Swal.fire({
      text: "¿Desea eliminar esta educación?",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        this.service.deleteEducaction(id).subscribe(data => {
          this.getAll();
        });
      }
    })
  }
}