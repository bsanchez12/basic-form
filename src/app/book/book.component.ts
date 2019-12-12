import { Component, OnInit } from '@angular/core';
import { Book } from './model/book.model';
import {Router} from "@angular/router";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styles: []
  })

export class BookComponent implements OnInit {
    constructor(private router: Router) { }
    public data: Book[];

    public ngOnInit() {
        fetch('http://localhost:2000/book/', {
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
              var book_item = {id:p.Id, name: p.Nombre, description: p.Descripcion, autor: p.NombreAutor, category: p.NombreCategoria, 
                ISBN:p.ISBN, creation_date: p.FechaCreacion};
              lst.push(book_item);
            });   
            this.data = lst;     
            console.log(jsonResult);
          }).catch((error)=>{
            console.log(error);
          });        

        this.data = [{id:1, name: 'Nuevo', description: 'nuevo', autor: 'Briam', category: 'supenso', ISBN:'nuevo', creation_date: 'hoy'}];
    }

    public DeleteBook(e) {                 
        fetch('http://localhost:2000/book/?id='+e.data[0].id, {
            method: 'DELETE'        
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

    public UpdateBook(e){                
        this.router.navigate(['/form', e.data[0].id])    
    }

    public CreateBook(e){
        this.router.navigate(['/form'])    
    }
}