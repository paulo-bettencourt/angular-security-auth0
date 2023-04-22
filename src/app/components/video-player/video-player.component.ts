import { Component, Input, OnInit } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  template: '<youtube-player [videoId]="youtubeID"></youtube-player>',
  selector: 'app-youtube-player',
  standalone: true,
  imports: [YouTubePlayerModule],
})
export class VideoComponent implements OnInit {
  @Input('youtubeID') youtubeID: string = 'aqmAxs9QlSE';

  ngOnInit() {
    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}
