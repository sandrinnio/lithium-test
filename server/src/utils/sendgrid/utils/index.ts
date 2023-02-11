import handlebars from 'handlebars';
import mjml2html from 'mjml';
import fs from 'fs';
import path from 'path';
import { TemplateInterface } from '../interfaces/template.interface';

export const readAndRenderTemplate = (
  templateName: string,
  templateData: TemplateInterface,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const template = path.join(
      path.resolve('./', 'templates'),
      `${templateName}.mjml`,
    );

    fs.readFile(template, 'utf8', (err, file) => {
      if (err) {
        reject(err);
      }
      const htmlOutput = mjml2html(file);
      const handlebarTemplate = handlebars.compile(htmlOutput.html);
      resolve(handlebarTemplate(templateData));
    });
  });
};
