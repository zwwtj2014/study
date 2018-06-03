import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Image } from '../domain/entities';

@Injectable()
export class BingImageService {
  imageUrl: string;

  headers = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '6436fe73230248269d0b92f511b6d87d'
  });

  constructor(private http: Http) {
    const q = '北极 + 墙纸';
    const baseUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';
    this.imageUrl = `${baseUrl}?q=${q}&count=5&mkt=zh-CN&imageType=Photo&size=Large`;
  }

  getImageUrl(): Observable<Image[]> {
    return this.http
      .get(this.imageUrl, { headers: this.headers })
      .map(res => res.json().value as Image[])
      .catch(this.handleError);
  }

  private handleError(err: Response) {
    console.log(err);
    return Observable.throw(err.json()['error'] || 'Servers error');
  }
}
