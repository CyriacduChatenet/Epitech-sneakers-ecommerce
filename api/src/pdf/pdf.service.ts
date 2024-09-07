import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfService {
  constructor(private httpService: HttpService) {}
  async downloadPdf(pdfUrl: string) {
    try {
      // Télécharger le fichier PDF en tant que flux de données
      const response = this.httpService.get(pdfUrl, {
        headers: {
          'Content-Type': 'application/html',
        },
      });

      response.subscribe((res) => {
        // Convertir les données en base64
        const base64 = Buffer.from(res.data).toString('base64');

        // Ajouter le préfixe pour un fichier PDF en base64
        const base64Pdf = `data:application/pdf;base64,${base64}`;

        return Buffer.from(base64Pdf, 'base64');
      });
    } catch (error) {
      throw new Error(
        'Erreur lors du téléchargement ou de la conversion du fichier PDF',
      );
    }
  }
}
