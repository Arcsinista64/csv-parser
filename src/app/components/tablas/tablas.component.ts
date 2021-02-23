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
  seRepite: boolean;

  // nombres: string[] = [];
  // correosElectronicos: string[] = [];
  // numerosTelefonicos: string[] = [];



      // evaluarRepetidos(registro: Registro)
      // {
      //   // console.log("test" + registro);
      //   // for(var item in registro)
      //   // {
      //   //     this.nombres.push(registro.nombre);
      //   //     this.correosElectronicos.push(registro.correoElectronico);
      //   //     this.numerosTelefonicos.push(registro.telefono);
      //   // }
      // }


      // duplicados(csvRecords: Registro[])
      // {
      //   var array = csvRecords;
      //   let newArray = [];
      //   array.forEach(elem=>{
      //     // verificamos si existe en el nuevo array , comparando su dos componentes
      //     // posición 0 y 1 , si no existe, añadimos el emenento al array
      //     if(!array.some(valor=> valor[0] === elem[0]))
      //     {
      //       //newArray.push(elem);
      //     }
      //     else 
      //     {
                    
      //     }
      //   })
      // }

      duplicados(csvRecords: Registro[])
      {
          var array = csvRecords;
          var repetidos = [];
          const eliminarRepetidos = (array) => {
          var unicos = [];
          var itemsEncontrados = {};
          for(var i = 0, l = array.length; i < l; i++) {
              var stringified = JSON.stringify(array[i].nombre);
              var stringified2 = JSON.stringify(array[i].correoElectronico);
              var stringified3 = JSON.stringify(array[i].telefono);

              if(itemsEncontrados[stringified] || itemsEncontrados[stringified2] || itemsEncontrados[stringified3]) 
              { 
                repetidos.push(array[i]);
                array[i] = {nombre: array[i].nombre, correoElectronico: array[i].correoElectronico, telefono: array[i].telefono, duplicado: true }

              }
              else
              {
                unicos.push(array[i]);
              }
              itemsEncontrados[stringified] = true; 
              itemsEncontrados[stringified2] = true; 
              itemsEncontrados[stringified3] = true; 
          }
          console.log("Unicos");
          console.log(unicos);
      }

      let arrayFiltrado = eliminarRepetidos(array);
      console.log("Repetidos");

      console.log(repetidos);
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
