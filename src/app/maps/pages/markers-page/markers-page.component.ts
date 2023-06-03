import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.7032833731024084, 40.416540396708996);
  public markers: MarkerAndColor[] = [];



  ngAfterViewInit(): void {

    if ( !this.divMap) throw 'El elemento HTML no fue encontrado'

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      });

      this.readFromLocalStorage();
   }

   createMarker(){
    if (!this.map ) return;
      const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
      const LngLat = this.map.getCenter();
      this.addMarker( LngLat, color);
   }

   addMarker( lngLat: LngLat, color: string){
    if( !this.map ) return;
    const marker = new Marker({
      color: color,
      draggable: true,
    })
    .setLngLat( lngLat )
    .addTo( this.map );

    this.markers.push({ color, marker,});
    this.saveToLocalStorage();


    marker.on('dragend', () => this.saveToLocalStorage());
   }

   delteMarker( index: number ){
    this.markers[index].marker.remove();
    this.markers.splice( index, 1 );
   }


   flyTo( marker: Marker ){
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    })
   }

   saveToLocalStorage(){
      const plainMarkers: PlainMarker[] = this.markers.map( ({color, marker}) =>{
       return {
        color,
        lngLat: marker.getLngLat().toArray()
       }
      });

      localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
      //console.log( plainMarkers );
   }

   readFromLocalStorage(){
    const palinMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const palinMarkers: PlainMarker[] = JSON.parse( palinMarkersString );

    palinMarkers.forEach( ({color , lngLat}) => {
      const [ lng, lat ] = lngLat;
      const coords = new LngLat( lng, lat );
        this.addMarker( coords, color )
    });

   }



}


  // PRIMERA MANERA DE AÑADIR MARCADORES
  //     const markerHtmll = document.createElement('div');
  //     markerHtmll.innerHTML = 'Marta'
  //     const marker = new Marker({
  //       // element: markerHtmll,
  //       // color: 'green'
  //     })
  //       .setLngLat( this.currentLngLat )
  //       .addTo( this.map );
