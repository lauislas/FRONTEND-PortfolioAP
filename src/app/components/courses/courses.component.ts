import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Courses } from 'src/app/models/courses';
import { CoursesService } from 'src/app/services/courses.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  title = "Cursos";
  coursesList: Courses[];
  courseForm: FormGroup;
  courseFormEdit: FormGroup;

  constructor(private service: CoursesService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.courseForm = this.formBuilder.group({
      id: [''],
      titulo: [''],
      institucion: [''],
      inicio: [''],
      fin: [''],
      img: [''],
      urlCredencial: ['']
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.editForm();
  }

  private editForm() {
    this.courseFormEdit = this.formBuilder.group({
      id: [''],
      titulo: [''],
      institucion: [''],
      inicio: [''],
      fin: [''],
      img: [''],
      urlCredencial: ['']
    });
  }

  public getAll(): void {
    this.service.getCourse().subscribe(data => {
      this.coursesList = data.reverse();
    });
  }

  public openModal(content: any): void {
    this.modalService.open(content);
  }

  public onSubmit(): void {
    this.service.addCourse(this.courseForm.value).subscribe(data => {
      this.getAll();
      this.courseForm.reset();
    });
  }

  public openModalEdit(course: Courses, contentEdit: any): void {
    this.modalService.open(contentEdit);
    this.courseFormEdit.patchValue(course);
  }

  public updateSelected(): void {
    this.service.updateCourse(this.courseFormEdit.value).subscribe(data => {
      this.getAll();
    });
  }

  public deleteSelected(id: number): void {
    Swal.fire({
      text: "¿Desea eliminar este curso?",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        this.service.deleteCourse(id).subscribe(data => {
          this.getAll();
        });
      }
    })
  }
}