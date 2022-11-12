import {Component, OnInit,ChangeDetectionStrategy} from '@angular/core'
import {User} from '@app/_models'
import {ActivatedRoute} from '@angular/router'
import {AuthenticationService} from '@app/_services/api/authentication'

@Component({
    selector: 'app-my-stats',
    templateUrl: './my-stats.component.html',
    styleUrls: ['./my-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyStatsComponent implements OnInit {
    user: User
    tok: number


    constructor(
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService,
    ) {
        this.authenticationService.currentUser.subscribe(user => this.user = user)
    }

    ngOnInit(): void {
        this.tok = this.user.tokens



    }


}
