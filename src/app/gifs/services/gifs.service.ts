import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //Esto es para que angular maneje este servicio a nivel global sin necesidad de agragarlo a ningun modulo
})
export class GifsService {

  private apiKey: string = 'upAiLlEj6Z7RQeBiEMAq7geKpZX4JAwy';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  //TODO: Cambiar Any por su tipo correspondiente
  public resultados: Gif[] = [];


  get historial(): any[] {

    return [...this._historial]; //Ropiendo la referencia con el operador spread
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('data')!) || [];

    //  if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);

    //  }


  }

  buscargifs(query: string = '') {


    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {

      this._historial.unshift(query); //Inserta el nuevo elemento al principio del arreglo mientras push lo manda al final
      this._historial = this._historial.splice(0, 10);//con splice el arreglo no tendra mas de 10 elementos
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log('Parametros', params);


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params: params })
      .subscribe((resp) => {

        console.log(resp.data);

        this.resultados = resp.data;
        localStorage.setItem('data', JSON.stringify(this.resultados));



      });
  }



}
