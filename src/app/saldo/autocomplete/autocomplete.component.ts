import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'autocomplete-field',
  templateUrl: 'autocomplete.component.html',
  
  styleUrls: ['autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ["um","dois","tres","quatro","cinco"];
  results: string[] = ["um","dois","tres","quatro","cinco"];
  filteredOptions: Observable<string[]>;
  supplier:any;
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.results.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  resultsAvailable: boolean = false;
  ignoreNextChange: boolean = false;
  
  onSearchChange(event: any) {
      const substring = event.target.value;
      if (this.ignoreNextChange) {
          this.ignoreNextChange = false;
          return;
      }
      console.log(substring)
  
      this.getStrings(substring,(result) => {
          this.results = result;
          if (this.results.length > 0) {
              this.resultsAvailable = true;               
          } else {
              this.resultsAvailable = false;
          }
      });
  }
  
  supplierSelected(selected: string) :void {
      this.supplier = selected;
      this.results = [];
      this.resultsAvailable = false;
      this.ignoreNextChange = true;
  }

  getStrings(item:string, call:any){
    
    console.log(this.options.filter(element => element.includes(item)))
    call(this.options.filter(element => element.includes(item)));
  }
}