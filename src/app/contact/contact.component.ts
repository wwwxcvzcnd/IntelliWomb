import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  onSubmit() {
    // Logic for form submission, e.g., calling a service or logging a message
    console.log('Form submitted!');
  }
  constructor() { }

  ngOnInit(): void {
  }

}
