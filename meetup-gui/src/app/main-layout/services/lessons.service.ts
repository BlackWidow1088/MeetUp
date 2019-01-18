
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Lesson } from "src/app/main-layout/model/lesson";
import { ApiBaseService } from "src/app/core/service";
import { URLLinks } from "src/app/core/model";



@Injectable({
  providedIn: 'root'
})
export class LessonsService {

    constructor(private apiBaseService: ApiBaseService) {

    }
// TODO: move api calls to apibase service
    loadAllLessons(): Observable<Lesson[]> {
        return this.apiBaseService.get(URLLinks.lessons).pipe(
            map(res => res.lessons));
    }

    findLessonById(id:number) {
        return this.apiBaseService.get(`${URLLinks.lessons}/${id}`);
    }

}

