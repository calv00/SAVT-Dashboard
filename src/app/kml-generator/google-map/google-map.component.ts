import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { KmlLayerOptions } from '@agm/core/services/google-maps-types';
import { Polyline } from "@agm/core/services/google-maps-types";

import { ImageService } from '../../shared/services/image.service';

import { Image } from '../../shared/models/image';
import { marker } from '../../shared/models/marker';

declare var google: any;

@Component({
    selector: 'google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {
    title="Google Maps API";
    selectedImage: boolean;
    imageRef: Image;
    iconUrl: string;
    latitude: number = 41.617251;
    longitude: number = 0.625888;
    label: string;
    zoom: number = 5;
    mapTypeId: string = "hybrid";
    sensorsMarkers: marker[] = [];
    imageMarkers: marker[] = [];

    private _map: any;

    private activeGeofence?: Polyline;
    private imageOverlay: any;
    private _onMapClickListener: any;
    private elem: HTMLElement;
    private orientationValue: number = 0;

    /* This counter will start on 1 to be confortable to future inexpert users */
    private imageMarkesCounter: number;

    constructor(
        private mapApi: GoogleMapsAPIWrapper,
        private imageService: ImageService
    ) { }

    ngOnInit( ) {
        this.subscribeToMap();
     }


    rotateLeft() {
        this.getHtmlElement();
        const degrees = 10;
        this.elem.style.webkitTransform = 'rotate('+(this.orientationValue-degrees)+'deg)';
        this.elem.style.transform = 'rotate('+(this.orientationValue-degrees)+'deg)';
        this.orientationValue -= degrees;
    }

    rotateRight() {
        this.getHtmlElement();
        const degrees = 10;
        this.elem.style.webkitTransform = 'rotate('+(this.orientationValue+degrees)+'deg)';
        this.elem.style.transform = 'rotate('+(this.orientationValue+degrees)+'deg)';
        this.orientationValue += degrees;
    }

    increaseWidth() {
        this.getHtmlElement();
        const increment = 10;

        const width = parseInt(this.elem.style.width, 10);
        this.elem.style.width = `${width + increment}px`;

        const left = parseInt(this.elem.style.left, 10);
        this.elem.style.left = `${left - increment / 2}px`;
    }

    decreaseWidth() {
        this.getHtmlElement();
        const decrement = 10;

        let width = parseInt(this.elem.style.width, 10);
        this.elem.style.width = `${width - decrement}px`;

        const left = parseInt(this.elem.style.left, 10);
        this.elem.style.left = `${left + decrement / 2}px`;
    }

    increaseHeight() {
        this.getHtmlElement();
        const increment = 10;
        
        const height = parseInt(this.elem.style.height, 10);
        this.elem.style.height = `${height + increment}px`;

        const top = parseInt(this.elem.style.top, 10);
        this.elem.style.top = `${top - increment / 2}px`;
    }

    decreaseHeight() {
        this.getHtmlElement();
        const decrement = 10;

        let height = parseInt(this.elem.style.height, 10);
        this.elem.style.height = `${height - decrement}px`;

        const top = parseInt(this.elem.style.top, 10);
        this.elem.style.top = `${top + decrement / 2}px`;
    }

    saveOverlay() {
        console.log(this.imageRef);
        this.imageService.saveMarkers(this.imageRef, this.imageMarkers).subscribe(
            result => console.log(result),
            error => console.log(error)
        );
    }

    deleteOverlay() {
        this.imageOverlay.setMap(null);
        this.orientationValue = 0;
        this.selectedImage = false;
        this.imageRef = undefined;
        this.cleanMarkers();
    }

    private getHtmlElement(): void {
        /*
        document.querySelector('google-map img[src^="http://localhost:3000"]')
        document.querySelectorAll('google-map img[src^="http://localhost:3000"]')
        */
        this.elem = <HTMLElement>document.querySelector('google-map img[src^="http://"]');
        this.elem.style.position = 'relative';
        this.elem.style.opacity = '0.7';
        let parent = this.elem.parentElement;
        parent.style.overflow = 'initial';
    }

    private subscribeToMap(): void {
        this.imageService.observableSubject$.subscribe( image => {
            if (this.imageOverlay != null){
                this.deleteOverlay();
            }
            this.imageOverlay = new google.maps.GroundOverlay(
            image.url, this.calculateBounds(image.latitude, image.longitude, image.altitude));
            this.imageOverlay.setMap(this._map);
            this.toLocation(image.latitude, image.longitude);
            console.log(image.name);
            this.selectedImage = true;
            this.imageRef = image;
            this.cleanMarkers();
            this.cleanSensorMarkers();
        });
    }

    private calculateBounds(latitude: number, longitude: number, altitude: number): any {
        var bounds = {
            north: latitude + 0.0009,
            south: latitude - 0.0009,
            east: longitude + 0.00144,
            west: longitude - 0.00144
        };
        console.log(bounds);
        return bounds;
    }

    private toLocation(latitude: number, longitude: number){
        this.latitude = latitude;
        this.longitude = longitude;
        this.zoom = 16;
    }

    mapClicked(event: MouseEvent){
        if (this.selectedImage && this.imageMarkesCounter<=4) {
            this.imageMarkers.push({
                iconUrl: 'http://maps.google.com/mapfiles/kml/paddle/grn-blank.png',
                latitude: event.coords.lat,
                longitude: event.coords.lng,
                label: String(this.imageMarkesCounter),
                draggable: true
            });
            this.imageMarkesCounter++;
        }
    }

    mapReady(map: any) {
        this._map = map;
    }

    markerClick(marker: marker, event: MouseEvent) {
        //console.log(`clicked the marker: ${marker.label}`)
    }

    dragEnd(m: marker, event: MouseEvent) {
        this.imageMarkers.find(imageMarker => imageMarker.label == m.label).latitude = event.coords.lat;
        this.imageMarkers.find(imageMarker => imageMarker.label == m.label).longitude = event.coords.lng;
    }

    cleanMarkers(): void {
        this.imageMarkers.splice(0, this.imageMarkers.length);
        this.imageMarkesCounter = 1;
    }

    addMarker(name: string, locationLatitude: number, locationLongitude: number): void {
        this.sensorsMarkers.push({
            iconUrl: 'http://maps.google.com/mapfiles/kml/shapes/target.png',
            latitude: locationLatitude,
            longitude: locationLongitude,
            label: name,
            draggable: false
        });
        this.toLocation(locationLatitude, locationLongitude);
    }

    removeMarker(name: string, locationLatitude: number, locationLongitude: number): void {
        var index = this.sensorsMarkers.indexOf({
            iconUrl: 'http://maps.google.com/mapfiles/kml/shapes/target.png',
            latitude: locationLatitude,
            longitude: locationLongitude,
            label: name,
            draggable: false
        });
        this.sensorsMarkers.splice(index, 1);
    }

    cleanSensorMarkers(): void {
        this.sensorsMarkers.splice(0, this.sensorsMarkers.length);
    }
}
