import { PostData } from './../../pages/post-feed/post-feed.component';
import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() postData! : PostData;
  constructor() { }

  ngOnInit(): void {
  }

}
