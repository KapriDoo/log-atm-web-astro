@echo off
:: Script para verificar y reparar el acceso a WSL2 desde Windows
:: Ejecutar como Administrador

echo === Diagnostico WSL2 - Podman ===
echo.

:: Obtener IP de WSL2
for /f "tokens=*" %%a in ('wsl -d Ubuntu -e bash -c "ip addr show eth0 ^| grep -oP 'inet \\K[\\d.]+'"') do set WSL_IP=%%a
echo IP WSL2 detectada: %WSL_IP%

:: Verificar portproxy existente
echo.
echo PortProxy configurado:
netsh interface portproxy show all

:: Limpiar reglas viejas
echo.
echo Limpiando reglas viejas...
netsh interface portproxy delete v4tov4 listenaddress=127.0.0.1 listenport=4321 2>nul
netsh interface portproxy delete v4tov4 listenaddress=0.0.0.0 listenport=4321 2>nul

:: Crear nueva regla con IP actual
echo.
echo Creando nueva regla de port forwarding...
netsh interface portproxy add v4tov4 listenaddress=127.0.0.1 listenport=4321 connectaddress=%WSL_IP% connectport=4321
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=4321 connectaddress=%WSL_IP% connectport=4321

:: Verificar regla creada
echo.
echo Nueva configuracion:
netsh interface portproxy show all

:: Verificar firewall
echo.
echo Verificando regla de firewall...
netsh advfirewall firewall show rule name="WSL2 Podman 4321" 2>nul
if errorlevel 1 (
    echo Creando regla de firewall...
    netsh advfirewall firewall add rule name="WSL2 Podman 4321" dir=in action=allow protocol=tcp localport=4321
)

:: Verificar IP Helper
echo.
echo Estado del servicio IP Helper:
sc query iphlpsvc | findstr "STATE RUNNING"
if errorlevel 1 (
    echo Iniciando IP Helper...
    net start iphlpsvc
)

echo.
echo === Diagnostico completado ===
echo.
echo Prueba ahora: http://localhost:4321
echo.
pause
