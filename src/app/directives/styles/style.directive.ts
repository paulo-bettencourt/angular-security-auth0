import { Directive } from '@angular/core';
import {ChangeColorDirective} from "../change-color/change-color.directive";
import {UnderlineDirective} from "../underline/underline.directive";

@Directive({
  selector: '[appStyle]',
  standalone: true,
  hostDirectives: [
    {directive: ChangeColorDirective, inputs: ['color']},
    {directive: UnderlineDirective}
  ]
})
export class StyleDirective {

  constructor() { }

}
