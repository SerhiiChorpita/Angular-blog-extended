import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostInfo, UserBase } from '../shared/blog-interface/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public newUser!: UserBase;
  public newPost!: PostInfo;

  public userName!: string;
  public signInCheck = true;
  public signInVis!: boolean;
  public signUpVis!: boolean;
  public addVis!: boolean;
  public editVis!: boolean;

  public signInEmail: string = '';
  public signInPass: string = '';

  public signUpUserName!: string;
  public signUpEmail!: string;
  public signUpPass!: string;


  public userNameReg: boolean = false;
  public userEmailReg: boolean = false;
  public passNotValid1: boolean = false;
  public passNotValid2: boolean = false;
  public genderNotValid: boolean = false;


  public signInNotValid: boolean = false;
  public invalidUser: boolean = false;


  public editTitle!: string;
  public editText!: string;
  public currId!: number;

  public dateString: Date = new Date();
  public newDate: string = `${this.dateString.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}, ${this.dateString.toLocaleDateString()}`;

  public visY = 'visibility: visible';
  public visN = 'visibility: hidden';

  public inpValue!: string;

  public allPosts: Array<PostInfo> = [
    {
      title: 'Перший пост',
      postedBy: 'admin',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat quas maxime expedita, a illo facere similique ad vitae quisquam nemo.',
      timeDate: '17:16, 19.10.2022',
    },
  ];

  public allUsers: Array<UserBase> = [
    {
      userName: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
      checkPassword: 'admin',
      gender: 'male'
    },
  ];

  constructor() { }
  ngOnInit(): void {
    setTimeout(() => {
      this.signInVis = true;
    }, 500);
  }

  checkSignIn(form: NgForm): void {
    if (!form.valid) {
      this.signInNotValid = true;
      this.signInVis = true;
    } else if (form.value.signInEmail === 'admin@gmail.com' &&
      form.value.signInPass === 'admin') {
      this.signInVis = false;
      this.signInCheck = false;
      this.userName = this.allUsers[0].userName;
      form.reset();
    } else if (form.valid) {
      this.allUsers.forEach((element) => {
        if (
          element.email === form.value.signInEmail &&
          element.password === form.value.signInPass
        ) {
          this.signInVis = false;
          this.signInCheck = false;
          this.userName = element.userName;
          form.reset();
          this.setToZeroSignIn()
        } else {
          this.invalidUser = true;
        }
      });
    }
  }
  setToZeroSignIn(): void {
    this.invalidUser = false
    this.signInNotValid = false
  }
  checkPass(form: NgForm, value: string): void {
    let fc = form.control.controls;

    if (value === 'signUpPass') {
      if (fc[`${value}`].invalid) {
        this.passNotValid1 = true;
      } else {
        this.passNotValid1 = false;
      }
    }
    if (value === 'signUpCheckPass') {
      if (form.value['signUpPass'] === form.value['signUpCheckPass']) {
        this.passNotValid2 = false;
      } else {
        this.passNotValid2 = true;
      }
    }
  }

  updateSignUp(form: NgForm): void {
    let fc = form.control.controls;

    let fv = form.value;
    this.genderNotValid = false;

    this.newUser = {
      userName: form.value.signUpUserName,
      email: form.value.signUpEmail,
      password: form.value.signUpPass,
      checkPassword: form.value.signUpCheckPass,
      gender: form.value.gender
    };

    if (fc[`signUpUserName`].invalid && !fv.signUpUserName) {
      this.userNameReg = true;
      setTimeout(() => {
        this.userNameReg = false;
      }, 5000);
    }
    if (fc[`signUpEmail`].invalid && !fv.signUpEmail) {
      this.userEmailReg = true;
      setTimeout(() => {
        this.userEmailReg = false;
      }, 5000);
    }
    if (fc[`signUpPass`].invalid && !fv.signUpPass) {
      this.passNotValid1 = true;

      setTimeout(() => {
        this.passNotValid1 = false;
      }, 5000);
    }
    if (fc[`signUpCheckPass`].invalid && !fv.signUpCheckPass) {
      this.passNotValid2 = true;
      setTimeout(() => {
        this.passNotValid2 = false;
      }, 5000);
    }
    if (fv.gender === '') {
      this.genderNotValid = true;
      setTimeout(() => {
        this.genderNotValid = false;
      }, 5000);
    }

    if (!form.valid && form.value.signUpPass !== form.value.signUpCheckPass) {
      this.signUpVis = true;
      return
    } else if (form.valid) {
      this.allUsers.push(this.newUser);
      this.signInVis = true;
      this.signUpVis = false;
      form.reset();
    }
  }

  addPost(form: NgForm): void {
    this.newPost = {
      title: form.value.addTitle,
      postedBy: this.userName,
      text: form.value.addText,
      timeDate: this.newDate,
    };
    this.allPosts.unshift(this.newPost);
    form.reset();
  }
  editPost(index: number): void {
    this.editTitle = this.allPosts[index].title;
    this.editText = this.allPosts[index].text;
    this.currId = index;
  }
  updatePost(): void {
    this.allPosts[this.currId].title = this.editTitle;
    this.allPosts[this.currId].text = this.editText;
  }
  deletePost(index: number): void {
    this.allPosts.splice(index, 1);
  }

}



