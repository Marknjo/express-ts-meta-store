/**
 * Base HTML Template
 * @param content Internal of the html template
 * @param title Document title
 * @returns Html formated template
 */
export const baseHtml = (content: string, title?: string) => {
  return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>App ${title ? '| ' + title : ''}</title>
          </head>
            <body>
              <div style="display: flex; align-items: center; flex-flow: column nowrap; ">
                ${content}
              </div>
            </body>
          </html>
        `;
};
