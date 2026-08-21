# Superficie de espacios verdes — Comuna 1

- tipo: obra
- enlaces: [[LEEME]]
- fecha: 2026-08-21

Se calculó la superficie total de los 387 espacios verdes públicos de la Comuna 1
(`datos/comuna1-espacios-verdes.geojson`, md5 `04ca9db868bc98c0f6d4efa417d56d76`)
usando únicamente las capacidades declaradas: `sf::st_read` → `sf::st_transform`
a POSGAR 2007 faja 5 (EPSG:5347) → `sf::st_area`.

Resultado: **326.19 ha**.

Recibo y salida cruda en `obras/superficie-comuna1.json` y
`obras/superficie-comuna1.log`.
