# Contribuir a [dev-readme-stats](https://github.com/alvar3zjos3/dev-readme-stats)

¡Gracias por tu interés en contribuir! La idea es que colaborar en este proyecto sea lo más claro y sencillo posible.

Puedes ayudar de varias formas:

- Reportando [errores](https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=bug&template=bug_report.yml).
- Participando en las [discusiones](https://github.com/alvar3zjos3/dev-readme-stats/discussions).
- Enviando [correcciones](https://github.com/alvar3zjos3/dev-readme-stats/compare).
- Proponiendo [nuevas funcionalidades](https://github.com/alvar3zjos3/dev-readme-stats/issues/new?assignees=&labels=enhancement&template=feature_request.yml).
- Ayudando con documentación, traducciones y mantenimiento.

> [!NOTE]
> Este proyecto es un fork localizado de [github-readme-stats](https://github.com/anuraghazra/github-readme-stats). Consulta [LICENSE](./LICENSE) para la atribución correspondiente.

## Pull requests

Todos los cambios deben enviarse mediante pull request.

Proceso recomendado:

1. Haz un fork del repositorio.
2. Crea una rama nueva a partir de `master`.
3. Realiza tus cambios de forma acotada y clara.
4. Si el cambio afecta al comportamiento o a la API, actualiza también la documentación.
5. Si añades código que deba probarse, incluye pruebas de ejemplo.
6. Abre el pull request con una explicación breve y directa.

## Desarrollo local

Para ejecutar y probar **dev-readme-stats** en local, sigue estos pasos:

1. Instala [Vercel CLI](https://vercel.com/download).
2. Haz fork del repositorio y clónalo en tu máquina.
3. Ejecuta `npm install` en la raíz del proyecto.
4. Ejecuta `vercel` en la raíz y sigue el asistente.
5. Ejecuta `vercel dev` para iniciar el servidor en <http://localhost:9000>.
6. Crea un archivo `.env` en la raíz con `NODE_ENV=development` para desactivar la caché en local.
7. Abre una tarjeta como `http://localhost:9000/api?username=alvar3zjos3`.

### Alternativa con Express

Si prefieres ejecutar el proyecto sin Vercel:

```bash
npm install
node express.js
```

Después podrás acceder a las tarjetas desde:

```text
http://localhost:9000/api?username=alvar3zjos3
```

> [!NOTE]
> Puedes depurar el código en [VS Code](https://code.visualstudio.com/) con una configuración de tipo [Node.js: Attach to process](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_setting-up-an-attach-configuration).

## Contribución de temas

Actualmente está pausada la adición de nuevos temas para reducir el esfuerzo de mantenimiento.

Los pull requests que añadan temas nuevos serán cerrados.

> [!NOTE]
> Si solo necesitas un tema para uso personal, utiliza las opciones de [personalización del README](./readme.md#-personalización-general) en lugar de proponerlo para la colección del proyecto.

## Contribución de traducciones

Dev Readme Stats soporta múltiples idiomas. Si falta el tuyo, puedes contribuir.

Consulta los idiomas disponibles en la [documentación](./readme.md#idiomas-disponibles).

Para añadir un idioma:

1. Edita [`src/translations.js`](./src/translations.js).
2. Añade una propiedad en cada objeto usando el código ISO 639-1 como clave.
3. Traduce todas las cadenas necesarias de forma consistente.
4. Envía el pull request indicando el idioma añadido.

## Licencia de las contribuciones

Al enviar cambios, aceptas que tus aportes se publiquen bajo la misma [Licencia MIT](https://choosealicense.com/licenses/mit/) del proyecto.

Si tienes dudas sobre licencias o atribución, contacta con los mantenedores antes de enviar el cambio.

## Reportar problemas

Usamos GitHub Issues para registrar errores y hacer seguimiento público.

Abre un issue aquí:

- [Nuevo issue](https://github.com/alvar3zjos3/dev-readme-stats/issues/new/choose)

### Qué incluir en un buen informe de error

- Un resumen breve del problema.
- Pasos claros para reproducirlo.
- Qué ocurrió realmente.
- Qué esperabas que ocurriera.
- Capturas, enlaces o ejemplos de la tarjeta cuando ayuden.
- Notas adicionales sobre pruebas que ya hayas hecho.

## Solicitudes de funcionalidad

Si quieres proponer una mejora, intenta incluir:

- Un resumen breve de la idea.
- Qué quieres añadir exactamente.
- Por qué sería útil para el proyecto.
- Contexto adicional, referencias o ejemplos si aplica.