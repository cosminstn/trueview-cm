# MIDDLEWARE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your application middleware.
Middleware let you define custom functions that can be run before rendering either a page or a group of pages.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/routing#middleware).


## Securizare pagini
Pentru ca in consola nu vrem sa avem pagini publice, implementam middleware authenticated.js si redirectionam la auth cand nu e logat.
Nuxt ofera campul auth per pagina, dar nu functioneaza per layout (grup de pagini). 
Middleware-urile pot fi specificate in layout.
[API: The middleware Property](https://nuxtjs.org/api/pages-middleware/)
