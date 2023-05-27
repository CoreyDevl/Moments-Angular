import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MomentComponent } from '../moment/moment.component';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit{

  moment!: Moment;
  btnText: string = "Editar"

  constructor(
    private momentService: MomentService, 
    private route: ActivatedRoute,
    private messageService: MessagesService,
    private router: Router
    ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => {
      this.moment = item.data
    })

  }

  async handleEdit(momentData: Moment){
    const id = momentData.id

    const formData = new FormData();

    formData.append('title', momentData.title);
    formData.append('description', momentData.description);

    if(momentData.image){
      formData.append('image', momentData.image)
    }

    await this.momentService.updateMoment(id!, formData).subscribe({
      next: () =>{
        this.messageService.add(`Momento ${id} editado com sucesso!`);
        this.router.navigate(['/'])
      }
    })
  }

}
