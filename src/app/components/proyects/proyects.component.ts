import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyects } from 'src/app/models/proyects';
import { ProyectsService } from 'src/app/services/proyects.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {
  title: string = "Proyectos";
  proyectsList: Proyects[];
  proyectForm: FormGroup;
  proyectFormEdit: FormGroup;


  constructor(private service: ProyectsService, private modalService: NgbModal, private formBuilder: FormBuilder) {
    this.proyectForm = this.formBuilder.group({
      id: [''],
      img: [''],
      resumen: [''],
      urlProyecto: [''],
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.editForm();
  }


  private editForm() {
    this.proyectFormEdit = this.formBuilder.group({
      id: [''],
      img: [''],
      resumen: [''],
      urlProyecto: [''],
    });
  }

  public getAll(): void {
    this.service.getProyect().subscribe(data => {
      this.proyectsList = data.reverse();
    });
  }

  public openModal(content: any): void {
    this.modalService.open(content);
  }

  public onSubmit(): void {
    this.service.addProyect(this.proyectForm.value).subscribe(data => {
      this.getAll();
      this.proyectForm.reset();
    });
  }

  public openModalEdit(proyect: Proyects, contentEdit: any): void {
    this.modalService.open(contentEdit);
    this.proyectFormEdit.patchValue(proyect);
  }

  public updateSelected(): void {
    this.service.updateProyect(this.proyectFormEdit.value).subscribe(data => {
      this.getAll();
    });
  }

  public deleteSelected(id: number): void {
    Swal.fire({
      text: "¿Desea eliminar este proyecto?",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.value) {
        this.service.deleteProyect(id).subscribe(data => {
          this.getAll();
        });

      }
    });
  }
}
