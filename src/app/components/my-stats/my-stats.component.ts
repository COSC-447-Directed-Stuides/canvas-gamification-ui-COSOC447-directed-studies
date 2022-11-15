import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core'
import {Category, User} from '@app/_models'
import {ActivatedRoute} from '@angular/router'
import {AuthenticationService} from '@app/_services/api/authentication'
import {ApiService} from "@app/_services/api.service"
import {Stats} from "@app/_models/user_difficulty_stats"
import {UserStatsService} from "@app/_services/api/user-stats.service"
import {CategoryService} from "@app/_services/api/category.service"
import {DifficultyService} from "@app/problems/_services/difficulty.service"
import {Difficulty} from "@app/_models/difficulty"

@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyStatsComponent implements OnInit {
    difficulties: Difficulty[] = []
    pCategories: Category[] = []
    user: User
    stats: Stats
    challengesDone: number
    goalsDone: number

    mcqNum: number
    parsonsNum: number
    javaNum: number

    totalqDone: number
    questionsSolved: number[] = []
    qSolvedDifficulty: number[] = []



    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
        private apiService: ApiService,
        private userStatsService: UserStatsService,
        private categoryService: CategoryService,
        private difficultyService: DifficultyService

    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.categoryService.getCategories().subscribe((categories) => {
            this.pCategories = categories.filter(c => !c.parent)

            this.userStatsService.getUserStats().subscribe(stats => {
                this.stats = stats
                this.challengesDone = stats.challenge_stats.challenges_completed
                this.goalsDone = stats.goal_stats.goals_completed

                for( const cat of this.pCategories){
                    this.questionsSolved.push(this.stats.category_stats.filter(stats => stats.difficulty === 'ALL' && stats.category === cat.pk ).reduce((sum, obj) => {
                        return sum + obj.questions_solved
                    },0))
                }

                this.difficultyService.getDifficulties().subscribe(difficulties => {
                    this.difficulties = difficulties

                    for(let i = 0; i<this.difficulties.length; i++){
                        this.qSolvedDifficulty.push(this.stats.category_stats.filter(stats => stats.difficulty === this.difficulties[i][0]).reduce((sum, obj) => {
                            return sum + obj.questions_solved
                        },0))
                    }
                })

                this.totalqDone = this.questionsSolved.reduce((accumulator, obj) => {
                    return accumulator + obj
                }, 0)

                this.mcqNum = this.stats.question_stats.mcq.questions_solved
                this.parsonsNum = this.stats.question_stats.parsons.questions_solved
                this.javaNum = this.stats.question_stats.java.questions_solved

            })

        })



    }
}
