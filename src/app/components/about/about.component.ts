import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { About } from 'src/app/models/about';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutInfo: About[];
  aboutFormEdit: FormGroup;

  constructor(private service: AboutService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAll();
    this.editForm();
  }

  private editForm() {
    this.aboutFormEdit = this.formBuilder.group({
      id: [''],
      nombreCompleto: [''],
      titulo: [''],
      ciudad: [''],
      resumen: [''],
      img: ['']
    });
  }

  public getAll(): void {
    this.service.getAbout().subscribe(data => {
      this.aboutInfo = data;
    });
  }

  public openModalEdit(about: About, contentEdit: any): void {
    this.modalService.open(contentEdit);
    this.aboutFormEdit.patchValue(about);
  }

  public updateSelected(): void {
    this.service.updateAbout(this.aboutFormEdit.value).subscribe(data => {
      this.getAll();
    });
  }
}
