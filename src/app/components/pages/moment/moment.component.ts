import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormGroupDirective, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/Comment';
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

  commentForm!: FormGroup;



constructor(
  private momentService: MomentService, 
  private route: ActivatedRoute,
  private messagesService: MessagesService,
  private router: Router,
  private commentService: CommentService
  ){}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id')); 

  this.momentService.getMoment(id).subscribe((item) => {
    this.moment = item.data;  
  });

  this.commentForm = new FormGroup({
    text: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required])
  });
}

get text() {
  return this.commentForm.get('text')!;
}

get username() {
  return this.commentForm.get('username')!;
}

async handleRemove(id:number){
  await this.momentService.removeMoment(id).subscribe({
    next: () =>{
      this.messagesService.add('Momento excluído com sucesso!');
      this.router.navigate(['/']); 
    }
  });

}

  async onSubmit(formDirective: FormGroupDirective){
     if(this.commentForm.invalid){
      return
     }

     const data: Comment = this.commentForm.value;

     data.momentId = Number (this.moment!.id);

     await this.commentService.createComment(data).subscribe(
      (comment)=> this.moment!.comments!.push(comment.data));
    
        this.messagesService.add("Comentário adicionado!");
        
        this.commentForm.reset();
        formDirective.resetForm();
      }
}
