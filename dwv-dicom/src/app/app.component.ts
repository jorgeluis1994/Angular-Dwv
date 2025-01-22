import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {  DicomFixComponent} from "./dicom-fix/dicom-fix.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DicomFixComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dwv-dicom';
}
