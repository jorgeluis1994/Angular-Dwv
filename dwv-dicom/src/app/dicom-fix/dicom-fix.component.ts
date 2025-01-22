import { Component, OnInit } from '@angular/core';

import  { App,AppOptions,DataElement,ViewConfig,ToolConfig,decoderScripts,getDwvVersion} from 'dwv';

@Component({
  selector: 'app-dicom-fix',
  imports: [],
  templateUrl: './dicom-fix.component.html',
  styleUrl: './dicom-fix.component.css'
})
export class DicomFixComponent implements OnInit {
  private dwv!: App;
  public tools = {
    Scroll: new ToolConfig(),
    ZoomAndPan: new ToolConfig(),
    WindowLevel: new ToolConfig(),
    Draw: new ToolConfig(['Ruler']),
};
  
  ngOnInit(): void {
    debugger
    // create the dwv app
  this.dwv = new App();
  // initialise
  const viewConfig0 = new ViewConfig('layerGroup0');
  const viewConfigs = {'*': [viewConfig0]};
  const options = new AppOptions(viewConfigs);
  options.tools = this.tools;
  this.dwv.init(options);
  // load dicom data
  this.dwv.loadURLs([
    'https://raw.githubusercontent.com/ivmartel/dwv/master/tests/data/bbmri-53323851.dcm'
  ]);
  }

  constructor() { }

}
