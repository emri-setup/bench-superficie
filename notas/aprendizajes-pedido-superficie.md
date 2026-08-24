# Aprendizajes: cómo se atiende un pedido de superficie

- tipo: aprendizaje
- enlaces: [[superficie-comuna1]]
- fecha: 2026-08-21

Notas de proceso para la próxima vez que llegue un pedido parecido (otra
comuna, otro dataset):

- **El PR se abre solo.** Hay una GitHub Action en este repo que crea el pull
  request automáticamente al empujar la rama `obra/...`. No hace falta (ni
  corresponde) correr `gh pr create` a mano — alcanza con comitear y hacer
  `git push`. Coincide con la regla de no fusionar: la sección empuja, la
  Action abre el PR, una persona decide.
- **El `.gitignore` genérico choca con la regla de evidencia.** Este repo
  ignora `*.log` por defecto, pero el CLAUDE.md exige guardar la salida cruda
  de la corrida de R como evidencia (`obras/*.log`). Hubo que agregar
  `!obras/*.log` como excepción. Vale la pena revisar el `.gitignore` antes de
  generar cualquier log de evidencia, no asumir que un archivo nuevo se va a
  trackear solo.
- **El md5 declarado en la plantilla es el candado real.** Verificarlo contra
  el archivo en `datos/` antes de leer nada evita usar datos que cambiaron
  sin que la plantilla se actualizara.
- **"Solo las capacidades declaradas"** es literal: `st_read` → `st_transform`
  → `st_area`, sin post-procesar el número a mano ni usar otra función de
  `sf` que no esté en la lista, aunque sería más directo (ej. no usar
  `st_area` sobre el objeto sin transformar, ni sumar con otra cosa que no
  sea aritmética simple sobre el resultado de `st_area`).
