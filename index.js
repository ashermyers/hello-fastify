const path = require('path');
const fastify = require('fastify');
const fastifyStatic = require('@fastify/static');
const fastifyAutoRoutes = require('fastify-autoroutes');
const staticPath = path.resolve();
const pino = require('pino')
const pretty = require('pino-pretty')
const stream = pretty({
    colorize: true
})

const logger = pino({ level: 'info' }, stream)

const app = fastify({
    logger: logger
});

app.register(fastifyStatic, {
    root: staticPath,
    prefix: '/public/'
});

app.register(fastifyAutoRoutes, {
    dir: path.join(staticPath, 'routes'),
    ignorePattern: /.*\.test\.js/
});

app.listen({
    port: 3000
}, (_, address) => {
    console.log()
    console.log(`server listening on ${address}`);
});
