import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  @ViewChild('txtbuscar') txtbuscar!:ElementRef<HTMLInputElement>; //con el signo de admiracion (Non-null assertion operator) 
                                                 //le digo a typescript que no se preocupe que lo que viene no es null

  constructor(private gifservice: GifsService){}

  buscar(){
    //console.log(this.txtbuscar.nativeElement.value);
    const valor = this.txtbuscar.nativeElement.value;

    if(valor.trim().length === 0){
      return;
    }
    
    this.gifservice.buscargifs(valor);
    this.txtbuscar.nativeElement.value  ='';
  }
}
