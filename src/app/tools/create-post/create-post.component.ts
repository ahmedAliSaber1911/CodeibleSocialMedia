import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  SelectedphotoFile:any ;
  auth = new FirebaseTSAuth();
  fireStore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();


  constructor(private dialog : MatDialogRef<CreatePostComponent>) { }

  ngOnInit(): void {
  }
  onPhotoSelected(photo:HTMLInputElement){
    this.SelectedphotoFile = photo.files![0];
    if(!this.SelectedphotoFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.SelectedphotoFile);
    fileReader.addEventListener(
      "loadend",
      ev =>{
        let readableString =  fileReader.result!.toString();
        let photoPreviewImage =<HTMLImageElement>document.getElementById('postReviewImage');
        photoPreviewImage.src = readableString
      }
    )
  }
  uploadImagePost(comment : string){
    let postId = this.fireStore.genDocId();
    this.storage.upload({
      uploadName:"Upload Image Post",
      path : ["Posts", postId, "image"],
      data:{
        data : this.SelectedphotoFile
      },
      onComplete:(downloadUrl)=>{
        this.fireStore.create({
          path:["Posts",postId],
          data:{
            comment: comment,
            cratorId: this.auth.getAuth().currentUser?.uid,
            imageUrl: downloadUrl,
            timetamp: FirebaseTSApp.getFirestoreTimestamp()
          },
          onComplete : (docId) =>{
            this.dialog.close();
          }
        })
      }
    })
  }
  uploadPost(comment : string){
    this.fireStore.create({
      path:["Posts"],
      data:{
        comment: comment,
        cratorId: this.auth.getAuth().currentUser?.uid,
        timetamp: FirebaseTSApp.getFirestoreTimestamp()
      },
      onComplete : (docId) =>{
        this.dialog.close();
      }
    })
  }
  onPostClick(commentInput : HTMLTextAreaElement){
    let comment = commentInput.value;
    if(comment.length <= 0 ) return;
    if(this.SelectedphotoFile)
    this.uploadImagePost(comment);
    else
    this.uploadPost(comment)
  }

}
