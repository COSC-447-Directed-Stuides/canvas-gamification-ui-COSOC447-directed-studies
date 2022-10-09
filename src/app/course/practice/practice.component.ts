import {Component, OnInit} from '@angular/core'
import {Course} from "@app/_models"
import {ActivatedRoute} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-practice',
    templateUrl: './practice.component.html',
    styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
    course: Course
    courseId: number

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService
    ) {
        this.courseId = this.route.snapshot.params.courseId
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe( course => {
            this.course = course
        })
    }

}
