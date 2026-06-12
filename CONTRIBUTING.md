# Contribuir a [dev-readme-stats](https://github.com/alvar3zjos3/dev-readme-stats)

¡Agradecemos tu aporte! Queremos que contribuir a este proyecto sea lo más sencillo y transparente posible, ya sea:

- Reportando [un problema](https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=bug&template=bug_report.yml).
- [Discutiendo](https://github.com/alvar3zjos3/dev-readme-stats/discussions) el estado actual del código.
- Enviando [una corrección](https://github.com/alvar3zjos3/dev-readme-stats/compare).
- Proponiendo [nuevas funciones](https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=enhancement&template=feature_request.yml).
- Convirtiéndote en mantenedor.

> [!NOTE]
> Este proyecto es un fork localizado de [github-readme-stats](https://github.com/anuraghazra/github-readme-stats). Consulta el archivo [LICENSE](./LICENSE) para la atribución correspondiente.

## Todos los cambios se realizan mediante pull requests

Los pull requests son la mejor forma de proponer cambios. Damos la bienvenida a tus PR:

1. Haz fork del repositorio y crea tu rama desde `master`.
2. Si añades código que debe probarse, incluye pruebas de ejemplo.
3. Si cambias las APIs, actualiza la documentación.
4. Envía el pull request.

## Desarrollo local

Para ejecutar y probar **dev-readme-stats**, sigue estos pasos (asegúrate de tener una cuenta en [Vercel](https://vercel.com/)):

1. Instala [Vercel CLI](https://vercel.com/download).
2. Haz fork del repositorio y clona el código en tu máquina local.
3. Ejecuta `npm install` en la raíz del repositorio.
4. Ejecuta `vercel` en la raíz y sigue los pasos del asistente.
5. Ejecuta `vercel dev` para iniciar el servidor de desarrollo en <http://localhost:3000>.
6. Crea un archivo `.env` en la raíz con `NODE_ENV=development` para desactivar la caché en local.
7. Las tarjetas estarán disponibles en `http://localhost:3000/api?username=alvar3zjos3`.

**Alternativa con Express:**

```bash
npm install
node express.js
```

Las tarjetas estarán en `http://localhost:9000/api?username=alvar3zjos3`.

> [!NOTE]
> Puedes depurar el código en [VS Code](https://code.visualstudio.com/) con [Node.js: Attach to process](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_setting-up-an-attach-configuration) o depurar pruebas con la [extensión Jest para VS Code](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest).

## Contribución de temas

Actualmente hemos pausado la adición de nuevos temas para reducir el esfuerzo de mantenimiento. Los pull requests que añadan temas nuevos serán cerrados.

> [!NOTE]
> Si solo necesitas un tema para uso personal, usa las opciones de [personalización](./readme.md#personalización) en lugar de añadirlo a la colección del proyecto.

## Contribución de traducciones

Dev Readme Stats soporta múltiples idiomas. Si falta el tuyo, puedes contribuir. Consulta los idiomas soportados en la [documentación](./readme.md#idiomas-disponibles).

Para añadir un idioma, edita [src/translations.js](./src/translations.js) y agrega una propiedad en cada objeto, usando el código ISO 639-1 como clave y la cadena traducida como valor.

## Licencia de las contribuciones

Al enviar cambios, aceptas que tus aportes quedan bajo la misma [Licencia MIT](https://choosealicense.com/licenses/mit/) del proyecto. Contacta a los mantenedores si tienes dudas al respecto.

## Reportar problemas con GitHub Issues

Usamos GitHub Issues para rastrear errores públicos. Abre [un nuevo issue](https://github.com/alvar3zjos3/dev-readme-stats/issues/new/choose) para reportar un bug.

## Preguntas frecuentes

**P:** ¿Cómo ocultar Jupyter Notebook?

> **R:** `&hide=jupyter%20notebook`

**P:** No logré desplegar mi propia instancia en Vercel

> **R:** Consulta la guía de [auto-alojamiento](./readme.md#auto-alojado-vercelotro).

**P:** ¿Cómo contar estadísticas privadas?

> **R:** Solo podemos contar commits privados; no tenemos acceso a otra información privada de los usuarios. La única forma es desplegar tu propia instancia y usar tu propio PAT (Personal Access Token).

### Informes de errores

Un buen informe de error suele incluir:

- Un resumen breve y contexto
- Pasos para reproducir (sé específico)
- Capturas o enlace en vivo de la tarjeta de Dev Readme Stats
- Qué ocurre realmente
- Qué esperabas que ocurriera
- Notas adicionales (hipótesis, pruebas que ya hiciste)

### Solicitudes de funcionalidad

Una buena solicitud de funcionalidad suele incluir:

- Un resumen breve de la idea
- Qué quieres añadir y por qué
- Contexto adicional (imágenes, enlaces, referencias de implementación)
