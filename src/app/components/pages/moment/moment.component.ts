import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})

export class MomentComponent implements OnInit {

  faTimes = faTimes
  faEdit = faEdit
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

constructor(
  private momentService: MomentService, 
  private route: ActivatedRoute,
  private messagesService: MessagesService,
  private router: Router
  ){}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id')); 

  this.momentService.getMoment(id).subscribe((item) => {
    this.moment = item.data;  
  });
}

async handleRemove(id:number){
  await this.momentService.removeMoment(id).subscribe({
    next: () =>{
      this.messagesService.add('Momento excluído com sucesso!');
      this.router.navigate(['/']); 
    }
  });

}

}
