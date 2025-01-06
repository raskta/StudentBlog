// src/config/swagger.config.ts

import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - FIAP',
      version: '1.0.0',
      description: 'Documentação da API utilizando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base da API
      },
    ],
  },
  apis: ['./src/modules/**/router/*.ts', './src/modules/**/controller/*.ts'], // Caminho para as rotas documentadas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
