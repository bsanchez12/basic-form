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
    public autor_list: Option[];
    public category_list: Option[];
    
    constructor() { }

    public ngOnInit() {
      this.form = {
        name: '',
        description: '',
        autor_id: 0,
        category_id: 0,
        ISBN: ''        
      };  
      
      fetch('http://localhost:2000/parlo-backend-dev/api/v1/configuration/autor/', {
        method: 'GET'        
      })
     .then((result) => {
       if(result.status === 200){
         return result.json();
       }else if(result.status === 401){
         console.log('Error en servicio');
       }
      }).then((jsonResult) => {
        var lst = [];
        jsonResult.map(p => {          
          var book_item = {id: p.IdAutor, description: p.Nombre};
          lst.push(book_item);
        });
        this.autor_list = lst;
        console.log(jsonResult);
      }).catch((error)=>{
        console.log(error);
      });

      fetch('http://localhost:2000/parlo-backend-dev/api/v1/configuration/category/', {
        method: 'GET'        
      })
     .then((result) => {
       if(result.status === 200){
         return result.json();
       }else if(result.status === 401){
         console.log('Error en servicio');
       }
      }).then((jsonResult) => {
        var lst = [];
        jsonResult.map(p => {          
          var book_item = {id: p.IdCategoria, description: p.Nombre};
          lst.push(book_item);
        });
        this.category_list = lst;
        console.log(jsonResult);
      }).catch((error)=>{
        console.log(error);
      });                 
    }

    public saveBook() {    
      console.log(this.form);  
      var header = { 'Accept': 'application/json',
                   'Content-Type':'application/json'                   
                  };
      var current_date = new Date();
      var request = { 'Nombre': this.form.name, 'Descripcion': this.form.description, 'IdAutor': this.form.autor_id,
                      'IdCategoria': this.form.category_id, 'ISBN': this.form.ISBN, 'FechaCreacion': current_date};
      fetch('http://localhost:2000/parlo-backend-dev/api/v1/configuration/book/', {
        method: 'POST',
        headers: header,
        body: JSON.stringify(request)        
      })
     .then((result) => {
       if(result.status === 200){
         return result.json();
       }else if(result.status === 401){
         console.log('Error en servicio');
       }
      }).then((jsonResult) => {        
        console.log(jsonResult);
      }).catch((error)=>{
        console.log(error);
      });  
    }
}
