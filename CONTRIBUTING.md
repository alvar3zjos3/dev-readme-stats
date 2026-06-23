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
5. Ejecuta `vercel dev` para iniciar el servidor de desarrollo en <http://localhost:9000>.
6. Crea un archivo `.env` en la raíz con `NODE_ENV=development` para desactivar la caché en local.
7. Las tarjetas estarán disponibles en `http://localhost:9000/api?username=alvar3zjos3`.

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
> Si solo necesitas un tema para uso personal, usa las opciones de [personalización](./readme.md#personalización-general) en lugar de añadirlo a la colección del proyecto.

## Contribución de traducciones

Dev Readme Stats soporta múltiples idiomas. Si falta el tuyo, puedes contribuir. Consulta los idiomas soportados en la [documentación](./readme.md#idiomas-disponibles).

Para añadir un idioma, edita [src/translations.js](./src/translations.js) y agrega una propiedad en cada objeto, usando el código ISO 639-1 como clave y la cadena traducida como valor.

## Licencia de las contribuciones

Al enviar cambios, aceptas que tus aportes quedan bajo la misma [Licencia MIT](https://choosealicense.com/licenses/mit/) del proyecto. Contacta a los mantenedores si tienes dudas al respecto.

## Reportar problemas con GitHub Issues

Usamos GitHub Issues para rastrear errores públicos. Abre [un nuevo issue](https://github.com/alvar3zjos3/dev-readme-stats/issues/new/choose) para reportar un bug.

---

## Errores técnicos y Solución de problemas

A continuación se detallan los errores de implementación más comunes y su análisis técnico. Revisa esta sección antes de abrir un Issue.

**1. La API de GitHub devuelve "Maximum retries exceeded" o 403 Forbidden**
- **Causa:** La API GraphQL de GitHub impone un límite estricto de puntos por hora (generalmente 5,000). En instancias públicas y compartidas, los tokens configurados se agotan rápidamente por el volumen de tráfico.
- **Solución:** Recomendamos desplegar tu propia instancia. Para un uso intensivo, la API soporta balanceo de carga: define múltiples tokens en tus variables de entorno (`PAT_1`, `PAT_2`, `PAT_3`, etc.) y el backend los rotará automáticamente cuando uno alcance el límite de tasa.

**2. El flujo de GitHub Actions falla al intentar crear el Pull Request**
- **Causa:** El runner de CI/CD está siendo rechazado con un error tipo `fatal: could not read Username` o `403 Resource not accessible by integration`. Esto se debe a los cambios de seguridad modernos de GitHub Actions que limitan los permisos de escritura del token del runner por defecto.
- **Solución:** Configura los permisos explícitos en tu archivo YAML añadiendo el bloque `permissions: contents: write` y `pull-requests: write`. Adicionalmente, verifica a nivel de repositorio (**Settings → Actions → General → Workflow permissions**) que la opción *"Allow GitHub Actions to create and approve pull requests"* esté habilitada.

**3. La tarjeta de lenguajes suma porcentajes de código de terceros o autogenerado**
- **Causa:** La métrica de lenguajes se extrae usando *GitHub Linguist*. Si tienes un repositorio público en el que subiste bibliotecas compiladas, vendor files (como distribuciones de React, librerías en C o CSS de frameworks), Linguist los identificará como tu propio código, distorsionando las estadísticas.
- **Solución:** El parámetro en la URL `&hide=html,css` solo oculta el resultado en el frontend. La solución técnica correcta es crear un archivo `.gitattributes` en los repositorios infractores indicando explícitamente a GitHub que ignore esos directorios. Ejemplo: `vendor/** linguist-vendored=true`.

**4. Discrepancia masiva en el conteo total de "Private Commits"**
- **Causa:** Para que las estadísticas incluyan actividad privada, la instancia necesita un Personal Access Token (PAT) con alcance (`scope`) de acceso a `repo`. Además, GraphQL no exportará tus nodos privados si la configuración de tu cuenta no lo permite.
- **Solución:** Verifica primero que la opción *"Include private contributions on my profile"* esté activada en la configuración pública de tu perfil de GitHub. Luego, asegúrate de utilizar una instancia auto-alojada donde el `PAT_1` proporcionado posea los permisos correctos.

**5. La tarjeta WakaTime devuelve "User not found" o SVG en blanco**
- **Causa:** La tarjeta se nutre directamente de los webhooks públicos de WakaTime. Si sus endpoints no están expuestos, nuestra API fallará silenciosamente o en 404 al no encontrar los nodos de datos.
- **Solución:** Ve a la configuración de WakaTime y asegúrate de que **todas** las métricas estén publicadas: marca tanto *"Display code time publicly"* como *"Display languages, editors, os, categories publicly"*. Nota: Tras este cambio, la API de WakaTime puede tardar varias horas en consolidar y exponer los datos históricos para que nuestra API los pueda leer.

### Criterios para un buen reporte de error en Issues

Si el problema no está descrito arriba, agradecemos que incluyas:
- Descripción clara del error en el renderizado SVG o comportamiento de la API.
- Carga útil (payload) esperada vs la obtenida.
- La URL exacta que estás utilizando para generar la tarjeta.
- Qué pasos tomaste para aislar el error (por ejemplo, probar en la instancia pública vs en entorno de desarrollo local).