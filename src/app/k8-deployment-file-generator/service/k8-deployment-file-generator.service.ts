import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DeploymentRequest} from "../model/DeploymentRequest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class K8DeploymentFileGeneratorService {

  constructor(private _httpClient: HttpClient) { }

  private readonly apiUrl: string = 'http://localhost:7070/api/generator/k8-deployment-configs'; // Adjust if needed

  generateYamlZip(deploymentRequest: DeploymentRequest): Observable<Blob> {
    console.log("requestBody: " + deploymentRequest.appName)

    return this._httpClient.post(this.apiUrl, deploymentRequest, {
      responseType: 'blob', // To handle binary zip file
      headers: new HttpHeaders({
        // 'Content-Type' is automatically set when using FormData
      })
    });
  }
}
