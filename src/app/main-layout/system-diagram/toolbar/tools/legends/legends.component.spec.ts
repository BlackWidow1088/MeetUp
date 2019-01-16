import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { SystemDiagramDataServiceStub } from 'src/app/main-layout/system-diagram/stubs';
import { LegendsComponent } from 'src/app/main-layout/system-diagram/toolbar/tools/legends/legends.component';

describe('LegendsComponent', () => {
  let component: LegendsComponent;
  let fixture: ComponentFixture<LegendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LegendsComponent
      ],
      providers: [
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
