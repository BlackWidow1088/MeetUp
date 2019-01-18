import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemDiagramDataService } from 'src/app/main-layout/system-diagram/services/system-diagram-data.service';
import { of } from 'rxjs';
import { ToggleComponentsComponent } from './toggle-components.component';

const SystemDiagramDataServiceStub = {
  updateComponent: jasmine.createSpy('updateComponent'),
  updateComponentsNode: jasmine.createSpy('updateComponentsNode'),
  subscribeComponents: () => of([])
}

describe('ToggleComponentsComponent', () => {
  let component: ToggleComponentsComponent;
  let fixture: ComponentFixture<ToggleComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToggleComponentsComponent
      ],
      providers: [
        { provide: SystemDiagramDataService, useValue: SystemDiagramDataServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call add component is called and updateComponent have been called', () => {
    const componentObj = { id: 4 };
    component.addComponent(componentObj, { stopPropagation: function () { } });
    expect(SystemDiagramDataServiceStub.updateComponent).toHaveBeenCalled();
  });

  it('should call add component and check if updateComponentsNode is called', () => {
    component.addAllComponent({ stopPropagation: function () { } });
    expect(SystemDiagramDataServiceStub.updateComponentsNode).toHaveBeenCalled();
  });
});
