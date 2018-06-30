import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentNodeComponent } from './content-node.component';

describe('ContentNodeComponent', () => {
  let component: ContentNodeComponent;
  let fixture: ComponentFixture<ContentNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
