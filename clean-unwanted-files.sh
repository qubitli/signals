#!/bin/bash
# Script para limpiar archivos no deseados que pueden reaparecer

echo "Limpiando archivos no deseados..."

# Eliminar archivos específicos que pueden reaparecer
rm -f components/app-sidebar.tsx
rm -f components/team-switcher.tsx
rm -f components/team-switcher-new.tsx
rm -f components/nav-projects.tsx

# Eliminar carpeta dashboard si reaparece
rm -rf components/dashboard

# Limpiar cache de Next.js
rm -rf .next

echo "✅ Limpieza completada"
echo "Archivos eliminados:"
echo "  - components/app-sidebar.tsx"
echo "  - components/team-switcher.tsx"
echo "  - components/team-switcher-new.tsx"
echo "  - components/nav-projects.tsx"
echo "  - components/dashboard/ (carpeta completa)"
echo "  - .next/ (cache)"
