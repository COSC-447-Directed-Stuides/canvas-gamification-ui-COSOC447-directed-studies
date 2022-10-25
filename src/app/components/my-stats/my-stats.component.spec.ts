import {ComponentFixture, TestBed} from '@angular/core/testing'

import {MyStatsComponent} from './my-stats.component'

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
})
