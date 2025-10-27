export const openApiDocument = {
  openapi: '3.1.0',
  info: {
    title: 'Orlix API',
    version: '0.1.0'
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Service healthy'
          }
        }
      }
    },
    '/projects': {
      get: {
        summary: 'List projects',
        responses: {
          '200': {
            description: 'Array of projects'
          }
        }
      },
      post: {
        summary: 'Create project',
        responses: {
          '201': {
            description: 'Created project'
          }
        }
      }
    }
  }
};
