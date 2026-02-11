/** @param {import('@roots/bud').Bud} bud */
export default async (bud) => {
    /* Set the source path. */
    bud
        .setPath('@src', 'static')
        .setPublicPath('/app/themes/monsieur-sens/dist/')
        .entry('app', ['@src/js/app.js', '@src/css/app.css'])
        .devtool('eval-source-map')

    
    /**
     * Post CSS and Tailwind
     *
     * @see {@link https://bud.js.org/extensions/bud-postcss}
     * @see {@link https://bud.js.org/extensions/bud-tailwindcss}
     */
    bud.postcss
        .setPlugin(`tailwindcss/nesting`)
        .setPlugin(`tailwindcss`)
        .use([`import`, `tailwindcss/nesting`, `tailwindcss`, `env`])


    /**
     * Development server settings
     *
     * @see {@link https://bud.js.org/reference/bud.setUrl}
     * @see {@link https://bud.js.org/reference/bud.setProxyUrl}
     * @see {@link https://bud.js.org/reference/bud.watch}
     */
    bud
        .setUrl('http://localhost:3000')
        .setProxyUrl('http://monsieursens.local')
        .watch(['static/js', 'static/css', 'views'], {
            interval: 1000,
            usePolling: true,
        })

}  