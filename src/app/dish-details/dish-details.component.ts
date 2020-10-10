import { Component, OnInit, ViewChild,Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {

  dish: Dish;
  dishIds:string[];
  prev:string;
  next:string;
  commentForm: FormGroup;
  comments: Comment;
  errMess: string;

  @ViewChild('cform') commentFormDirective;
  formErrors = {
    'author': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Your comment is required.'
    }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,private fb: FormBuilder, @Inject('BaseURL') private baseURL) {
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishId().subscribe(dishId=>this.dishIds = dishId);
    this.route.params.pipe(switchMap((params:Params)=>this.dishService.getDish(params['id'])))
    .subscribe(dish => {this.dish = dish;this.setPrevNext(dish.id) },errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId:string)
  {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }
  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', Validators.required]
    });
    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

  this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  formatLabel(value: number) {
    return value;
  }
  onSubmit() {
    this.comments = this.commentForm.value;
    this.comments.date = new Date().toISOString();
    this.dish.comments.push(this.comments);
    this.dishService.putDish(this.dish)
      .subscribe(dish => {
        this.dish = dish;
      },
      errmess => { this.dish = null; this.errMess = <any>errmess; });
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
    this.commentFormDirective.resetForm();
  }

}
