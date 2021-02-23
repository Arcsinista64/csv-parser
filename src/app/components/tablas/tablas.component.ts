import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { Registro } from 'src/app/models';



@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {


  ngOnInit(): void {
  }

  csvRecords: Registro[] = [];
  header = true;

      duplicados(csvRecords: Registro[])
      {
          var array = csvRecords;
          var repetidos = [];
          const eliminarRepetidos = (array) => {
          var unicos = [];
          var itemsEncontrados = [];
          var itemsRepetidos = [];

          for(var i = 0, l = array.length; i < l; i++) {
              var stringified = JSON.stringify(array[i].nombre);
              var stringified2 = JSON.stringify(array[i].correoElectronico);
              var stringified3 = JSON.stringify(array[i].telefono);

              if(itemsEncontrados[stringified] || itemsEncontrados[stringified2] || itemsEncontrados[stringified3]) 
              { 
                repetidos.push(array[i]);
                array[i] = {nombre: array[i].nombre, correoElectronico: array[i].correoElectronico, telefono: array[i].telefono, duplicado: true }
                itemsRepetidos[stringified] = true; 
                itemsRepetidos[stringified2] = true; 
                itemsRepetidos[stringified3] = true; 
              }
              else
              {
                unicos.push(array[i]);
              }
              itemsEncontrados[stringified] = true; 
              itemsEncontrados[stringified2] = true; 
              itemsEncontrados[stringified3] = true; 
          }
          
          for(var i = 0, l = array.length; i < l; i++)
          {
              var stringified = JSON.stringify(array[i].nombre);
              var stringified2 = JSON.stringify(array[i].correoElectronico);
              var stringified3 = JSON.stringify(array[i].telefono);

            if(itemsRepetidos[stringified] || itemsRepetidos[stringified2] || itemsRepetidos[stringified3]) 
            {
              array[i] = {nombre: array[i].nombre, correoElectronico: array[i].correoElectronico, telefono: array[i].telefono, duplicado: true }
            }
          }
          console.log("Unicos");
          console.log(unicos);
      }
      let arrayFiltrado = eliminarRepetidos(array);
      
      console.log("Repetidos");
      console.log(repetidos);
      console.log(array);
      }
  
  constructor(private ngxCsvParser: NgxCsvParser) {
  }
 
  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;
 
  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
 
    // Select the files from the event
    const files = $event.srcElement.files;
 
    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
 
        console.log('Result', result);
        this.csvRecords = result;
        
        this.duplicados(result);


      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }
}
