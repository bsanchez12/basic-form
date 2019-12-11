import { Component, OnInit } from '@angular/core';
import { Form } from './models/form.model';
import { Option } from './models/option.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {
    public form: Form;
    public contacts: Form[];
    public workStatuses: Option[];
    
    constructor() { }

    public ngOnInit() {
      this.form = {
        name: '',
        isVIP: false,
        gender: '',
        workStatus: 0,
        companyName: '',
        education: ''
      };
      this.contacts = [];
      this.workStatuses = [
        { id: 0, description: 'unknow' },
        { id: 1, description: 'student' },
        { id: 2, description: 'unemployed' },
        { id: 3, description: 'employed' }
      ];
    }

    public saveContact() {
      this.contacts.push({ ...this.form });
      alert('Contacto guardado');
    }
}
