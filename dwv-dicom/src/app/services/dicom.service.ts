import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DicomService {

  private url='http://localhost:5179/api/Route/files';
  private apiUrl = 'https://dev.mercadofin.com:18080/ipfs/QmdWrzie7PHpNgZLFz2QYq31C2Dbq1fBK8omR6fC8hr2oW';
  

  constructor(private httpClient: HttpClient ) { }

  getDicomFiles():Observable<any> {
    return this.httpClient.get(this.url);
  }
  obtenerDicom(): Observable<Blob> {
    return this.httpClient.get(this.apiUrl, { responseType: 'blob' });
  }
}
