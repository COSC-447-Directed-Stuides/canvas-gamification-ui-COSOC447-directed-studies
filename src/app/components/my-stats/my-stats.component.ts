import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core'
import {CourseService} from '@app/course/_services/course.service'
import {Course, STATUS} from '@app/_models'
@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyStatsComponent implements OnInit {
    activeCourses: Course[]
    readonly data = [
        {
            name: `Alex Inkin`,
            balance: 1323525,
            claim:12
        },
        {
            name: `Roman Sedov`,
            balance: 423242,
            claim: 14
        },
    ] as const

    readonly columns = Object.keys(this.data[0])
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
