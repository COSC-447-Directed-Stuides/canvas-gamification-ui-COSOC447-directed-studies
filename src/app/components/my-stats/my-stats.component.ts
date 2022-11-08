import {Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core'
import {Course} from '@app/_models'
import {QuestionCount} from "@app/_models"
import {QuestionCountService} from "@app/admin/_services/question-count.service"
@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyStatsComponent implements OnInit {
    questionCountData!: QuestionCount[]
    questionCountDataHeader!: string[]
    openGraphDropdown!: boolean[]
    readonly data = [
        {
            name: `Alex Inkin`,
            balance: 1323525,
        },
        {
            name: `Roman Sedov`,
            balance: 423242,
        },
    ] as const

    readonly columns = Object.keys(this.data[0])
    constructor(private questionCountService: QuestionCountService, private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.questionCountService.getQuestionCount().subscribe(questionCountData => {
            this.questionCountData = questionCountData
            this.questionCountDataHeader = Object.keys(questionCountData[0])
            this.openGraphDropdown = Array(questionCountData.length).fill(false)
        })
    }

}
