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

    it('number of easy questions is tested', () => {
        expect(component.easies).toEqual(2)
    })

    it('number of medium questions is tested', () => {
        expect(component.mediums).toEqual(1)
    })

    it('number of hard questions is tested', () => {
        expect(component.hards).toEqual(1)
    })

    it('number of challenges is tested', () => {
        expect(component.challengesDone).toEqual(2)
    })

    it('number of goals is tested', () => {
        expect(component.goalsDone).toEqual(2)
    })

    it('number of basic questions is tested', () => {
        expect(component.basicsNum).toEqual(2)
    })

    it('number of predef questions is tested', () => {
        expect(component.predefNum).toEqual(1)
    })

    it('number of conditional questions is tested', () => {
        expect(component.conditionalsNum).toEqual(1)
    })

    it('number of loops questions is tested', () => {
        expect(component.loopsNum).toEqual(1)
    })

    it('number of methods questions is tested', () => {
        expect(component.methodsNum).toEqual(1)
    })

    it('number of arrays questions is tested', () => {
        expect(component.arraysNum).toEqual(1)
    })

    it('number of arrays questions is tested', () => {
        expect(component.oopNum).toEqual(1)
    })

    it('number of mcq questions is tested', () => {
        expect(component.mcqNum).toEqual(2)
    })

    it('number of parsons questions is tested', () => {
        expect(component.parsonsNum).toEqual(1)
    })

    it('number of java questions is tested', () => {
        expect(component.javaNum).toEqual(1)
    })

})
