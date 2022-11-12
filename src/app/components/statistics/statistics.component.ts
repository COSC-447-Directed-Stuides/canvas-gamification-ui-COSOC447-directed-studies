import {Component, OnInit} from '@angular/core'
import {CourseService} from '@app/course/_services/course.service'
import {Course, STATUS} from '@app/_models'
@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']

})
export class StatisticsComponent implements OnInit {
    activeCourses: Course[]

    constructor(private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.courseService
            .getCourses(true, {ordering: {name: true}})
            ?.subscribe((courses) => {
                this.activeCourses = courses.filter(course => {
                    return course.status === STATUS.active
                })
            })
    }
}
