import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ap-vmessage',
  templateUrl: './vmessage.component.html',
  styleUrls: ['./vmessage.component.css']
})
export class VmessageComponent implements OnInit {

  @Input() public text: string;

  constructor() { }

  ngOnInit() {
  }

}
