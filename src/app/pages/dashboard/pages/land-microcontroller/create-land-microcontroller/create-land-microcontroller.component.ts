import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tap } from 'rxjs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {MiniPcService} from "../../../../../api-services/mini-pc.service";
import {MiniPcItem2DTO, MiniPcItemMinimalDto} from "../../../../../common/minipc.model";

@Component({
  selector: 'app-create-land-microcontroller',
  standalone: true,
  templateUrl: './create-land-microcontroller.component.html',
  styleUrls: ['./create-land-microcontroller.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
    NzNotificationModule,
    NzSelectModule
  ],
})
export class CreateLandMicrocontrollerComponent implements OnInit {
  @Input() land_id!:number;

  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Description: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    MiniPcId: this.fb.nonNullable.control(0,{
      validators: [Validators.required],
    }),
  });
  isSubmitLoading = false;
  miniPcs: MiniPcItem2DTO[] = [];

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private miniPcService: MiniPcService,
    private microService:MicrocontrollerService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.miniPcService.showMiniPcInALand(this.land_id)
    .subscribe(x=>this.miniPcs=x)
  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.microService.add(this.form.value)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Submit microcontroller baru berhasil.'
        ))
      ).subscribe(id=>this.modal.close(id));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }

}
