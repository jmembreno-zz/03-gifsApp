import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {



  constructor(private gifservice:GifsService) { }

  get historial() {
    return this.gifservice.historial;
  }

buscar(titulo:string){
    this.gifservice.buscargifs(titulo);
}

 
}
