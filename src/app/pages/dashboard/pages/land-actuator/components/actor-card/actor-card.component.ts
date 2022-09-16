import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'app-actor-card',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    NzCardModule, 
    NzSwitchModule,
    NzDescriptionsModule
  ],
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss'],
})
export class ActorCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
