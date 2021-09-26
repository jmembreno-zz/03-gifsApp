import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //Esto es para que angular maneje este servicio a nivel global sin necesidad de agragarlo a ningun modulo
})
export class GifsService {

  private apiKey: string = 'upAiLlEj6Z7RQeBiEMAq7geKpZX4JAwy';
  private _historial: string[] = [];

  //TODO: Cambiar Any por su tipo correspondiente
  public resultados:Gif[]=[];

  get historial(): any[] {

    return [...this._historial]; //Ropiendo la referencia con el operador spread
  }

  constructor(private http:HttpClient){}

  buscargifs(query: string = '') {

    

    console.log('query',query)

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {

      this._historial.unshift(query); //Inserta el nuevo elemento al principio del arreglo mientras push lo manda al final
      this._historial = this._historial.splice(0, 10);//con splice el arreglo no tendra mas de 10 elementos

    }

    /* fetch('http://api.giphy.com/v1/gifs/search?api_key=upAiLlEj6Z7RQeBiEMAq7geKpZX4JAwy&q=dragon ball z&limit=10')
      .then(resp => {
        resp.json().then(data => {
          console.log(data);
        })
      }) */

      this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=upAiLlEj6Z7RQeBiEMAq7geKpZX4JAwy&q= ${query} &limit=10`)
      .subscribe((resp) =>{

        console.log(resp.data);

        this.resultados = resp.data;

        

      });
  }



}
