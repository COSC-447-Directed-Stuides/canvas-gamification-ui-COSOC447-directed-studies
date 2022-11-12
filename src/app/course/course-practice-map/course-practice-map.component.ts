import {Component, OnInit} from '@angular/core'
import {Course} from "@app/_models"
import {ActivatedRoute, Router} from "@angular/router"
import {CourseService} from "@app/course/_services/course.service"

@Component({
    selector: 'app-course-practice-map',
    templateUrl: './course-practice-map.component.html',
    styleUrls: ['./course-practice-map.component.scss']
})
export class CoursePracticeMapComponent implements OnInit {

    course: Course
    courseId: number

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseService,
        private router: Router
    ) {
        this.courseId = this.route.snapshot.params.courseId
    }

    ngOnInit(): void {
        this.courseService.getCourse(this.courseId).subscribe(course => {
            this.course = course
        })
    }

    onCourseNameClick(): void {
        this.router.navigate(['course/', this.courseId])
    }
}
