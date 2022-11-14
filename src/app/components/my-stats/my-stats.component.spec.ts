import {ComponentFixture, TestBed} from '@angular/core/testing'

import {MyStatsComponent} from './my-stats.component'
import {MOCK_USER_STATS1} from "../../course/_test/mock"

describe('MyStatsComponent', () => {
    let component: MyStatsComponent
    let fixture: ComponentFixture<MyStatsComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ MyStatsComponent ]
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
        expect(component.easies).toEqual(MOCK_USER_STATS1)
    })

    it('number of medium questions is tested', () => {
        expect(component.mediums).toEqual(MOCK_USER_STATS1)
    })

    it('number of hard questions is tested', () => {
        expect(component.hards).toEqual(MOCK_USER_STATS1)
    })
})
