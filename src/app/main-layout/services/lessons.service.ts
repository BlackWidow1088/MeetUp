
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Lesson } from "src/app/main-layout/model/lesson";



@Injectable({
  providedIn: 'root'
})
export class LessonsService {

    constructor(private http: HttpClient) {

    }
// TODO: move api calls to apibase service
    loadAllLessons() : Observable<Lesson[]> {
        return this.http.get<any>('/api/lessons').pipe(
            map(res => res.lessons));
    }

    findLessonById(id:number) {
        return this.http.get<Lesson>('/api/lessons/' + id);
    }

}

