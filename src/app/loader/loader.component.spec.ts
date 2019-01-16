import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService;
  beforeEach(async(() => {
    loaderService = { show: () => { }, hide: () => { }, loaderState: of({}) };
    TestBed.configureTestingModule({
      imports: [],
      declarations: [LoaderComponent],
      providers: [{ provide: LoaderService, useValue: loaderService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should create the app', async(() => {
    TestBed.overrideComponent(
      LoaderComponent,
      {
        set: {
          providers: [
            { provide: LoaderService, useValue: loaderService }
          ]
        }
      }
    );
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.debugElement.componentInstance;
    const loader = TestBed.get(LoaderService);
    expect(component).toBeTruthy();
  }));

  it(`should Initialize the Componenet`, async(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.debugElement.componentInstance;
    component.ngOnInit();
    expect(component.show).toBeFalsy();
  }));

});
