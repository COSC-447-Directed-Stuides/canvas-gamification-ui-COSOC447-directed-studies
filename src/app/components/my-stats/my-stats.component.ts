import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core'
import {User} from '@app/_models'
import {ActivatedRoute} from '@angular/router'
import {AuthenticationService} from '@app/_services/api/authentication'
import {ApiService} from "@app/_services/api.service"
import {Stats} from "@app/_models/user_difficulty_stats"
import {UserStatsService} from "@app/_services/api/user-stats.service"
import {CategoryService} from "@app/_services/api/category.service"

@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyStatsComponent implements OnInit {
    user: User
    stats: Stats
    easies: number
    mediums: number
    hards: number
    challengesDone: number
    goalsDone: number
    basicsNum: number
    predefNum: number
    conditionalsNum: number
    loopsNum: number
    methodsNum: number
    arraysNum: number
    oopNum: number
    mcqNum: number
    parsonsNum: number
    javaNum: number
    qDone: number


    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private apiService: ApiService,
        private userStatsService: UserStatsService

    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.userStatsService.getUserStats().subscribe(stats => {
            this.stats = stats
            this.challengesDone = stats.challenge_stats.challenges_completed
            this.goalsDone = stats.goal_stats.goals_completed

            this.easies = this.stats.category_stats.filter(stats => stats.difficulty === 'EASY').reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.mediums = this.stats.category_stats.filter(stats => stats.difficulty === 'MEDIUM').reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.hards = this.stats.category_stats.filter(stats => stats.difficulty === 'HARD').reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.qDone = this.easies + this.mediums + this.hards

            this.basicsNum = this.stats.category_stats.filter(stats =>
                stats.difficulty === 'ALL' && stats.category === 64).reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)


            this.predefNum = this.stats.category_stats.filter(stats => {
                stats.difficulty === 'ALL' && stats.category === 72
            }).reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.conditionalsNum = this.stats.category_stats.filter(stats => {
                stats.difficulty === 'ALL' && stats.category === 83
            }).reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.loopsNum = this.stats.category_stats.filter(stats => {
                stats.difficulty === 'ALL' && stats.category === 91
            }).reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.methodsNum = this.stats.category_stats.filter(stats => {
                stats.difficulty === 'ALL' && stats.category === 100
            }).reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.arraysNum = this.stats.category_stats.filter(stats => {
                stats.difficulty === 'ALL' && stats.category === 107
            }).reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.oopNum = this.stats.category_stats.filter(stats => {
                stats.difficulty === 'ALL' && stats.category === 115
            }).reduce((sum, obj) => {
                return sum + obj.questions_solved
            },0)

            this.mcqNum = this.stats.question_stats.mcq.questions_solved
            this.parsonsNum = this.stats.question_stats.parsons.questions_solved
            this.javaNum = this.stats.question_stats.java.questions_solved


        })



    }
}
