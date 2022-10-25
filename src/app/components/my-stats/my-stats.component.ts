import {Component, OnInit} from '@angular/core'
import {CourseService} from '@app/course/_services/course.service'
import {Course, STATUS} from '@app/_models'
@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss']
})
export class MyStatsComponent implements OnInit {
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
