import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  SelectedphotoFile:any ;
  constructor() { }

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
}
