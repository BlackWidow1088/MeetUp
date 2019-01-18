import { Component, OnInit } from '@angular/core';

import * as d3Select from 'd3-selection';
import { saveAs } from 'file-saver';
import * as html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { formatDateTime } from 'src/app/utils';

@Component({
  selector: 'app-export-as',
  templateUrl: './exportAs.component.html',
  styleUrls: ['./exportAs.component.scss']
})
export class ExportAsComponent implements OnInit {

  private type = { png: `png`, pdf: `pdf` };

  exportTo = [
    { type: this.type.png, active: false },
    { type: this.type.pdf, active: false }
  ];
  fileName: string = `System Diagram_${formatDateTime(new Date(), 'MMMM/DD/YYYY hh:mm A')}`;

  constructor() { }

  ngOnInit() { }

  onClickDownload = (exportAs): void => {
    const maintainRatio = false;
    if (!this.fileName) {
      return;
    }
    if (exportAs.type === this.type.pdf) {
      this.exportTo[1].active = true;
      this.downloadPdf(maintainRatio);
    } else if (exportAs.type === this.type.png) {
      this.exportTo[0].active = true;
      this.downloadPng(maintainRatio);
    }
  }

  private downloadPdf = (maintainRatio: boolean = false): void => {
    let svgNode = d3Select.select(`#graphSvg`).node();
    const pdf = new jsPDF('l', 'pt', 'a4');

    if (svgNode) {
      if (!maintainRatio) {
        svgNode = this.createSvgElement(svgNode);
      }

      html2canvas(svgNode, {
        scale: 2,
        logging: false
      })
        .then(canvas => {
          const ctx = canvas.getContext(`2d`);
          const imgData = canvas.toDataURL(`image/png`, 1.0);
          pdf.addImage(imgData, `PNG`, 0, 0, 800, 500);
          pdf.save(`${this.fileName}.${this.type.pdf}`);
          this.exportTo[1].active = false;
          this.removeSvgNode(maintainRatio);
        });
    }
  }

  private downloadPng = (maintainRatio: boolean = false): void => {
    let svgElement;
    const svgNode = d3Select.select(`#graphSvg`).node();

    if (svgNode) {
      svgNode.setAttribute(`xlink`, `http://www.w3.org/1999/xlink`);
      if (maintainRatio) {
        svgElement = svgNode;
      } else {
        svgElement = this.createSvgElement(svgNode);
      }

      html2canvas(svgElement, {
        scale: 2,
        logging: false
      })
        .then(canvass => {
          const self = this;
          canvass.toBlob(function (svgBlob) {
            saveAs(svgBlob, `${self.fileName}.${self.type.png}`);
            self.exportTo[0].active = false;
            self.removeSvgNode(maintainRatio);
          });
        });
    }
  }

  updateIconClass = (exportAs): string => {
    return exportAs.active ? 'app-icon-loading' : `app-icon-${exportAs.type}`;
  }

  removeSvgNode = (maintainRatio): void => {
    if (!maintainRatio) {
      d3Select.select(`#svgClone`).node().remove();
    }
  }

  createSvgElement = (svgNode): any => {
    const svgClone = svgNode.cloneNode(true);

    if (svgClone) {
      svgClone.setAttribute('id', 'svgClone');
      d3Select.select('body').node().appendChild(svgClone);
      const svgNodeCopy = d3Select.select(`#svgClone`).node();
      svgNodeCopy.style.position = 'fixed';
      svgNodeCopy.querySelector('#app-zoom-slider').style.display = 'none';
      svgNodeCopy.querySelector('#g-transform').setAttribute('transform', 'translate(0, 0)');
      return svgNodeCopy;
    }
  }
}
