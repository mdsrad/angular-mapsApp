import { AfterViewInit, Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoibWRzcmFkIiwiYSI6ImNsaWY0ZDYzNDE2aGMzZnFvaTViNmI1cncifQ.UtqvEU70mecrfptOBzGXhw';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit{

  ngAfterViewInit(): void {

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-3.6, 40.4], // starting position [lng, lat]
      zoom: 9, // starting zoom
      });
  }


}
