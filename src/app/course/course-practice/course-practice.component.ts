import {Component, OnInit} from '@angular/core'
import {Course} from '@app/_models'
import {CourseService} from "@app/course/_services/course.service"
import {ActivatedRoute, Router} from "@angular/router"

@Component({
    selector: 'app-course-practice',
    templateUrl: './course-practice.component.html',
    styleUrls: ['./course-practice.component.scss']
})
export class CoursePracticeComponent implements OnInit {

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
