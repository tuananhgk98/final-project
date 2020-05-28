import { Component, OnInit, ViewChild } from '@angular/core';
// import {
//   MonacoEditorComponent,
//   MonacoEditorConstructionOptions,
//   MonacoEditorLoaderService,
//   MonacoStandaloneCodeEditor
// } from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs/operators';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent {
  // @ViewChild(MonacoEditorComponent, { static: false })
  // monacoComponent: MonacoEditorComponent;
  // editorOptions: MonacoEditorConstructionOptions = {
  //   theme: 'myCustomTheme',
  //   language: 'javascript',
  //   roundedSelection: true,
  //   autoIndent: true
  // };
  // code = this.getCode();
  isShow: boolean = false;
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {
    // this.monacoLoaderService.isMonacoLoaded$
    //   .pipe(
    //     filter(isLoaded => isLoaded),
    //     take(1)
    //   )
    //   .subscribe(() => {
    //     monaco.editor.defineTheme('myCustomTheme', {
    //       base: 'vs-dark', 
    //       inherit: true,
    //       rules: [
    //         {
    //           token: 'comment',
    //           foreground: 'ffa500',
    //           fontStyle: 'italic underline'
    //         },
    //         { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
    //         { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
    //       ],
    //       colors: {}
    //     });
    //   });
  }

  // editorInit(editor: MonacoStandaloneCodeEditor) {
  //   editor.setSelection({
  //     startLineNumber: 1,
  //     startColumn: 1,
  //     endColumn: 50,
  //     endLineNumber: 3
  //   });
  // }

  // getCode() {
  //   return (
  //     'const doSomething = () => {}'
  //   );
  // }

  showTestCase() {
    this.isShow = true;
  }
  goBack() {
    this.isShow = false;
  }
}

