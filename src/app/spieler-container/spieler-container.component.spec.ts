import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpielerContainerComponent } from './spieler-container.component';

describe('SpielerContainerComponent', () => {
  let component: SpielerContainerComponent;
  let fixture: ComponentFixture<SpielerContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpielerContainerComponent]
    });
    fixture = TestBed.createComponent(SpielerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
