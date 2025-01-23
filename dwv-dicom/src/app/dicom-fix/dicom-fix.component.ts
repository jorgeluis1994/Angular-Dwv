import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { App, AppOptions, DataElement, ViewConfig, ToolConfig, decoderScripts, getDwvVersion } from 'dwv';
import { DicomService } from '../services/dicom.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

decoderScripts.jpeg2000 = 'assets/dwv/decoders/pdfjs/decode-jpeg2000.js';
decoderScripts['jpeg-lossless'] = 'assets/dwv/decoders/rii-mango/decode-jpegloss.js';
decoderScripts['jpeg-baseline'] = 'assets/dwv/decoders/pdfjs/decode-jpegbaseline.js';
decoderScripts.rle = 'assets/dwv/decoders/dwv/decode-rle.js';

@Component({
  selector: 'app-dicom-fix',
  imports: [CommonModule,MatSidenavModule,MatListModule,FormsModule,HttpClientModule,MatButtonModule,MatButtonToggleModule,MatDialogModule,MatIconModule,MatProgressBarModule],
  templateUrl: './dicom-fix.component.html',
  styleUrl: './dicom-fix.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DicomFixComponent implements OnInit {
  private dwv!: App;
  public tools = {
    Scroll: new ToolConfig(),
    ZoomAndPan: new ToolConfig(),
    WindowLevel: new ToolConfig(),
    Draw: new ToolConfig(['Ruler']),
  };

  private listDicomFiles: any[] = [];
  public toolNames: string[] = Object.keys(this.tools);
  selectedTool = '';

  constructor(private dicomService: DicomService) {}


  ngOnInit(): void {
    // create the dwv app
    this.dwv = new App();
    // initialise
    const viewConfig0 = new ViewConfig('layerGroup0');
    const viewConfigs = { '*': [viewConfig0] };
    const options = new AppOptions(viewConfigs);
    options.tools = this.tools;
    this.dwv.init(options);
    // load dicom data

    console.log('Botones',this.toolNames);

    this.dicomService.getDicomFiles().subscribe(
      (response) => {

        this.listDicomFiles=response.map((data: any) => data.url);
        // console.log(this.listDicomFiles);
        this.dwv.loadURLs([
          // 'https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm',
           'http://localhost:5179/api/Route/files/image-00057.dcm',
          // 'https://dev.mercadofin.com:18080/ipfs/QmUtwFgtEFXpo1x3upe8jvhP9USeoWeoVKYJWUSYZ5BXLP'
          ]);
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );

  }

  getDicomFiles() {

  //   this.dicomService.getDicomFiles().subscribe({
  //     next: (data: any) => {
  //       console.log(data);
  //     },
  //     error: (error: any) => {
  //       console.error('There was an error!', error);
  //     }
  //   });
   }

  onChangeTool = (tool: string) => {
    if ( this.dwv ) {
      this.selectedTool = tool;
      this.dwv.setTool(tool);
      if (tool === 'Draw' &&
        typeof this.tools.Draw.options !== 'undefined') {
        this.onChangeShape(this.tools.Draw.options[0]);
      }
    }
  }

  private onChangeShape = (shape: string) => {
    if ( this.dwv && this.selectedTool === 'Draw') {
      this.dwv.setToolFeatures({shapeName: shape});
    }
  }

  getToolIcon = (tool: string) => {
    let res!: string;
    if (tool === 'Scroll') {
      res = 'menu';
    } else if (tool === 'ZoomAndPan') {
      res = 'search';
    } else if (tool === 'WindowLevel') {
      res = 'contrast';
    } else if (tool === 'Draw') {
      res = 'straighten';
    }
    return res;
  }

  canRunTool = (tool: string) => {
    let res: boolean;
    if (tool === 'Scroll') {
      res = this.dwv.canScroll();
    } else if (tool === 'WindowLevel') {
      res = this.dwv.canWindowLevel();
    } else {
      res = true;
    }
    return res;
  }

}
