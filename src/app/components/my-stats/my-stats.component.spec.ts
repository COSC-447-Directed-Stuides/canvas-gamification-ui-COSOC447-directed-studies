import {ComponentFixture, TestBed} from '@angular/core/testing'
import {MyStatsComponent} from './my-stats.component'
import {MOCK_USER_STATS1} from "@app/course/_test/mock"
import{UserStatsService} from "@app/_services/api/user-stats.service"
import{UserStatsServiceMock} from "@test/user-stats.service.mock"


describe('MyStatsComponent', () => {
    let component: MyStatsComponent
    let fixture: ComponentFixture<MyStatsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ MyStatsComponent ],
            providers: [
                {provide: UserStatsService, useClass: UserStatsServiceMock}
            ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(MyStatsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('stats should be retrieved', () => {
        expect(component.stats).toEqual(MOCK_USER_STATS1)
    })

    it('number of challenges is tested', () => {
        expect(component.challengesDone).toEqual(2)
    })

    it('number of goals is tested', () => {
        expect(component.goalsDone).toEqual(2)
    })

    it('number of goals is tested', () => {
        expect(component.totalqDone).toEqual(12)
    })


})
