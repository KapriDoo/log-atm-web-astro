# Spec Delta

## Purpose

Hace que una ruta inexistente responda 404 con la página de error en el idioma del prefijo de la URL, sin sacar al usuario de su idioma.

## ADDED Requirements

### Requirement: 404 en el idioma del prefijo de la URL
The system MUST answer a non-existent route with HTTP status 404, the error page in the language given by the URL prefix (`/en/...` English, `/pt/...` Portuguese, any other path Spanish), and `noindex`.

#### Scenario: Ruta inexistente en inglés
- **WHEN** se solicita `/en/no-existe`
- **THEN** responde status 404, con `<html lang="en-US">`, copy en inglés y `noindex`

#### Scenario: Ruta inexistente en portugués
- **WHEN** se solicita `/pt/no-existe`
- **THEN** responde status 404, con `<html lang="pt-BR">`, copy en portugués y `noindex`

#### Scenario: Ruta inexistente en español
- **WHEN** se solicita `/no-existe`
- **THEN** responde status 404, con `<html lang="es-CL">`, copy en español y `noindex`

#### Scenario: Link de vuelta al inicio
- **WHEN** se muestra la 404 en inglés o portugués
- **THEN** el link de vuelta apunta a `/en/` o `/pt/` respectivamente

#### Scenario: Verificación en producción
- **WHEN** tras el deploy se abre `https://logatm.com/en/no-existe`
- **THEN** se ve la 404 en inglés con status 404 (verificación manual)
