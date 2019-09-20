import { Injectable } from '@angular/core';
import {SwapiService} from './swapi.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class HelperService {
  data = [];

  constructor(
    private swapiService: SwapiService, private toastr: ToastrService
  ) { }

  loadLocalStorageData() {
    return this.data = this.swapiService.getAllStorage();
  }

  presenToast(title = '', msg = '') {
    this.toastr.success(msg, title);
  }
}
