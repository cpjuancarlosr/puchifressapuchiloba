# Arquitectura fiscal basada en XML

El sistema se diseña desde el XML hacia arriba, nunca al revés. El XML es la fuente fiscal; todo lo demás se deriva de forma auditable.

## Arquitectura base
- **Google Sheets** funciona como libro maestro.
- **Cada hoja** es un papel de trabajo con propósito único.
- **Apps Script** es el motor.
- **HTML** es la mesa de control con estética de primer nivel.
- **Estética**: blanco, negro, tipografía limpia, jerarquía visual clara.
- **Emojis** solo para señalizar estados: ✅ válido, ⚠️ revisar, ❌ error.

## Estructura del libro
1. **Parámetros**: RFC propios y relacionados, tasas vigentes, cuentas contables, reglas fiscales. Una sola fuente, nada hardcodeado.
2. **XML Brutos**: entrada del archivo tal cual. Identificador único, hash, fecha de carga.
3. **XML Normalizados**: parseo limpio. Emisor, receptor, subtotal, impuestos, descuentos, método de pago, uso CFDI.
4. **Impuestos Detalle**: IVA trasladado, IVA acreditable, retenciones IVA, ISR. Línea por concepto.
5. **Asientos**: doble partida estricta, sin excepciones.
6. **Mayor**: saldos acumulados por cuenta.
7. **Fiscal**: cálculos por periodo.
8. **Estados Financieros**: resultados finales.

## Parseo XML
- El parser **no asume estructura fija**. Lee nodos dinámicos.
- **Valida versiones CFDI**.
- **Registra errores** sin romper la ejecución.
- Cada XML genera un **registro auditable**, rastreable hasta el asiento y el impuesto.

## Carga de archivos
- HTML con **explorador de Drive**.
- **Selección múltiple**.
- **Vista previa básica**.
- **Confirmación** antes de procesar.
- Detección de **duplicados por UUID**. Nunca se duplica información.

## Contabilidad automática
- Reglas claras: **compra, venta, honorarios, nómina**.
- Cada regla define **cuentas, impuestos y comportamiento fiscal**.
- El usuario puede **ajustar antes de registrar**: control humano antes del asiento final.

## Papeles de trabajo fiscales
### IVA
- Conciliación exacta entre **IVA trasladado y acreditable**.
- Separación por tasa.
- Detección de no acreditables.

### ISR
- Base gravable clara.
- Deducciones autorizadas.
- Ajustes fiscales visibles.

**Principio:** Nada se calcula en una sola celda; todo se descompone.

## Cierres mensuales
Checklist automático:
- XML completos.
- Asientos cuadrados.
- Impuestos conciliados.
- Estados generados.

El sistema no **avanza** si algo falta ⚠️.

## Estados financieros
- Resultados, balance y flujo salen del mayor.
- Sin fórmulas ocultas.
- Cada número tiene respaldo.
- Comparativos por mes y acumulado.
- Indicadores clave: margen, liquidez, endeudamiento.

## Análisis financiero
- Ratios útiles para decisión.
- Tendencias reales, no adornos.
- Proyecciones basadas en históricos limpios.
- Escenarios fiscales simples pero claros.

## Código
- Funciones pequeñas.
- Una responsabilidad por función.
- Logs claros.
- Errores controlados.
- Nada de magia: si algo falla, se entiende dónde y por qué.

## Estética
- Fondo blanco.
- Texto negro.
- Grillas limpias.
- Espacios que descansan la vista.
- Tipografía monoespaciada para lectura y auditoría.
- Semáforo de color ad hoc: ✅ válido, ⚠️ revisar, ❌ error.
- Emojis solo cuando ayudan a leer rápido 📊📁🧾.

## Implementación en Apps Script
- `Code.gs` define el menú, la apertura de la mesa de control y la inicialización de hojas.
- `index.html` entrega la mesa de control HTML con fondo blanco, letra negra, tipografía monoespaciada y semáforo visual.

## Resultado
Una herramienta que trabaja como contador senior: ordena, calcula, explica, defiende cifras y escala de un freelance a una empresa mediana sin cambiar lógica.
