import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CoursePracticeMapComponent} from './course-practice-map.component'

describe('CoursePracticeMapComponent', () => {
    let component: CoursePracticeMapComponent
    let fixture: ComponentFixture<CoursePracticeMapComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ CoursePracticeMapComponent ]
        })
            .compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursePracticeMapComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
