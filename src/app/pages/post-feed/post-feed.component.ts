import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { CreatePostComponent } from './../../tools/create-post/create-post.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  fireStore = new FirebaseTSFirestore();
  posts : PostData [] = []
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosts();
  }
  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
  }
  getPosts(){
    this.fireStore.getCollection({
      path : ["Posts"],
      where: [
        new OrderBy("timestemp" , "desc"),
        new Limit(10)
      ],
      onComplete: (result)=>{
        result.docs.forEach(
          doc =>{
            let post = <PostData>doc.data();
            this.posts.push(post);
          }
        )
      },
      onFail: err=>{

      }
    })
  }
}
export interface PostData {
  comment :string,
  creatorId: number,
  imageUrl?: string
}
