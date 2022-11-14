import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core'
import {Category, User} from '@app/_models'
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
    pCategories: Category[]
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
        private userStatsService: UserStatsService,
        private categoryService: CategoryService

    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe((categories) => {
            this.pCategories = categories.filter(c => c.parent == null)

            this.userStatsService.getUserStats().subscribe(stats => {
                this.stats = stats
                this.challengesDone = stats.challenge_stats.challenges_completed
                this.goalsDone = stats.goal_stats.goals_completed

                for(let i = 0; i<this.pCategories.length; i++){
                    if(this.pCategories[i].pk === 64){
                        this.basicsNum = this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === this.pCategories[i].pk ).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0)
                    } else if(this.pCategories[i].pk === 72)
                        this.predefNum = this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === this.pCategories[i].pk).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0)
                    else if(this.pCategories[i].pk === 83)
                        this.conditionalsNum = this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === this.pCategories[i].pk).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0)
                    else if(this.pCategories[i].pk === 91)
                        this.loopsNum = this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === this.pCategories[i].pk).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0)
                    else if(this.pCategories[i].pk === 100)
                        this.methodsNum = this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === this.pCategories[i].pk).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0)
                    else if(this.pCategories[i].pk === 107)
                        this.arraysNum = this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === this.pCategories[i].pk).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0)
                    else if(this.pCategories[i].pk === 115)
                        this.oopNum = this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === this.pCategories[i].pk).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0)
                }

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

                this.mcqNum = this.stats.question_stats.mcq.questions_solved
                this.parsonsNum = this.stats.question_stats.parsons.questions_solved
                this.javaNum = this.stats.question_stats.java.questions_solved


            })

        })



    }
}
