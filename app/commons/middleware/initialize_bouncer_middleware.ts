import { policies } from '#app/commons/policies/main'
import * as abilities from '#app/commons/abilities/main'

import { Bouncer } from '@adonisjs/bouncer'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Init role_access middleware is used to create a role_access instance
 * during an HTTP request
 */
export default class InitializeBouncerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Create role_access instance for the ongoing HTTP request.
     * We will pull the user from the HTTP context.
     */
    ctx.bouncer = new Bouncer(
      () => ctx.auth.user || null,
      abilities,
      policies
    ).setContainerResolver(ctx.containerResolver)

    /**
     * Share role_access helpers with Edge templates.
     */
    if ('view' in ctx) {
      ctx.view.share(ctx.bouncer.edgeHelpers)
    }

    return next()
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    bouncer: Bouncer<
      Exclude<HttpContext['auth']['user'], undefined>,
      typeof abilities,
      typeof policies
    >
  }
}
