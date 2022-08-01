import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = environment.baseUrl + 'projects/';

  constructor(private httpClient: HttpClient) {}

  getProyectos(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.baseUrl);
  }
  getProyecto(id: number): Observable<Project> {
    return this.httpClient.get<Project>(this.baseUrl + id);
  }

  createProject(project: any) {
    var data: {};
    console.log(project);
    return this.httpClient.post(this.baseUrl, project);
  }

  updateProject(proyectoId: number, proyecto: any) {
    return this.httpClient.put(this.baseUrl + proyectoId, proyecto);
  }
}
