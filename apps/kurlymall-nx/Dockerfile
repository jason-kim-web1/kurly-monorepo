FROM public.ecr.aws/docker/library/node:14.16.1-alpine3.13 AS base
MAINTAINER commerce_web2@kurlycorp.com
RUN apk add --no-cache libc6-compat

FROM base AS dependencies
WORKDIR /app
COPY package.json package-lock.json .npmrc ./

ARG PACKAGE_INSTALL_TOKEN

RUN echo "//npm.pkg.github.com/:_authToken=$PACKAGE_INSTALL_TOKEN" >> .npmrc

RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_STAGE
ARG NEXT_PUBLIC_DISABLE_AMPLITUDE_SAMPLING
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS "--max-old-space-size=4096"
ARG APP_VERSION

RUN NEXT_PUBLIC_STAGE=$NEXT_PUBLIC_STAGE NEXT_PUBLIC_DISABLE_AMPLITUDE_SAMPLING=$NEXT_PUBLIC_DISABLE_AMPLITUDE_SAMPLING NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED APP_VERSION=$APP_VERSION npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./.next/server
COPY --chown=nextjs:nodejs ./tracer.js ./tracer.js
COPY --chown=nextjs:nodejs ./entrypoint.sh ./entrypoint.sh

RUN chmod +x ./entrypoint.sh

USER nextjs

RUN sed -i 's/server\/next.js/server\/next-server.js/' node_modules/next/package.json

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["./entrypoint.sh"]
